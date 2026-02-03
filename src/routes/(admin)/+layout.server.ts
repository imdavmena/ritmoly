import { redirect } from "@sveltejs/kit";

export const load = (async ({ locals }) => {
  if (!locals.user) throw redirect(302, "/auth/login");
  if (locals.user.role !== "admin") throw redirect(302, "/app/dashboard");
  return { user: locals.user };
}) satisfies import("./$types").LayoutServerLoad;
