import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url }) => {
  const appUrl = `${url.protocol}//${url.host}`;
  const body = `User-agent: *
Allow: /
Sitemap: ${appUrl}/sitemap.xml
`;
  return new Response(body, { headers: { "Content-Type": "text/plain" } });
};
