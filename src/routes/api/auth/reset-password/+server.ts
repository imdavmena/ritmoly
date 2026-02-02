// src/routes/api/auth/reset-password/+server.ts
import type { RequestHandler } from "./$types";
import { badRequest, ok } from "$lib/server/utils/http";
import { AuthService } from "$lib/server/services/AuthService";

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  const { token, new_password } = body ?? {};
  if (!token || !new_password) return badRequest("Missing fields");

  const auth = new AuthService();
  try {
    await auth.resetPassword(String(token), String(new_password));
    return ok({ message: "Password reset success." });
  } catch (e: any) {
    return badRequest("Reset failed", { code: e?.message });
  }
};
