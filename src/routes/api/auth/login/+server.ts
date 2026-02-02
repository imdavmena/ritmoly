import type { RequestHandler } from "./$types";
import { badRequest, ok } from "$lib/server/utils/http";
import { AuthService } from "$lib/server/services/AuthService";
import { NODE_ENV, SESSION_TTL_DAYS } from "$env/static/private";

export const POST: RequestHandler = async ({ request, cookies }) => {
  const body = await request.json();
  const { email, password } = body ?? {};
  if (!email || !password) return badRequest("Missing fields");

  const auth = new AuthService();
  try {
    const { session_token, user } = await auth.login(String(email), String(password));
    cookies.set(auth.getSessionCookieName(), session_token, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * Number(SESSION_TTL_DAYS || 14)
    });
    return ok({ user: { email: user.email, role: user.role, is_email_verified: user.is_email_verified } });
  } catch (e: any) {
    return badRequest("Login failed", { code: e?.message });
  }
};
