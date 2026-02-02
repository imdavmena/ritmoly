import type { Handle } from "@sveltejs/kit";
import { AuthService } from "$lib/server/services/AuthService";

const auth = new AuthService();

export const handle: Handle = async ({ event, resolve }) => {
  const cookieName = auth.getSessionCookieName();
  const sessionToken = event.cookies.get(cookieName);

  const session = await auth.getSession(sessionToken);
  event.locals.user = session?.user ?? null;
  event.locals.session = session?.session ?? null;

  return resolve(event);
};

declare global {
  namespace App {
    interface Locals {
      user: { _id: string; email: string; role: "user" | "admin"; is_email_verified: boolean } | null;
      session: { _id: string; user_id: string; expires_at: Date } | null;
    }
  }
}
export {};
