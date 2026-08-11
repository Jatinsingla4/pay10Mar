import { secret } from './secrets';

export const API_BASE = process.env.NEXT_PUBLIC_API;
export const API_KEY = secret('BACKEND_AUTH_KEY');

export const SITE_ORIGIN = process.env.SITE_ORIGIN;

export const API_HEADERS = {
  'X-Api-Key': API_KEY,
  'Origin': SITE_ORIGIN,
  'Referer': SITE_ORIGIN,
};
