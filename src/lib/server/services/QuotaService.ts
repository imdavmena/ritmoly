import { getDb } from "../db/mongo";
import type { PlanDoc } from "../models/plan";
import type { PlaylistDoc } from "../models/playlist";

type UserPlanDoc = {
  _id: string; // user_id
  plan_slug: string;
  started_at: Date;
};

export class QuotaService {
  async getActivePlanForUser(user_id: string) {
    const db = await getDb();
    const userPlans = db.collection<UserPlanDoc>("user_plans");
    const plans = db.collection<PlanDoc>("plans");

    const up = await userPlans.findOne({ _id: user_id });
    if (!up) return null;

    const plan = await plans.findOne({ slug: up.plan_slug, is_active: true });
    return plan ?? null;
  }

  async canGenerate(user_id: string) {
    const db = await getDb();
    const playlists = db.collection<PlaylistDoc>("playlists");

    const plan = await this.getActivePlanForUser(user_id);

    // Free tier default: 3 playlists total (MVP simple).
    // Puedes cambiar a “por mes” luego.
    const freeLimit = 3;

    if (!plan) {
      const used = await playlists.countDocuments({ user_id });
      return { ok: used < freeLimit, limit: freeLimit, used, plan: null };
    }

    if (plan.playlist_limit === null) return { ok: true, limit: null, used: 0, plan };

    const used = await playlists.countDocuments({ user_id });
    return { ok: used < plan.playlist_limit, limit: plan.playlist_limit, used, plan };
  }
}
