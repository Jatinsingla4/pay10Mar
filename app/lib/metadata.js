export const defaultMetadata = {
  title: "Pay10",
  description: 'description',
  keywords: 'Best payment gateway in India, Payment gateway company in india, Best payment gateway services provider in india, Payment gateway company, Payment gateways in India, Best Payment Gateway, Best Payment Gateway in India, Payment Gateways In India, Best Payment Gateways, Best Payment Gateways of 2023, BEST Payment Gateway Providers In 2023, Payment gateway provider, Payment gateway for your business',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pay10.in',
    siteName: 'Pay10',
    title: "Best payment gateway services provider in India | Pay10",
    description: 'Pay10 provides a hassle-free payment gateway service provider in India and supports 100+ payment modes. Accepts all domestic card, UPI, netbanking and wallet payments',
    images: [
      {
        url: '',
        width: 1200,
        height: 630,
        alt: 'pay10',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Best payment gateway services provider in India | Pay10",
    description: 'Pay10 provides a hassle-free payment gateway service provider in India and supports 100+ payment modes. Accepts all domestic card, UPI, netbanking and wallet payments',
    images: [''],
  },
}

// Helper function to generate metadata from API pageData
export const generateApiMetadata = (pageData, fallbackTitle = 'Pay10', fallbackDescription = defaultMetadata.description) => {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pay10.in';

  return {
    title: pageData?.meta_title || fallbackTitle,
    description: pageData?.meta_description || fallbackDescription,
    keywords: pageData?.meta_keywords || defaultMetadata.keywords,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteUrl,
      siteName: 'Pay10',
      title: pageData?.meta_title || fallbackTitle,
      description: pageData?.meta_description || fallbackDescription,
      images: pageData?.image && baseUrl ? [
        {
          url: `${baseUrl}${pageData.image}`,
          width: 1200,
          height: 630,
          alt: pageData?.meta_title || fallbackTitle,
        }
      ] : defaultMetadata.openGraph.images,
    },
    twitter: {
      card: 'summary_large_image',
      title: pageData?.meta_title || fallbackTitle,
      description: pageData?.meta_description || fallbackDescription,
      images: pageData?.image && baseUrl ? [`${baseUrl}${pageData.image}`] : defaultMetadata.twitter.images,
    },
  };
};

// Helper function to generate blog post metadata
export const generateBlogMetadata = (blog, fallbackTitle = 'Pay10', fallbackDescription = defaultMetadata.description) => {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pay10.in';
  const description = blog?.short_description || blog?.description?.replace(/<[^>]*>/g, '').substring(0, 160) || fallbackDescription;

  return {
    title: `${blog?.name || fallbackTitle} | Blog | Pay10`,
    description: description,
    keywords: blog?.meta_keywords || defaultMetadata.keywords,
    openGraph: {
      type: 'article',
      locale: 'en_US',
      url: `${siteUrl}/blog/${blog?.slug}`,
      siteName: 'Pay10',
      title: blog?.name || fallbackTitle,
      description: description,
      images: blog?.image && baseUrl ? [
        {
          url: `${baseUrl}${blog.image}`,
          width: 1200,
          height: 630,
          alt: blog?.name || fallbackTitle,
        }
      ] : defaultMetadata.openGraph.images,
      publishedTime: blog?.post_date,
      modifiedTime: blog?.updated_at || blog?.post_date,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog?.name || fallbackTitle,
      description: description,
      images: blog?.image && baseUrl ? [`${baseUrl}${blog.image}`] : defaultMetadata.twitter.images,
    },
  };
};
