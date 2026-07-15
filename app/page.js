import { defaultMetadata } from './lib/metadata';
import { fetchPageData } from './lib/fetchPageData';
import HomeClient from './HomeClient';

export async function generateMetadata() {
  const data = await fetchPageData('homepage');
  if (data?.seo) {
    return {
      ...defaultMetadata,
      title: data.seo.title || "Pay10",
      description: data.seo.description || defaultMetadata.description,
    };
  }
  return { ...defaultMetadata, title: "Pay10" };
}

export default async function Home() {
  const data = await fetchPageData('homepage');
  return <HomeClient pageData={data} />;
}
