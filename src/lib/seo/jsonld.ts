import { SEO } from "./default";

export function softwareAppJsonLd(appUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "RITTMOLY",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    description: SEO.description,
    url: appUrl,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USDT"
    }
  };
}
