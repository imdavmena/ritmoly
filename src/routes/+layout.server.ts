import type { LayoutServerLoad } from "./$types";
import { dict, getLocaleFromAcceptLanguage, type Locale } from "$lib/i18n";

export const load: LayoutServerLoad = async ({ locals, cookies, request, url }) => {
  const qLang = url.searchParams.get("lang") as Locale | null;
  const cookieLang = cookies.get("lang") as Locale | null;
  const headerLang = getLocaleFromAcceptLanguage(request.headers.get("accept-language"));

  const locale: Locale = qLang ?? cookieLang ?? headerLang ?? "en";
  cookies.set("lang", locale, { path: "/", httpOnly: false, sameSite: "lax", maxAge: 60 * 60 * 24 * 365 });

  return { user: locals.user, locale, t: dict(locale) };
};
