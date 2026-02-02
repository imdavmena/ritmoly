import { getDb } from "../db/mongo";
import { nanoid } from "nanoid";
import type { PaymentDoc } from "../models/payment";
import type { PlanDoc } from "../models/plan";

type UserPlanDoc = { _id: string; plan_slug: string; started_at: Date };

export class BillingService {
  async getPublicPlans() {
    const db = await getDb();
    const plans = db.collection<PlanDoc>("plans");
    return plans
      .find({ is_active: true })
      .sort({ sort_order: 1 })
      .project({ _id: 0 })
      .toArray();
  }

  async createCheckout(user_id: string, plan_slug: string, method: "binance_pay" | "wallet_transfer") {
    const db = await getDb();
    const plans = db.collection<PlanDoc>("plans");
    const payments = db.collection<PaymentDoc>("payments");

    const plan = await plans.findOne({ slug: plan_slug, is_active: true });
    if (!plan) throw new Error("PLAN_NOT_FOUND");

    const now = new Date();
    const p: PaymentDoc = {
      _id: nanoid(),
      user_id,
      plan_slug,
      amount: plan.price,
      currency: "USDT",
      network: "BEP20",
      method,
      status: "pending",
      created_at: now
    };
    await payments.insertOne(p);

    // Binance Pay flow placeholder:
    // - Si tienes merchant, aquí crearías una order con Binance Pay API
    // - Guardas binance_order_id y devuelves checkoutUrl/qr payload
    const binancePayPayload =
      method === "binance_pay"
        ? {
            // PLACEHOLDER: integra Binance Pay real
            checkout_url: "https://pay.binance.com/en/checkout/PLACEHOLDER",
            qr_text: "BINANCE_PAY_QR_PLACEHOLDER",
            order_id: `bp_${p._id}`
          }
        : null;

    return { payment: p, plan, binancePayPayload };
  }

  async verifyWalletTransfer(user_id: string, payment_id: string, tx_hash: string) {
    const db = await getDb();
    const payments = db.collection<PaymentDoc>("payments");

    const p = await payments.findOne({ _id: payment_id, user_id });
    if (!p) throw new Error("PAYMENT_NOT_FOUND");
    if (p.method !== "wallet_transfer") throw new Error("INVALID_METHOD");

    // PLACEHOLDER: verificación real on-chain (BSCScan / RPC)
    // En MVP lo dejamos “pending” y admin aprueba manualmente.
    await payments.updateOne({ _id: payment_id }, { $set: { tx_hash, status: "pending" } });
    return true;
  }

  async adminApprovePayment(payment_id: string) {
    const db = await getDb();
    const payments = db.collection<PaymentDoc>("payments");
    const userPlans = db.collection<UserPlanDoc>("user_plans");

    const p = await payments.findOne({ _id: payment_id });
    if (!p) throw new Error("PAYMENT_NOT_FOUND");

    await payments.updateOne(
      { _id: payment_id },
      { $set: { status: "confirmed", confirmed_at: new Date() } }
    );

    // Activar plan al usuario
    await userPlans.updateOne(
      { _id: p.user_id },
      { $set: { plan_slug: p.plan_slug, started_at: new Date() } },
      { upsert: true }
    );

    return true;
  }
}
