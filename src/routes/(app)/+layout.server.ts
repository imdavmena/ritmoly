import { redirect } from "@sveltejs/kit";

export const load = (async ({ locals }) => {
  if (!locals.user) throw redirect(302, "/auth/login");
  return { user: locals.user };
}) satisfies import("./$types").LayoutServerLoad;
