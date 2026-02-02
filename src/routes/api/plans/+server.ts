import type { RequestHandler } from "./$types";
import { BillingService } from "$lib/server/services/BillingService";
import { ok } from "$lib/server/utils/http";

export const GET: RequestHandler = async () => {
  const billing = new BillingService();
  const plans = await billing.getPublicPlans();
  return ok({ plans });
};
