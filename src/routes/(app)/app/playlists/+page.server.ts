import { getDb } from "$lib/server/db/mongo";
import type { PlaylistDoc } from "$lib/server/models/playlist";

export const load = (async ({ locals }) => {
  const db = await getDb();
  const playlists = await db
    .collection<PlaylistDoc>("playlists")
    .find({ user_id: locals.user!._id })
    .project({ sections: 0 })
    .sort({ created_at: -1 })
    .toArray();

  return { playlists };
}) satisfies import("./$types").PageServerLoad;
