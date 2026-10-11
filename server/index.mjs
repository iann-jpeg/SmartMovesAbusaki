import cors from "cors";
import express from "express";
import { createHash, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { MongoClient, ObjectId } from "mongodb";
import { z } from "zod";

const scrypt = promisify(scryptCallback);
const app = express();
const port = Number(process.env.PORT ?? 10000);
const databaseName = process.env.MONGODB_DATABASE ?? "smartmoves";
const clientOrigin = process.env.CLIENT_ORIGIN;
const adminToken = process.env.ADMIN_TOKEN;
const sessionLifetimeMs = 7 * 24 * 60 * 60 * 1000;
const roles = ["SUPER_ADMIN", "HR_MANAGER", "DEPARTMENT_MANAGER", "FINANCE", "ILLUSTRATOR", "EMPLOYEE"];
const superAdminRoles = ["SUPER_ADMIN"];
const configuredOrigins = [
  "https://smart-moves-abusaki.vercel.app",
  ...(clientOrigin ? clientOrigin.split(",").map((origin) => origin.trim()).filter(Boolean) : []),
];

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
const loginSchema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(1).max(200),
});
const adminLoginSchema = z.object({ token: z.string().min(1).max(300) });
const employeeSchema = z.object({
  name: z.string().trim().min(1).max(150),
  email: z.string().trim().email().max(255),
  password: z.string().min(12).max(200),
  role: z.enum(roles),
  department: z.string().trim().max(100).optional().or(z.literal("")),
  employeeId: z.string().trim().max(50).optional().or(z.literal("")),
});
const suspensionSchema = z.object({ suspended: z.boolean().default(true) });
const illustrationAssignmentSchema = z.object({
  title: z.string().trim().min(1).max(160),
  brief: z.string().trim().min(1).max(3000),
  dueDate: z.string().date().optional().or(z.literal("")),
  illustratorId: z.string().trim().min(1),
});
const illustrationStatusSchema = z.object({ status: z.enum(["ASSIGNED", "IN_PROGRESS", "IN_REVIEW", "COMPLETED"]) });

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || configuredOrigins.includes(origin) || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Origin is not allowed by CORS."));
  },
  methods: ["POST", "GET", "PATCH"],
}));
app.use(express.json({ limit: "32kb" }));

