import type { RequestHandler } from "./$types";
import { redirect } from "@sveltejs/kit";
import { AuthService } from "$lib/server/services/AuthService";

async function doLogout(cookies: import("@sveltejs/kit").Cookies) {
  const auth = new AuthService();
  const name = auth.getSessionCookieName();
  const token = cookies.get(name);
  if (token) await auth.logout(token);
  cookies.delete(name, { path: "/" });
}

export const GET: RequestHandler = async ({ cookies }) => {
  await doLogout(cookies);
  throw redirect(302, "/auth/login");
};

export const POST: RequestHandler = async ({ cookies }) => {
  await doLogout(cookies);
  throw redirect(302, "/auth/login");
};
