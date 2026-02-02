import type { RequestHandler } from "./$types";
import { unauthorized, forbidden, badRequest, ok } from "$lib/server/utils/http";
import { BillingService } from "$lib/server/services/BillingService";

export const POST: RequestHandler = async ({ locals, request }) => {
  if (!locals.user) return unauthorized();
  if (locals.user.role !== "admin") return forbidden();

  const body = await request.json();
  const { payment_id } = body ?? {};
  if (!payment_id) return badRequest("Missing payment_id");

  const billing = new BillingService();
  await billing.adminApprovePayment(String(payment_id));
  return ok();
};
