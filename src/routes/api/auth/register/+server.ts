import type { RequestHandler } from "./$types";
import { badRequest, ok } from "$lib/server/utils/http";
import { AuthService } from "$lib/server/services/AuthService";
import { APP_URL } from "$env/static/private";

export const POST: RequestHandler = async ({ request, url }) => {
  const body = await request.json();
  const { email, password } = body ?? {};
  if (!email || !password) return badRequest("Missing fields");

  const auth = new AuthService();
  const appUrl = APP_URL || `${url.protocol}//${url.host}`;

  try {
    await auth.register(String(email), String(password), appUrl);
    return ok({ message: "Registered. Check email for verification link (placeholder logs in console)." });
  } catch (e: any) {
    return badRequest("Register failed", { code: e?.message });
  }
};
