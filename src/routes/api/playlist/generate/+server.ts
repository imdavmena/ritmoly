import type { RequestHandler } from "./$types";
import { unauthorized, badRequest, ok } from "$lib/server/utils/http";
import { getDb } from "$lib/server/db/mongo";
import { QuotaService } from "$lib/server/services/QuotaService";
import { PlaylistGeneratorService } from "$lib/server/services/PlaylistGeneratorService";
import type { UploadDoc } from "$lib/server/models/upload";
import type { PlaylistDoc } from "$lib/server/models/playlist";
import { nanoid } from "nanoid";

export const POST: RequestHandler = async ({ locals, request }) => {
  if (!locals.user) return unauthorized();

  const body = await request.json();
  const { upload_id, duration_minutes, vibe, bpm_range, event_type } = body ?? {};
  if (!upload_id || !duration_minutes || !vibe || !bpm_range || !event_type)
    return badRequest("Missing fields");

  const quota = new QuotaService();
  const q = await quota.canGenerate(locals.user._id);
  if (!q.ok) return badRequest("Quota exceeded", q);

  const db = await getDb();
  const upload = await db.collection<UploadDoc>("uploads").findOne({ _id: String(upload_id), user_id: locals.user._id });
  if (!upload) return badRequest("Upload not found");

  const gen = new PlaylistGeneratorService();
  const result = await gen.generate({
    duration_minutes,
    vibe,
    bpm_range,
    event_type,
    seed_track_filename: upload.filename
  });

  const playlist: PlaylistDoc = {
    _id: nanoid(),
    user_id: locals.user._id,
    upload_id: upload._id,
    title: String(result.title ?? "RITTMOLY Set"),
    bpm_range: String(result.bpm_range ?? bpm_range),
    duration_minutes,
    vibe: String(vibe),
    event_type: String(event_type),
    sections: result.sections ?? [],
    created_at: new Date()
  };

  await db.collection<PlaylistDoc>("playlists").insertOne(playlist);
  return ok({ playlist });
};
