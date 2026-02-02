import en from "./en";
import es from "./es";

export type Locale = "en" | "es";

export function getLocaleFromAcceptLanguage(header?: string | null): Locale {
  if (!header) return "en";
  return header.toLowerCase().includes("es") ? "es" : "en";
}

export function dict(locale: Locale) {
  return locale === "es" ? es : en;
}
