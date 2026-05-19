import { buildAbsoluteUrl, defaultOgImagePath } from './site';

export const buildOgImageUrl = (path?: string | null) => buildAbsoluteUrl(path || defaultOgImagePath);
