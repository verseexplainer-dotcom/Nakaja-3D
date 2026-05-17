const DEFAULT_SITE_URL = 'https://nakajabikes.co.ke';

const normalizeBaseUrl = (value: string) => value.replace(/\/$/, '');

export const siteUrl = normalizeBaseUrl(import.meta.env.PUBLIC_SITE_URL || DEFAULT_SITE_URL);
export const siteOrigin = new URL(siteUrl).origin;
export const defaultOgImagePath = '/logo_nakaja.png';

export const buildAbsoluteUrl = (path = '/') => new URL(path, `${siteOrigin}/`).toString();

export const buildCanonicalPath = (pathname: string) => {
  if (!pathname || pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
};
