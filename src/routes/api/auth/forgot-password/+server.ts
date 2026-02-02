// src/routes/api/auth/forgot-password/+server.ts
import type { RequestHandler } from "./$types";
import { ok } from "$lib/server/utils/http";
import { AuthService } from "$lib/server/services/AuthService";
import { APP_URL } from "$env/static/private";

export const POST: RequestHandler = async ({ request, url }) => {
  const body = await request.json();
  const email = String(body?.email ?? "");
  const auth = new AuthService();
  const appUrl = APP_URL || `${url.protocol}//${url.host}`;
  await auth.requestReset(email, appUrl);
  return ok({ message: "If the email exists, a reset link was sent (placeholder logs)." });
};
