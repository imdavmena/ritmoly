import type { RequestHandler } from "./$types";
import { unauthorized, badRequest, ok } from "$lib/server/utils/http";
import { BillingService } from "$lib/server/services/BillingService";

export const POST: RequestHandler = async ({ locals, request }) => {
  if (!locals.user) return unauthorized();

  const body = await request.json();
  const { payment_id, tx_hash } = body ?? {};
  if (!payment_id || !tx_hash) return badRequest("Missing fields");

  const billing = new BillingService();
  await billing.verifyWalletTransfer(locals.user._id, String(payment_id), String(tx_hash));
  return ok();
};
