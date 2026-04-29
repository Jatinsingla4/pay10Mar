"use client";

import { useState, useEffect } from "react";
import MultiPaymentsMethod from "@/app/components/ui/product/pacb-india/MultiPaymentsMethod";
import SimpleLayout from "@/app/components/ui/product/pacb-india/SimpleLayout";
import PaymentLinks from "@/app/components/ui/product/pacb-india/PaymentLinks";
import BannerBreaker from '@/app/components/ui/BannerBreaker';
import GetStarted from "@/app/components/ui/GetStarted";
import useApiAuth from "@/app/components/hooks/useApiAuth";
import PageLoader from "@/app/components/ui/PageLoader";
import PaymentGatewayHero from "@/app/components/ui/product/PaymentGatewayHero";
import AdaptivePaymentIntegrationSection from "@/app/components/ui/product/AdaptivePaymentIntegrationSection";
import FeaturesWithImage from "@/app/components/ui/product/FeaturesWithImage";

const PaymentGatewayClient = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { makeApiCall } = useApiAuth();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await makeApiCall('/page/product-payment-gateway');

        if (!isMounted) return;

        if (result?.status) {
          setPageData(result);
        } else {
          setPageData(null);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching data:', error);
          setPageData(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [makeApiCall]);

  // Extract data from API response
  const pageDataObj = pageData?.page_data || {};
  const section2 = pageData?.custom_data?.section2 || {};
  const section3 = pageData?.custom_data?.section3 || {};
  const section4 = pageData?.custom_data?.section4 || {};
  const section5 = pageData?.custom_data?.section5 || {};
  const section6 = pageData?.custom_data?.section6 || {};
  const section42 = pageData?.custom_data?.section42 || {};
  const imageBase = process.env.NEXT_PUBLIC_IMAGE_URL || '';

  // Parse content HTML to extract heading and list items
  const parseContent = (htmlContent) => {
    if (!htmlContent) return { heading: '', features: [] };

    // Extract heading from <b> tag
    const headingMatch = htmlContent.match(/<b[^>]*>(.*?)<\/b>/i);
    const heading = headingMatch ? headingMatch[1].replace(/&amp;/g, '&').trim() : '';

    // Extract list items from <li> tags
    const features = [];
    const liMatches = htmlContent.matchAll(/<li[^>]*class=["']([^"']+)["'][^>]*>(.*?)<\/li>/gi);

    for (const match of liMatches) {
      const className = match[1] || '';
      const text = match[2] ? match[2].replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').trim() : '';
      if (text) {
        features.push({
          Title: text,
          class: className
        });
      }
    }

    return { heading, features };
  };

  // Parse page_data.content
  const contentData = parseContent(pageDataObj.content || '');
  const section3Heading = contentData.heading;
  const features = contentData.features;
  const section3Image = pageDataObj.image ? `${imageBase}${pageDataObj.image}` : '';

  // Section 2 (from custom_data)
  const section2Heading = section2.heading || '';
  const section2Image = section2.image ? `${imageBase}${section2.image}` : '';
  const section2Items = Array.isArray(section2.list) ? section2.list : [];

  // Section 3 - MultiPaymentsMethod (from custom_data)
  const section3CustomHeading = section3.heading || '';
  const section3Description = section3.description || '';
  const section3Items = Array.isArray(section3.list) ? section3.list : [];

  // Section 4 - SimpleLayout
  const simpleLayoutItems = Array.isArray(section4.list) ? section4.list : [];

  // Section 5 - PaymentLinks
  const section5Heading = section5.heading || '';
  const section5Description = section5.description || '';
  // IMPORTANT: don't pass an empty string to next/image (it triggers a console warning).
  // Use `undefined` so `PaymentLinks` falls back to its default image.
  const section5Image = section5.image ? `${imageBase}${section5.image}` : undefined;
  const section5Items = Array.isArray(section5.list) ? section5.list : [];

  // Section 6 - BannerBreaker
  const section6Heading = section6.heading || '';
  const section6Description = section6.description || '';
  const section6Image = section6.image ? `${imageBase}${section6.image}` : '';

  // Section 42 - Adaptive Payment Integration (image + accordion)
  const section42Heading = section42.heading || '';
  const section42Description = section42.description || '';
  const section42Image = section42.image ? `${imageBase}${section42.image}` : '';
  const section42Items = Array.isArray(section42.list) ? section42.list : [];

  if (loading && !pageData) {
    return <PageLoader />;
  }

  // Hero section data
  const heroEyebrow = pageDataObj.top_sub_heading || undefined;
  const heroTitle = pageDataObj.top_heading || undefined;
  const heroDescription = pageDataObj.top_description || undefined;
  const heroTrustStatement = pageDataObj.trust_statement || undefined;

  return (
    <main>
      <PaymentGatewayHero
        eyebrow={heroEyebrow}
        title={heroTitle}
        trustStatement={heroTrustStatement}
        description={heroDescription}
        ctaLabel="Get Started"
        ctaHref="/contact-us"
      />

      <FeaturesWithImage
        heading={section2Heading}
        image={section2Image}
        items={section2Items}
        imageBase={imageBase}
      />

      <MultiPaymentsMethod
        heading={section3CustomHeading}
        description={section3Description}
        items={section3Items}
        imageBase={imageBase}
      />

      <SimpleLayout items={simpleLayoutItems} imageBase={imageBase} startWithImageLeft={false}/>

      <AdaptivePaymentIntegrationSection
        heading={section42Heading}
        description={section42Description}
        image={section42Image}
        imageBase={imageBase}
        items={section42Items}
      />

      <PaymentLinks
        heading={section5Heading}
        description={section5Description}
        image={section5Image}
        items={section5Items}
      />

      <BannerBreaker
        title={section6Heading}
        description={section6Description}
        backgroundDesktop={section6Image}
        backgroundMobile={section6Image}
      />

      <GetStarted />
    </main>
  );
};

export default PaymentGatewayClient;

