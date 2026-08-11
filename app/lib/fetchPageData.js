
import { API_BASE, API_HEADERS } from './backendApi';

export { API_BASE, API_HEADERS };

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