let clientPromise;
function getMongoClient() {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not configured.");
  clientPromise ??= new MongoClient(process.env.MONGODB_URI).connect();
  return clientPromise;
}
async function getCollections() {
  const db = (await getMongoClient()).db(databaseName);
  return { users: db.collection("users"), sessions: db.collection("sessions"), illustrations: db.collection("illustrationAssignments") };
}
function publicUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    department: user.department ?? "",
    employeeId: user.employeeId ?? "",
    suspended: Boolean(user.suspended),
    createdAt: user.createdAt,
  };
}
function tokenHash(token) {
  return createHash("sha256").update(token).digest("hex");
}
async function hashPassword(password) {
  const salt = randomBytes(16);
  const derivedKey = await scrypt(password, salt, 64, { N: 16384, r: 8, p: 1 });
  return `scrypt$16384$8$1$${salt.toString("hex")}$${Buffer.from(derivedKey).toString("hex")}`;
}
async function verifyPassword(password, encoded) {
  const [, n, r, p, saltHex, hashHex] = String(encoded).split("$");
  if (!n || !r || !p || !saltHex || !hashHex) return false;
  try {
    const actual = Buffer.from(await scrypt(password, Buffer.from(saltHex, "hex"), hashHex.length / 2, {
      N: Number(n), r: Number(r), p: Number(p),
    }));
    const expected = Buffer.from(hashHex, "hex");
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}
function extractSessionToken(req) {
  const authorization = req.get("authorization") ?? "";
  return authorization.startsWith("Bearer ") ? authorization.slice(7).trim() : "";
}
function requireRoles(allowedRoles) {
  return async (req, res, next) => {
    const token = extractSessionToken(req);
    if (!token) return res.status(401).json({ ok: false, message: "Authentication required." });
    try {
      const { users, sessions } = await getCollections();
      const sessionRecord = await sessions.findOne({ tokenHash: token });
      if (!sessionRecord) return res.status(401).json({ ok: false, message: "Invalid session." });
      if (sessionRecord.expiresAt <= new Date()) {
        await sessions.deleteOne({ _id: sessionRecord._id });
        return res.status(401).json({ ok: false, message: "Session expired." });
      }
      const activeSession = sessionRecord;
      const user = await users.findOne({ _id: activeSession.userId });
      if (!user || user.suspended) return res.status(403).json({ ok: false, message: "Account unavailable." });
      if (!allowedRoles.includes(user.role)) return res.status(403).json({ ok: false, message: "Forbidden." });
      req.user = user;
      req.sessionToken = token;
      return next();
    } catch (error) {
      console.error("Authentication failure", error);
      return res.status(500).json({ ok: false, message: "Authentication service unavailable." });
    }
  };
}

const loginAttempts = new Map();
function loginRateLimit(req, res, next) {
  const identity = req.path === "/admin-login"
    ? "admin"
    : String(req.body?.email ?? "").trim().toLowerCase();
  const key = `${req.ip}:${identity}`;
  const now = Date.now();
  const record = loginAttempts.get(key);
  if (record && record.resetAt <= now) loginAttempts.delete(key);
  const current = loginAttempts.get(key);
  if (current?.count >= 5) {
    return res.status(429).json({ ok: false, message: "Too many login attempts. Try again later." });
  }
  loginAttempts.set(key, { count: (current?.count ?? 0) + 1, resetAt: now + 15 * 60 * 1000 });
  return next();
}

app.get("/health", (_req, res) => res.json({ ok: true }));
app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.post("/api/auth/login", loginRateLimit, async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ ok: false, message: "Invalid email or password." });
  try {
    const { users, sessions } = await getCollections();
    const user = await users.findOne({ email: parsed.data.email.toLowerCase() });
    const valid = user && !user.suspended && await verifyPassword(parsed.data.password, user.passwordHash);
    if (!valid) return res.status(401).json({ ok: false, message: "Invalid email or password." });
    loginAttempts.delete(`${req.ip}:${parsed.data.email.toLowerCase()}`);
    const token = randomBytes(32).toString("base64url");
    await sessions.insertOne({
      userId: user._id,
      tokenHash: tokenHash(token),
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + sessionLifetimeMs),
    });

    return res.json({ ok: true, token, user: publicUser(user) });
  } catch (error) {
    console.error("Login failed", error);
    return res.status(500).json({ ok: false, message: "Login is temporarily unavailable." });
  }
});

app.post("/api/auth/admin-login", loginRateLimit, async (req, res) => {
  const parsed = adminLoginSchema.safeParse(req.body);
  if (!parsed.success || !adminToken || parsed.data.token !== adminToken) {
    return res.status(401).json({ ok: false, message: "Invalid admin token." });
  }
  try {
    const { users, sessions } = await getCollections();
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase() || "superadmin@smartmoves.local";
    const now = new Date();
    const result = await users.findOneAndUpdate(
      { email },
      {
        $set: { name: process.env.ADMIN_NAME?.trim() || "SmartMoves Super Administrator", role: "SUPER_ADMIN", suspended: false, updatedAt: now },
        $setOnInsert: { email, department: "Administration", employeeId: "ADMIN", createdAt: now, passwordHash: await hashPassword(randomBytes(32).toString("base64url")) },
      },
      { upsert: true, returnDocument: "after" },
    );
    const token = randomBytes(32).toString("base64url");
    await sessions.insertOne({ userId: result._id, tokenHash: tokenHash(token), createdAt: now, expiresAt: new Date(Date.now() + sessionLifetimeMs) });
    loginAttempts.delete(`${req.ip}:admin`);
    return res.json({ ok: true, token, user: publicUser(result) });
  } catch (error) {
    console.error("Admin login failed", error);
    return res.status(500).json({ ok: false, message: "Admin login is temporarily unavailable." });
  }
});

app.post("/api/auth/logout", async (req, res) => {
  const token = extractSessionToken(req);
  if (token) {
    try {
      const { sessions } = await getCollections();
      await sessions.deleteOne({ tokenHash: tokenHash(token) });
    } catch (error) {
      console.error("Logout failed", error);
    }
  }
  return res.json({ ok: true });
});

app.get("/api/me", requireRoles(roles), (req, res) => res.json({ ok: true, user: publicUser(req.user) }));
app.get("/api/employees/me", requireRoles(roles), (req, res) => res.json({ ok: true, user: publicUser(req.user) }));

