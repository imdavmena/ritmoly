import { MongoClient } from "mongodb";
import { MONGODB_URI } from "$env/static/private";

const uri = MONGODB_URI;
if (!uri) throw new Error("Missing MONGODB_URI");

let client: MongoClient | null = null;
let indexesEnsured = false;

export async function getMongoClient() {
  if (client) return client;
  client = new MongoClient(uri);
  await client.connect();
  return client;
}

export async function getDb() {
  const c = await getMongoClient();
  // Database name is inferred from URI path if provided; otherwise use "rittmoly"
  const db = c.db();
  if (!indexesEnsured) {
    indexesEnsured = true;
    // Fire and forget; if it throws, it won't break requests
    ensureIndexes(db).catch((e) => console.error("[mongo] ensureIndexes error", e));
  }
  return db;
}

async function ensureIndexes(db: import("mongodb").Db) {
  // users
  await db.collection("users").createIndex({ email: 1 }, { unique: true, name: "uniq_email" });

  // sessions - TTL on expires_at
  await db.collection("sessions").createIndex({ expires_at: 1 }, { expireAfterSeconds: 0, name: "ttl_session" });
  await db.collection("sessions").createIndex({ user_id: 1 }, { name: "by_user" });

  // tokens - TTL on expires_at
  await db.collection("tokens").createIndex({ expires_at: 1 }, { expireAfterSeconds: 0, name: "ttl_token" });
  await db.collection("tokens").createIndex({ user_id: 1, type: 1 }, { name: "by_user_type" });

  // playlists and uploads for common queries
  await db.collection("playlists").createIndex({ user_id: 1, created_at: -1 }, { name: "by_user_created" });
  await db.collection("uploads").createIndex({ user_id: 1, created_at: -1 }, { name: "by_user_created" });
}
