import { defaultMetadata } from "../lib/metadata";
import { fetchPageData } from "../lib/fetchPageData";
import VisionMissionClient from "./VisionMissionClient";

export async function generateMetadata() {
  const data = await fetchPageData('vision-mission');
  if (data?.seo) {
    return {
      ...defaultMetadata,
      title: data.seo.title || "Vision & Mission - Pay10",
      description: data.seo.description || defaultMetadata.description,
    };
  }
  return { ...defaultMetadata, title: "Vision & Mission - Pay10" };
}

export default async function VisionMission() {
  const data = await fetchPageData('vision-mission');
  return <VisionMissionClient pageData={data} />;
}