app.get("/api/illustrations/me", requireRoles(["ILLUSTRATOR"]), async (req, res) => {
  try {
    const { illustrations } = await getCollections();
    const items = await illustrations.find({ illustratorId: req.user._id }).sort({ dueDate: 1, createdAt: -1 }).toArray();
    return res.json({ ok: true, items });
  } catch (error) {
    console.error("Failed to load illustration assignments", error);
    return res.status(500).json({ ok: false, message: "Could not load illustration assignments." });
  }
});

app.patch("/api/illustrations/:id/status", requireRoles(["ILLUSTRATOR"]), async (req, res) => {
  const parsed = illustrationStatusSchema.safeParse(req.body);
  if (!parsed.success || !ObjectId.isValid(req.params.id)) return res.status(400).json({ ok: false, message: "Invalid illustration status." });
  try {
    const { illustrations } = await getCollections();
    const result = await illustrations.findOneAndUpdate(
      { _id: new ObjectId(req.params.id), illustratorId: req.user._id },
      { $set: { status: parsed.data.status, updatedAt: new Date() } },
      { returnDocument: "after" },
    );
    if (!result) return res.status(404).json({ ok: false, message: "Assignment not found." });
    return res.json({ ok: true, item: result });
  } catch (error) {
    console.error("Failed to update illustration assignment", error);
    return res.status(500).json({ ok: false, message: "Could not update illustration assignment." });
  }
});

app.get("/api/admin/illustrations", requireRoles(superAdminRoles), async (_req, res) => {
  try {
    const { illustrations } = await getCollections();
    return res.json({ ok: true, items: await illustrations.find({}).sort({ createdAt: -1 }).toArray() });
  } catch (error) {
    console.error("Failed to load illustration assignments", error);
    return res.status(500).json({ ok: false, message: "Could not load illustration assignments." });
  }
});

app.post("/api/admin/illustrations", requireRoles(superAdminRoles), async (req, res) => {
  const parsed = illustrationAssignmentSchema.safeParse(req.body);
  if (!parsed.success || !ObjectId.isValid(parsed.data.illustratorId)) return res.status(400).json({ ok: false, message: "Invalid illustration assignment." });
  try {
    const { users, illustrations } = await getCollections();
    const illustrator = await users.findOne({ _id: new ObjectId(parsed.data.illustratorId), role: "ILLUSTRATOR", suspended: { $ne: true } });
    if (!illustrator) return res.status(400).json({ ok: false, message: "Select an active illustrator account." });
    const item = { ...parsed.data, illustratorId: illustrator._id, status: "ASSIGNED", createdAt: new Date(), updatedAt: new Date() };
    const result = await illustrations.insertOne(item);
    return res.status(201).json({ ok: true, item: { ...item, _id: result.insertedId } });
  } catch (error) {
    console.error("Failed to create illustration assignment", error);
    return res.status(500).json({ ok: false, message: "Could not create illustration assignment." });
  }
});

app.get("/api/admin/employees", requireRoles(superAdminRoles), async (_req, res) => {
  try {
    const { users } = await getCollections();
    const employees = await users.find({}).sort({ name: 1 }).toArray();
    return res.json({ ok: true, items: employees.map(publicUser) });
  } catch (error) {
    console.error("Failed to load employees", error);
    return res.status(500).json({ ok: false, message: "Could not load employees." });
  }
});
app.post("/api/admin/employees", requireRoles(superAdminRoles), async (req, res) => {
  const parsed = employeeSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ ok: false, message: "Invalid employee details." });
  try {
    const { users } = await getCollections();
    const email = parsed.data.email.toLowerCase();
    const passwordHash = await hashPassword(parsed.data.password);
    const user = {
      ...parsed.data, email, passwordHash, suspended: false, createdAt: new Date(), updatedAt: new Date(),
    };
    delete user.password;
    const result = await users.insertOne(user);
    const storedUser = await users.findOne({ _id: result.insertedId });
    if (!storedUser) {
      console.error("Employee insert was acknowledged but the record could not be read back", result.insertedId);
      return res.status(500).json({ ok: false, message: "Employee account could not be confirmed in the database." });
    }
    return res.status(201).json({ ok: true, user: publicUser(storedUser) });
  } catch (error) {
    if (error?.code === 11000) return res.status(409).json({ ok: false, message: "An account with that email already exists." });
    console.error("Failed to create employee", error);
    return res.status(500).json({ ok: false, message: "Could not create employee." });
  }
});
async function suspendEmployee(req, res) {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ ok: false, message: "Invalid employee id." });
  const parsed = suspensionSchema.safeParse(req.body ?? {});
  if (!parsed.success) return res.status(400).json({ ok: false, message: "Invalid suspension value." });
  try {
    const { users, sessions } = await getCollections();
    const id = new ObjectId(req.params.id);
    const result = await users.findOneAndUpdate(
      { _id: id },
      { $set: { suspended: parsed.data.suspended, updatedAt: new Date() } },
      { returnDocument: "after" },
    );
    if (!result) return res.status(404).json({ ok: false, message: "Employee not found." });
    if (parsed.data.suspended) await sessions.deleteMany({ userId: id });
    return res.json({ ok: true, user: publicUser(result) });
  } catch (error) {
    console.error("Failed to update employee", error);
    return res.status(500).json({ ok: false, message: "Could not update employee." });
  }
}
app.patch("/api/admin/employees/:id/suspend", requireRoles(superAdminRoles), suspendEmployee);
app.post("/api/admin/employees/:id/suspend", requireRoles(superAdminRoles), suspendEmployee);

