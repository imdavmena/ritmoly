import { getDb } from "../db/mongo";
import { randomToken, sha256 } from "../utils/crypto";
import { validateStrongPassword } from "../utils/validate";
import { nanoid } from "nanoid";
import type { UserDoc } from "../models/user";
import type { SessionDoc } from "../models/session";
import { EmailService } from "./EmailService";
import { PASSWORD_PEPPER, SESSION_COOKIE_NAME, SESSION_TTL_DAYS } from "$env/static/private";

const pepper = PASSWORD_PEPPER || "dev_pepper_change_me";
const sessionCookieName = SESSION_COOKIE_NAME || "rm_session";
const ttlDays = Number(SESSION_TTL_DAYS || 14);

type TokenDoc = {
  _id: string; // token
  user_id: string;
  type: "verify_email" | "reset_password";
  expires_at: Date;
  created_at: Date;
};

export class AuthService {
  private email = new EmailService();

  async register(emailRaw: string, password: string, appUrl: string) {
    const email = emailRaw.trim().toLowerCase();
    if (!validateStrongPassword(password)) throw new Error("WEAK_PASSWORD");

    const db = await getDb();
    const users = db.collection<UserDoc>("users");
    const existing = await users.findOne({ email });
    if (existing) throw new Error("EMAIL_EXISTS");

    const salt = randomToken(16);
    const password_hash = sha256(`${password}:${salt}:${pepper}`);

    const now = new Date();
    const user: UserDoc = {
      _id: nanoid(),
      email,
      password_hash: `${salt}.${password_hash}`,
      role: "user",
      is_email_verified: false,
      created_at: now,
      updated_at: now
    };

    await users.insertOne(user);

    const token = await this.createToken(user._id, "verify_email");
    const link = `${appUrl}/auth/verify-email/${token}`;
    await this.email.sendVerifyEmail(email, link);

    return { user_id: user._id };
  }

  async login(emailRaw: string, password: string) {
    const email = emailRaw.trim().toLowerCase();
    const db = await getDb();
    const users = db.collection<UserDoc>("users");
    const user = await users.findOne({ email });
    if (!user) throw new Error("INVALID_CREDENTIALS");

    const [salt, hashStored] = user.password_hash.split(".");
    const hash = sha256(`${password}:${salt}:${pepper}`);
    if (hash !== hashStored) throw new Error("INVALID_CREDENTIALS");

    const session = await this.createSession(user._id);
    return { session_token: session._id, user };
  }

  async logout(sessionToken: string) {
    const db = await getDb();
    await db.collection<SessionDoc>("sessions").deleteOne({ _id: sessionToken });
  }

  async createSession(user_id: string) {
    const db = await getDb();
    const sessions = db.collection<SessionDoc>("sessions");

    const token = randomToken(32);
    const now = new Date();
    const expires_at = new Date(now.getTime() + ttlDays * 24 * 60 * 60 * 1000);

    const s: SessionDoc = { _id: token, user_id, created_at: now, expires_at };
    await sessions.insertOne(s);
    return s;
  }

  async getSession(sessionToken?: string | null) {
    if (!sessionToken) return null;
    const db = await getDb();
    const sessions = db.collection<SessionDoc>("sessions");
    const users = db.collection<UserDoc>("users");

    const s = await sessions.findOne({ _id: sessionToken });
    if (!s) return null;

    if (s.expires_at.getTime() < Date.now()) {
      await sessions.deleteOne({ _id: sessionToken });
      return null;
    }
    const user = await users.findOne({ _id: s.user_id });
    if (!user) return null;

    return { session: s, user };
  }

  getSessionCookieName() {
    return sessionCookieName;
  }

  async requestReset(emailRaw: string, appUrl: string) {
    const email = emailRaw.trim().toLowerCase();
    const db = await getDb();
    const users = db.collection<UserDoc>("users");
    const user = await users.findOne({ email });
    // Seguridad: no revelar si existe o no
    if (!user) return;

    const token = await this.createToken(user._id, "reset_password");
    const link = `${appUrl}/auth/reset-password/${token}`;
    await this.email.sendResetPassword(email, link);
  }

  async resetPassword(token: string, newPassword: string) {
    if (!validateStrongPassword(newPassword)) throw new Error("WEAK_PASSWORD");

    const db = await getDb();
    const tokens = db.collection<TokenDoc>("tokens");
    const users = db.collection<UserDoc>("users");

    const t = await tokens.findOne({ _id: token, type: "reset_password" });
    if (!t || t.expires_at.getTime() < Date.now()) throw new Error("INVALID_TOKEN");

    const salt = randomToken(16);
    const password_hash = `${salt}.${sha256(`${newPassword}:${salt}:${pepper}`)}`;

    await users.updateOne(
      { _id: t.user_id },
      { $set: { password_hash, updated_at: new Date() } }
    );

    await tokens.deleteOne({ _id: token });
  }

  async verifyEmail(token: string) {
    const db = await getDb();
    const tokens = db.collection<TokenDoc>("tokens");
    const users = db.collection<UserDoc>("users");

    const t = await tokens.findOne({ _id: token, type: "verify_email" });
    if (!t || t.expires_at.getTime() < Date.now()) throw new Error("INVALID_TOKEN");

    await users.updateOne(
      { _id: t.user_id },
      { $set: { is_email_verified: true, updated_at: new Date() } }
    );

    await tokens.deleteOne({ _id: token });
  }

  private async createToken(user_id: string, type: TokenDoc["type"]) {
    const db = await getDb();
    const tokens = db.collection<TokenDoc>("tokens");
    const token = randomToken(24);
    const now = new Date();
    const expires_at = new Date(now.getTime() + 60 * 60 * 1000); // 1h

    await tokens.insertOne({ _id: token, user_id, type, created_at: now, expires_at });
    return token;
  }
}
