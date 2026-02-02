import { MongoClient } from "mongodb";
import { MONGODB_URI } from "$env/static/private";

const uri = MONGODB_URI;
if (!uri) throw new Error("Missing MONGODB_URI");

let client: MongoClient | null = null;

export async function getMongoClient() {
  if (client) return client;
  client = new MongoClient(uri);
  await client.connect();
  return client;
}

export async function getDb() {
  const c = await getMongoClient();
  // Database name is inferred from URI path if provided; otherwise use "rittmoly"
  return c.db();
}