app.get("/api/admin/enquiries", async (req, res) => {
  const authorization = req.get("authorization");
  if (!adminToken || authorization !== `Bearer ${adminToken}`) {
    return res.status(401).json({ ok: false, message: "Unauthorized." });
  }
  const page = Math.max(Number.parseInt(req.query.page?.toString() ?? "1", 10) || 1, 1);
  const limit = Math.min(Math.max(Number.parseInt(req.query.limit?.toString() ?? "25", 10) || 25, 1), 100);
  try {
    const client = await getMongoClient();
    const collection = client.db(databaseName).collection("enquiries");
    const [items, total] = await Promise.all([
      collection.find({}, { projection: { ip: 0, userAgent: 0 } }).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).toArray(),
      collection.countDocuments(),
    ]);
    return res.json({ ok: true, items, page, limit, total });
  } catch (error) {
    console.error("Failed to load enquiries", error);
    return res.status(500).json({ ok: false, message: "Could not load enquiries." });
  }
});
app.post("/api/enquiries", async (req, res) => {
  const parsed = enquirySchema.safeParse(req.body);
  if (!parsed.success || parsed.data.website) return res.status(400).json({ ok: false, message: "Please check the enquiry details and try again." });
  try {
    const client = await getMongoClient();
    await client.db(databaseName).collection("enquiries").insertOne({
      ...parsed.data, createdAt: new Date(), userAgent: req.get("user-agent") ?? null, ip: req.ip ?? null,
    });
    return res.status(201).json({ ok: true, message: "Your enquiry has been received. We will get back to you." });
  } catch (error) {
    console.error("Failed to store enquiry", error);
    return res.status(500).json({ ok: false, message: "We could not submit your enquiry just now. Please try again later." });
  }
});

async function bootstrapAdmin() {
  if (process.env.BOOTSTRAP_ADMIN_ENABLED !== "true") return;
  const email = process.env.BOOTSTRAP_ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.BOOTSTRAP_ADMIN_PASSWORD;
  if (!email || !password || password.length < 12) {
    throw new Error("Bootstrap admin requires BOOTSTRAP_ADMIN_EMAIL and a 12+ character BOOTSTRAP_ADMIN_PASSWORD.");
  }
  const { users } = await getCollections();
  if (await users.findOne({ email })) return;
  await users.insertOne({
    name: process.env.BOOTSTRAP_ADMIN_NAME?.trim() || "SmartMoves Administrator",
    email, role: "SUPER_ADMIN", department: "Administration", suspended: false,
    passwordHash: await hashPassword(password), createdAt: new Date(), updatedAt: new Date(),
  });
  console.log("Bootstrap administrator created.");
}

export { app };

async function start() {
  if (process.env.MONGODB_URI) {
    const { users, sessions } = await getCollections();
    await Promise.all([
      users.createIndex({ email: 1 }, { unique: true }),
      sessions.createIndex({ tokenHash: 1 }, { unique: true }),
      sessions.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
    ]);
    await bootstrapAdmin();
  }
  app.listen(port, "0.0.0.0", () => console.log(`SmartMoves backend listening on port ${port}`));
}
if (process.env.VERCEL !== "1") {
  start().catch((error) => {
    console.error("Backend startup failed:", error.message);
    process.exit(1);
  });
}
