import type { RequestHandler } from "./$types";

const paths = ["/", "/about", "/contact", "/auth/login", "/auth/register"];

export const GET: RequestHandler = async ({ url }) => {
  const base = `${url.protocol}//${url.host}`;
  const now = new Date().toISOString();

  const urls = paths
    .map(
      (p) => `<url><loc>${base}${p}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq></url>`
    )
    .join("");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  return new Response(body, { headers: { "Content-Type": "application/xml" } });
};
