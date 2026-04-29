"use client";

import { useState, useEffect } from "react";
import Style from "./page.module.scss";
import BizHeroBanner, { defaultDecorations } from "@/app/components/ui/product/BizHeroBanner";
import AboutSecondSection from "@/app/components/ui/about/AboutSecondSection";
import BannerBreakerSmall from "@/app/components/ui/BannerBreakerSmall";
import SectionThird from "@/app/components/ui/product/pacb-india/SectionThird";
import SimpleLayout from "@/app/components/ui/product/pacb-india/SimpleLayout";
import ThreeStepProcess from "@/app/components/ui/product/ThreeStepProcess";
import GetStarted from "@/app/components/ui/GetStarted";
import useApiAuth from "@/app/components/hooks/useApiAuth";
import PageLoader from "@/app/components/ui/PageLoader";

const MerchantAppClient = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { makeApiCall } = useApiAuth();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await makeApiCall('/page/product-pay10-biz');

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
  const section3 = pageData?.custom_data?.section3 || {};
  const section4 = pageData?.custom_data?.section4 || {};
  const section5 = pageData?.custom_data?.section5 || {};
  const section6 = pageData?.custom_data?.section6 || {};
  const imageBase = process.env.NEXT_PUBLIC_IMAGE_URL || '';

  // Extract values from API
  const topHeading = pageDataObj.top_heading || '';
  const topDescription = pageDataObj.top_description || '';
  const heroImageSrc = '/images/product_page_images/ppa122.png';
  const section2Image = pageDataObj.image ? `${imageBase}${pageDataObj.image}` : '';
  const section2Html = pageDataObj.content || '';

  // Section 3 - SectionThird (gridBoxes)
  const section3Heading = section3.heading || '';

  const section3Items = Array.isArray(section3.list) ? section3.list : [];

  // Section 4 - SimpleLayout (items)
  const simpleLayoutItems = Array.isArray(section4.list) ? section4.list : [];

  // Section 5 - BannerBreakerSmall
  const section5Heading = section5.heading || '';
  const section5Description = section5.description || '';
  const section5Image = section5.image ? `${imageBase}${section5.image}` : '';

  // Section 6 - ThreeStepProcess (steps)
  const section6Items = Array.isArray(section6.list) ? section6.list : [];

  if (loading && !pageData) {
    return <PageLoader />;
  }

  return (
    <main>
      <BizHeroBanner
        eyebrow={pageDataObj.top_sub_heading || ""}
        title={topHeading}
        description={topDescription}
        ctaHref="/coming-soon"
        heroImage={{
          src: heroImageSrc,
          alt: 'Pay10 BIZ app interface',
          width: 360,
          height: 640,
        }}
        decorations={defaultDecorations}
      />

      <div className={Style.wrapper}>
        <AboutSecondSection
          colReverse={true}
          section2Image={section2Image}
          section2Html={section2Html}
        />
      </div>

      <SectionThird
        items={section3Items}
        heading={section3Heading}
        imageBase={imageBase}
      />

      <SimpleLayout items={simpleLayoutItems} imageBase={imageBase} />

      <BannerBreakerSmall
        title={<>PAYMENTS MADE<br />EASY, FAST AND SECURE</>}
        description={section5Description}
        backgroundDesktop={section5Image}
        backgroundMobile={section5Image}
      />

      <ThreeStepProcess items={section6Items} imageBase={imageBase} />

      <GetStarted />
    </main>
  );
};

export default MerchantAppClient;

