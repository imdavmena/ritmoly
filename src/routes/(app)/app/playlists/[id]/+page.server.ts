import { error } from "@sveltejs/kit";
import { getDb } from "$lib/server/db/mongo";
import type { PlaylistDoc } from "$lib/server/models/playlist";

export const load = (async ({ params, locals }) => {
  const id = params.id;
  const db = await getDb();
  const playlist = await db
    .collection<PlaylistDoc>("playlists")
    .findOne({ _id: id, user_id: locals.user!._id });

  if (!playlist) throw error(404, "Playlist not found");
  return { playlist };
}) satisfies import("./$types").PageServerLoad;
