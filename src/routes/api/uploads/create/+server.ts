import type { RequestHandler } from "./$types";
import { unauthorized, badRequest, ok } from "$lib/server/utils/http";
import { getDb } from "$lib/server/db/mongo";
import type { UploadDoc } from "$lib/server/models/upload";
import { nanoid } from "nanoid";

export const POST: RequestHandler = async ({ locals, request }) => {
  if (!locals.user) return unauthorized();

  // MVP: solo metadata (no recibimos archivo binario aquí).
  // En producción: firmar subida directa a S3/R2/Supabase Storage (presigned URL).
  const body = await request.json();
  const { filename, mime_type, size_bytes } = body ?? {};
  if (!filename || !mime_type || !size_bytes) return badRequest("Missing upload metadata");

  const db = await getDb();
  const now = new Date();

  const upload: UploadDoc = {
    _id: nanoid(),
    user_id: locals.user._id,
    filename: String(filename),
    mime_type: String(mime_type),
    size_bytes: Number(size_bytes),
    storage_key: `temp/${locals.user._id}/${Date.now()}-${String(filename)}`, // PLACEHOLDER
    storage_url: undefined,
    created_at: now
  };

  await db.collection<UploadDoc>("uploads").insertOne(upload);
  return ok({ upload });
};
