import { secret } from './secrets';

export const API_BASE = process.env.NEXT_PUBLIC_API;
// Must go through secret(), not process.env: when a vault supplies the key as a
// file the environment variable is absent, and reading it directly here sent
// `X-Api-Key: undefined` to the CMS, which answered 401 for every page.
const API_KEY = secret('BACKEND_AUTH_KEY');

export const API_HEADERS = {
  'X-Api-Key': API_KEY,
  'Origin': process.env.SITE_ORIGIN,
};

export async function fetchPageData(slug, revalidate = 0) {
  try {
    const res = await fetch(`${API_BASE}/pages/${slug}`, {
      next: { revalidate },
      headers: API_HEADERS,
    });
    if (!res.ok) return null;
    return (await res.json())?.data ?? null;
  } catch {
    return null;
  }
}

export async function fetchPageMeta(slug, fallback) {
  try {
    const data = await fetchPageData(slug);
    if (data?.seo) return { title: data.seo.title, description: data.seo.description };
  } catch {}
  return fallback;
}
