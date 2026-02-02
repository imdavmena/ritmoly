export type PlanInterval = "month" | "year" | "one_time";

export type PlanDoc = {
  _id: string; // nanoid
  slug: string;
  name: string;
  description: string;
  price: number;
  currency: "USDT";
  interval: PlanInterval;
  playlist_limit: number | null; // null = unlimited
  features: string[];
  is_active: boolean;
  is_featured: boolean;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
};
