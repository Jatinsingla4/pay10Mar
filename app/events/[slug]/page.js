import { generateApiMetadata } from "../../lib/metadata";
import { fetchApiData } from "../../lib/api";
import EventDetailClient from "./EventDetailClient";

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  try {
    const { slug } = await params;
    if (slug) {
      const result = await fetchApiData(`/event_detail/${slug}`);
      if (result?.status && result?.page_data) {
        return generateApiMetadata(result.page_data);
      }
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }
  // Return default metadata if API call fails
  return generateApiMetadata({});
}

export default async function EventDetail({ params }) {
  const { slug } = await params;
  const result = await fetchApiData(`/event_detail/${slug}`);
  const pageData = result?.page_data || {};
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pay10.in';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: pageData.name,
    description: pageData.meta_description,
    image: pageData.image ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${pageData.image}` : undefined,
    startDate: pageData.event_date,
    location: {
      '@type': 'Place',
      name: pageData.location || undefined,
    },
    organizer: {
      '@type': 'Organization',
      name: 'Pay10',
      url: siteUrl,
    },
  };

  return (
    <>
      {/* Staging: JSON-LD off — uncomment for production
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      */}
      <EventDetailClient />
    </>
  );
}
