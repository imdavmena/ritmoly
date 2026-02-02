import type { RequestHandler } from "./$types";
import { unauthorized, badRequest, ok } from "$lib/server/utils/http";
import { BillingService } from "$lib/server/services/BillingService";

export const POST: RequestHandler = async ({ locals, request }) => {
  if (!locals.user) return unauthorized();
  const body = await request.json();
  const { plan_slug, method } = body ?? {};
  if (!plan_slug || !method) return badRequest("Missing fields");
  if (method !== "binance_pay" && method !== "wallet_transfer") return badRequest("Invalid method");

  const billing = new BillingService();
  const out = await billing.createCheckout(locals.user._id, String(plan_slug), method);
  return ok(out);
};
