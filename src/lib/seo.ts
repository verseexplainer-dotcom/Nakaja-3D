import { buildAbsoluteUrl } from './site';
export const buildOgImageUrl = (path?: string | null) => buildAbsoluteUrl(path || '/logo_nakaja.png');
