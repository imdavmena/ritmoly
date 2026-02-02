export type SessionDoc = {
  _id: string;        // session token (random)
  user_id: string;
  created_at: Date;
  expires_at: Date;
  user_agent?: string;
  ip?: string;
};
