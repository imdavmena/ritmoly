import type { RequestHandler } from "./$types";
import { ok } from "$lib/server/utils/http";
import { AuthService } from "$lib/server/services/AuthService";

export const POST: RequestHandler = async ({ locals, cookies }) => {
  const auth = new AuthService();
  const name = auth.getSessionCookieName();
  const token = cookies.get(name);

  if (token) await auth.logout(token);
  cookies.delete(name, { path: "/" });
  return ok();
};
