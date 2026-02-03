// scripts/mongo-setup.js
// Creates all collections, indexes and seeds base plans.
// Usage: node scripts/mongo-setup.js

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/rittmoly";

function getDbNameFromUri(uri) {
  try {
    const u = new URL(uri);
    const dbname = u.pathname?.replace(/^\//, "") || "rittmoly";
    return dbname || "rittmoly";
  } catch {
    return "rittmoly";
  }
}

async function ensureCollection(db, name) {
  const exists = await db.listCollections({ name }).hasNext();
  if (!exists) {
    await db.createCollection(name);
    console.log(`[create] collection ${name}`);
  }
}

async function run() {
  console.log(`[mongo-setup] Connecting to ${uri}`);
  const client = new MongoClient(uri);
  await client.connect();
  const dbname = getDbNameFromUri(uri);
  const db = client.db(dbname);

  // Collections
  await ensureCollection(db, "users");
  await ensureCollection(db, "sessions");
  await ensureCollection(db, "tokens");
  await ensureCollection(db, "uploads");
  await ensureCollection(db, "playlists");
  await ensureCollection(db, "plans");
  await ensureCollection(db, "user_plans");
  await ensureCollection(db, "payments");

  // Indexes
  await db.collection("users").createIndex({ email: 1 }, { unique: true, name: "uniq_email" });

  await db.collection("sessions").createIndex({ expires_at: 1 }, { expireAfterSeconds: 0, name: "ttl_session" });
  await db.collection("sessions").createIndex({ user_id: 1 }, { name: "by_user" });

  await db.collection("tokens").createIndex({ expires_at: 1 }, { expireAfterSeconds: 0, name: "ttl_token" });
  await db.collection("tokens").createIndex({ user_id: 1, type: 1 }, { name: "by_user_type" });

  await db.collection("uploads").createIndex({ user_id: 1, created_at: -1 }, { name: "by_user_created" });

  await db.collection("playlists").createIndex({ user_id: 1, created_at: -1 }, { name: "by_user_created" });

  await db.collection("plans").createIndex({ slug: 1 }, { unique: true, name: "uniq_slug" });

  await db.collection("user_plans").createIndex({ plan_slug: 1 }, { name: "by_plan_slug" });

  await db.collection("payments").createIndex({ user_id: 1, created_at: -1 }, { name: "by_user_created" });
  await db.collection("payments").createIndex({ status: 1, created_at: -1 }, { name: "by_status_created" });
  await db.collection("payments").createIndex({ binance_order_id: 1 }, { unique: true, sparse: true, name: "uniq_binance_order_id" });

  // Seed plans (upsert by slug)
  const now = new Date();
  const plans = [
    {
      _id: "plan_free",
      slug: "free",
      name: "Free",
      description: "Free tier",
      price: 0,
      currency: "USDT",
      interval: "one_time",
      playlist_limit: 3,
      features: ["Basic generation", "3 playlists total"],
      is_active: true,
      is_featured: false,
      sort_order: 1,
      created_at: now,
      updated_at: now
    },
    {
      _id: "plan_pro_month",
      slug: "pro_month",
      name: "Pro Monthly",
      description: "Unlimited playlists",
      price: 10,
      currency: "USDT",
      interval: "month",
      playlist_limit: null,
      features: ["Unlimited playlists", "Priority generation"],
      is_active: true,
      is_featured: true,
      sort_order: 2,
      created_at: now,
      updated_at: now
    }
  ];

  for (const p of plans) {
    await db.collection("plans").updateOne(
      { slug: p.slug },
      { $set: { ...p, updated_at: new Date() }, $setOnInsert: { created_at: now, _id: p._id } },
      { upsert: true }
    );
  }

  console.log("[mongo-setup] Done");
  await client.close();
}

run().catch((err) => {
  console.error("[mongo-setup] Error:", err?.message || err);
  process.exit(1);
});
