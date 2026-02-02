import type { RequestHandler } from "./$types";
import { unauthorized, forbidden, ok } from "$lib/server/utils/http";
import { getDb } from "$lib/server/db/mongo";

export const GET: RequestHandler = async ({ locals }) => {
  if (!locals.user) return unauthorized();
  if (locals.user.role !== "admin") return forbidden();

  const db = await getDb();
  const [users, sessions, uploads, playlists, payments, plans] = await Promise.all([
    db.collection("users").countDocuments(),
    db.collection("sessions").countDocuments(),
    db.collection("uploads").countDocuments(),
    db.collection("playlists").countDocuments(),
    db.collection("payments").countDocuments(),
    db.collection("plans").countDocuments({ is_active: true })
  ]);

  return ok({ users, sessions, uploads, playlists, payments, active_plans: plans });
};
