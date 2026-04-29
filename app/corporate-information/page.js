import { generateApiMetadata } from "../lib/metadata";
import { fetchApiData } from "../lib/api";
import CorporateInformationClient from "./CorporateInformationClient";

// Generate metadata for SEO
export async function generateMetadata() {
  try {
    const result = await fetchApiData('/page/corporate-information');
    if (result?.status && result?.page_data) {
      return generateApiMetadata(result.page_data);
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }
  // Return default metadata if API call fails
  return generateApiMetadata({});
}

export default function CorporateInformation() {
  return <CorporateInformationClient />;
}
