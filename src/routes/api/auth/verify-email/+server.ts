// src/routes/api/auth/verify-email/+server.ts
import type { RequestHandler } from "./$types";
import { badRequest, ok } from "$lib/server/utils/http";
import { AuthService } from "$lib/server/services/AuthService";

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  const { token } = body ?? {};
  if (!token) return badRequest("Missing token");

  const auth = new AuthService();
  try {
    await auth.verifyEmail(String(token));
    return ok({ message: "Email verified." });
  } catch (e: any) {
    return badRequest("Verify failed", { code: e?.message });
  }
};
