import type { APIRoute } from 'astro';
import { buildAbsoluteUrl } from '../lib/site';

export const GET: APIRoute = () => {
  const body = [
    'User-agent: *',
    'Allow: /',
    `Sitemap: ${buildAbsoluteUrl('/sitemap.xml')}`,
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
