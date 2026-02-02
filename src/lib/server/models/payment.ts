export type PaymentStatus = "pending" | "confirmed" | "failed";
export type PaymentMethod = "binance_pay" | "wallet_transfer";

export type PaymentDoc = {
  _id: string; // nanoid
  user_id: string;
  plan_slug: string;
  amount: number;
  currency: "USDT";
  network: "BEP20";
  method: PaymentMethod;
  tx_hash?: string;
  status: PaymentStatus;
  created_at: Date;
  confirmed_at?: Date;
  binance_order_id?: string; // for Binance Pay
};
