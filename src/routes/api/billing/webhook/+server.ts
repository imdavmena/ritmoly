import type { RequestHandler } from "./$types";
import { ok } from "$lib/server/utils/http";
import { hmacSHA256, timingSafeEqual } from "$lib/server/utils/crypto";
import { BINANCE_PAY_WEBHOOK_SECRET } from "$env/static/private";

// PLACEHOLDER: valida firma y procesa eventos reales de Binance Pay
export const POST: RequestHandler = async ({ request }) => {
  const secret = BINANCE_PAY_WEBHOOK_SECRET || "dev_secret";
  const raw = await request.text();
  const sig = request.headers.get("x-binancepay-signature") || "";

  const expected = hmacSHA256(raw, secret);
  const valid = timingSafeEqual(sig, expected);

  if (!valid) {
    // No detalles para evitar leakage
    return new Response("invalid signature", { status: 400 });
  }

  // Aquí: parse raw JSON, identificar order_id, marcar payment confirmed, activar plan.
  // MVP: solo acknowledge.
  return ok({ received: true });
};
