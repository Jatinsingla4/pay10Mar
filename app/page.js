import { generateApiMetadata } from './lib/metadata';
import { fetchApiData } from './lib/api';
import HomeClient from './HomeClient';

// Generate metadata for SEO
export async function generateMetadata() {
  try {
    const result = await fetchApiData('/home');
    if (result?.status && result?.page_data) {
      return generateApiMetadata(result.page_data);
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }
  // Return default metadata if API call fails
  return generateApiMetadata({});
}

export default function Home() {
  return <HomeClient />;
}
