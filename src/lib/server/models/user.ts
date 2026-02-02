export type UserRole = "user" | "admin";

export type UserDoc = {
  _id: string;              // nanoid
  email: string;
  password_hash: string;    // sha256(pw + pepper) + salt included in hash payload
  role: UserRole;
  is_email_verified: boolean;
  created_at: Date;
  updated_at: Date;
};
