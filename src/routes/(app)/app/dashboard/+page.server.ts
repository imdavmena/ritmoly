import { getDb } from "$lib/server/db/mongo";
import type { PlaylistDoc } from "$lib/server/models/playlist";
import type { UploadDoc } from "$lib/server/models/upload";
import { QuotaService } from "$lib/server/services/QuotaService";

export const load = (async ({ locals }) => {
  const db = await getDb();
  const user_id = locals.user!._id;

  const [uploads, playlists] = await Promise.all([
    db.collection<UploadDoc>("uploads").countDocuments({ user_id }),
    db.collection<PlaylistDoc>("playlists").countDocuments({ user_id })
  ]);

  const quota = new QuotaService();
  const q = await quota.canGenerate(user_id);

  return {
    stats: {
      uploads,
      playlists,
      plan: q.plan ? q.plan.name : "Free",
      plan_slug: q.plan ? q.plan.slug : "free",
      used: q.used,
      limit: q.limit
    }
  };
}) satisfies import("./$types").PageServerLoad;
