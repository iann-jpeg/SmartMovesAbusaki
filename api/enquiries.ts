import type { VercelRequest, VercelResponse } from "@vercel/node";
import { MongoClient } from "mongodb";
import { z } from "zod";

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

type Enquiry = z.infer<typeof enquirySchema>;

let clientPromise: Promise<MongoClient> | undefined;

function getMongoClient() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not configured.");
  clientPromise ??= new MongoClient(uri).connect();
  return clientPromise;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Method not allowed." });
  }

  const parsed = enquirySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, message: "Please check the enquiry details and try again." });
  }

  const enquiry = parsed.data as Enquiry;
  if (enquiry.website) {
    return res.status(400).json({ ok: false, message: "Unable to submit this enquiry." });
  }

  try {
    const client = await getMongoClient();
    await client
      .db(process.env.MONGODB_DATABASE ?? "smartmoves")
      .collection("enquiries")
      .insertOne({
        ...enquiry,
        createdAt: new Date(),
        userAgent: req.headers["user-agent"] ?? null,
        ip: req.headers["x-forwarded-for"]?.toString().split(",")[0]?.trim() ?? null,
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
}
