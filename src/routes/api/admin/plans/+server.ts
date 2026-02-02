import type { RequestHandler } from "./$types";
import { getDb } from "$lib/server/db/mongo";
import type { PlanDoc } from "$lib/server/models/plan";
import { nanoid } from "nanoid";
import { forbidden, ok, unauthorized, badRequest } from "$lib/server/utils/http";

export const GET: RequestHandler = async ({ locals }) => {
  if (!locals.user) return unauthorized();
  if (locals.user.role !== "admin") return forbidden();
  const db = await getDb();
  const plans = await db.collection<PlanDoc>("plans").find({}).sort({ sort_order: 1 }).toArray();
  return ok({ plans });
};

export const POST: RequestHandler = async ({ locals, request }) => {
  if (!locals.user) return unauthorized();
  if (locals.user.role !== "admin") return forbidden();
  const body = await request.json();

  if (!body.slug || !body.name) return badRequest("Missing fields");

  const db = await getDb();
  const now = new Date();
  const plan: PlanDoc = {
    _id: nanoid(),
    slug: String(body.slug),
    name: String(body.name),
    description: String(body.description ?? ""),
    price: Number(body.price ?? 0),
    currency: "USDT",
    interval: body.interval ?? "month",
    playlist_limit: body.playlist_limit === null ? null : Number(body.playlist_limit ?? 0),
    features: Array.isArray(body.features) ? body.features.map(String) : [],
    is_active: Boolean(body.is_active ?? true),
    is_featured: Boolean(body.is_featured ?? false),
    sort_order: Number(body.sort_order ?? 0),
    created_at: now,
    updated_at: now
  };

  await db.collection<PlanDoc>("plans").insertOne(plan);
  return ok({ plan });
};

export const PUT: RequestHandler = async ({ locals, request }) => {
  if (!locals.user) return unauthorized();
  if (locals.user.role !== "admin") return forbidden();
  const body = await request.json();
  if (!body._id) return badRequest("Missing _id");

  const db = await getDb();
  await db.collection<PlanDoc>("plans").updateOne(
    { _id: String(body._id) },
    { $set: { ...body, updated_at: new Date() } }
  );
  return ok();
};

export const DELETE: RequestHandler = async ({ locals, request }) => {
  if (!locals.user) return unauthorized();
  if (locals.user.role !== "admin") return forbidden();
  const body = await request.json();
  if (!body._id) return badRequest("Missing _id");

  const db = await getDb();
  await db.collection<PlanDoc>("plans").deleteOne({ _id: String(body._id) });
  return ok();
};
