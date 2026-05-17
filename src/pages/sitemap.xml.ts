import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { buildAbsoluteUrl } from '../lib/site';

const staticRoutes = ['/', '/motorcycles/', '/financing/', '/contact/'];

export const GET: APIRoute = async () => {
  const products = await getCollection('products');
  const urls = [
    ...staticRoutes,
    ...products.map((product) => `/motorcycles/${product.data.slug ?? product.id}/`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((path) => `  <url><loc>${buildAbsoluteUrl(path)}</loc></url>`).join('\n')}\n</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
