import { defaultMetadata } from "../../lib/metadata";
import { API_BASE, API_HEADERS } from "../../lib/fetchPageData";
import NewsDetailClient from "./NewsDetailClient";

async function getNewsItem(slug) {
  try {
    const res = await fetch(`${API_BASE}/news/${slug}`, {
      next: { revalidate: 60 },
      headers: API_HEADERS,
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data || null;
  } catch (error) {
    return null;
  }
}

async function getOtherNews(slug) {
  try {
    const res = await fetch(`${API_BASE}/news`, {
      next: { revalidate: 60 },
      headers: API_HEADERS,
    });
    if (!res.ok) return [];
    const json = await res.json();
    const list = json?.success && json?.data ? json.data : [];
    return list.filter((item) => item.slug !== slug).slice(0, 2);
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getNewsItem(slug);
  if (!data) {
    return { ...defaultMetadata, title: "News | Pay10" };
  }
  const description = (data.content || "").replace(/<[^>]+>/g, "").trim().slice(0, 160);
  return {
    ...defaultMetadata,
    title: `${data.title} | Pay10`,
    description: description || defaultMetadata.description,
  };
}

export default async function NewsDetail({ params }) {
  const { slug } = await params;
  const [data, otherNews] = await Promise.all([
    getNewsItem(slug),
    getOtherNews(slug),
  ]);

  return <NewsDetailClient initialData={data} otherNews={otherNews} />;
}
