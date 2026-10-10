import cors from "cors";
import express from "express";
import { MongoClient } from "mongodb";
import { z } from "zod";

const app = express();
const port = Number(process.env.PORT ?? 10000);
const clientOrigin = process.env.CLIENT_ORIGIN;

const enquirySchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  organization: z.string().trim().max(150).optional().or(z.literal("")),
  category: z.enum(["general", "digital", "publishing", "training", "partnership"]),
  subject: z.string().trim().min(1).max(150),
  message: z.string().trim().min(10).max(2000),
  consent: z.literal(true),
  website: z.string().max(0).optional().or(z.literal("")),
});

app.use(cors({
  origin: clientOrigin ? clientOrigin.split(",").map((origin) => origin.trim()) : true,
  methods: ["POST", "GET"],
}));
app.use(express.json({ limit: "32kb" }));

let clientPromise;
function getMongoClient() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured.");
  }
  clientPromise ??= new MongoClient(process.env.MONGODB_URI).connect();
  return clientPromise;
}

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/enquiries", async (req, res) => {
  const parsed = enquirySchema.safeParse(req.body);
  if (!parsed.success || parsed.data.website) {
    return res.status(400).json({ ok: false, message: "Please check the enquiry details and try again." });
  }

  try {
    const client = await getMongoClient();
    await client
      .db(process.env.MONGODB_DATABASE ?? "smartmoves")
      .collection("enquiries")
      .insertOne({
        ...parsed.data,
        createdAt: new Date(),
        userAgent: req.get("user-agent") ?? null,
        ip: req.ip ?? null,
      });

    return res.status(201).json({
      ok: true,
      message: "Your enquiry has been received. We will get back to you.",
    });
  } catch (error) {
    console.error("Failed to store enquiry", error);
    return res.status(500).json({
      ok: false,
      message: "We could not submit your enquiry just now. Please try again later.",
    });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`SmartMoves backend listening on port ${port}`);
});
