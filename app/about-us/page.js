import { defaultMetadata } from "../lib/metadata";
import { fetchPageData } from "../lib/fetchPageData";
import AboutClient from "./AboutClient";

export async function generateMetadata() {
  const data = await fetchPageData('about-us');
  if (data?.seo) {
    return {
      ...defaultMetadata,
      title: data.seo.title || "About Us | Pay10",
      description: data.seo.description || defaultMetadata.description,
    };
  }
  return { ...defaultMetadata, title: "About Us | Pay10" };
}

export default async function About() {
  const data = await fetchPageData('about-us');
  return <AboutClient apiData={data} />;
}
