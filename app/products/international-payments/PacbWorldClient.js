"use client";

import { useState, useEffect } from "react";
import Style from "./page.module.scss";
import SpotlightProd from "@/app/components/ui/product/pacb-india/SpotlightProd";
import AboutSecondSection from "@/app/components/ui/about/AboutSecondSection";
import BannerBreaker from "@/app/components/ui/BannerBreaker";
import SectionFourth from "@/app/components/ui/product/pacb-india/SectionFourth";
import GetStarted from "@/app/components/ui/GetStarted";
import FeaturesWithImage from "@/app/components/ui/product/FeaturesWithImage";
import useApiAuth from "@/app/components/hooks/useApiAuth";
import PageLoader from "@/app/components/ui/PageLoader";

const PacbWorldClient = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { makeApiCall } = useApiAuth();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await makeApiCall('/page/product-pacb-from-world');

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
  const imageBase = process.env.NEXT_PUBLIC_IMAGE_URL || '';

  // Extract values from API
  const topHeading = pageDataObj.top_heading || '';
  const topDescription = pageDataObj.top_description || '';
  const section2Image = pageDataObj.image ? `${imageBase}${pageDataObj.image}` : '';
  const section2Html = pageDataObj.content || '';

  // Section 3 - Business Edge Section
  const section3Heading = section3.heading || '';
  const section3Image = section3.image ? `${imageBase}${section3.image}` : '';

  // Transform API data into features format
  const features = Array.isArray(section3.list) ? section3.list : [];

  // Section 4 - BannerBreaker
  const section4Heading = section4.heading || '';
  const section4Description = section4.description || '';
  const section4Image = section4.image ? `${imageBase}${section4.image}` : '';

  // Section 5 - SectionFourth (slider data)
  // Transform API data into sliderData format
  const sliderData = Array.isArray(section5.list)
    ? section5.list.map((item) => ({
        image: item?.Image ? `${imageBase}${item.Image}` : '',
        text: item?.Title || '',
      }))
    : [];

  if (loading && !pageData) {
    return <PageLoader />;
  }

  return (
    <main>
      <SpotlightProd
        heading={topHeading}
        description={topDescription}
        bannerImage="/images/product_page_images/pacb-world.png"
        bannerImageMob="/images/product_page_images/world-pac-m1.png"
        // ctaLink="/contact-us"
        ctaLink="https://www.pay10.in/Pay10world/"
      />

      <section className={Style.bg_circle}>
        <div className={Style.wrapper}>
          <AboutSecondSection
            colReverse={true}
            section2Image={section2Image}
            section2Html={section2Html}
          />
        </div>

        <FeaturesWithImage
          heading={section3Heading}
          image={section3Image}
          items={features}
          imageBase={imageBase}
        />
      </section>

      <BannerBreaker
        classN={'max910'}
        logo={false}
        title={section4Heading}
        description={section4Description}
        backgroundDesktop={section4Image}
        backgroundMobile={section4Image}
        ctaImg='/images/knw-btn.png'
        ctaLink='/products/accept-international-payments-from-india'
      />

      <SectionFourth sliderData={sliderData} />

      <GetStarted />
    </main>
  );
};

export default PacbWorldClient;

