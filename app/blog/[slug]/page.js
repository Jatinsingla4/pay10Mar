import { generateBlogMetadata, stagingRobots } from "../../lib/metadata";
import { fetchApiData } from "../../lib/api";
import BlogDetailClient from "./BlogDetailClient";

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  try {
    const { slug } = await params;
    if (slug) {
      const result = await fetchApiData(`/blog_detail/${slug}`);
      if (result?.status && result?.page_data) {
        return generateBlogMetadata(result.page_data);
      }
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }
  // Return default metadata if API call fails
  return { title: 'Blog | Pay10', robots: stagingRobots };
}

export default async function BlogDetail({ params }) {
  const { slug } = await params;
  const result = await fetchApiData(`/blog_detail/${slug}`);
  const pageData = result?.page_data || {};
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pay10.in';
  const imageBase = process.env.NEXT_PUBLIC_IMAGE_URL || "";

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: pageData.name,
    image: pageData.image ? `${imageBase}${pageData.image}` : undefined,
    datePublished: pageData.post_date,
    dateModified: pageData.updated_at || pageData.post_date,
    author: {
      '@type': 'Organization',
      name: 'Pay10',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Pay10',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/favicon.ico`, // Ideally a proper logo URL
      },
    },
    description: pageData.short_description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${slug}`,
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
      <BlogDetailClient />
    </>
  );
}
