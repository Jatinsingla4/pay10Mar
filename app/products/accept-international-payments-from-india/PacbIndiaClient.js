"use client";

import { useState, useEffect } from "react";
import Style from "./page.module.scss";
import SpotlightProd from "@/app/components/ui/product/pacb-india/SpotlightProd";
import SecondSection from "@/app/components/ui/product/pacb-india/SecondSection";
import SectionThird from "@/app/components/ui/product/pacb-india/SectionThird";
import SectionFourth from "@/app/components/ui/product/pacb-india/SectionFourth";
import GetStarted from "@/app/components/ui/GetStarted";
import useApiAuth from "@/app/components/hooks/useApiAuth";
import PageLoader from "@/app/components/ui/PageLoader";

const PacbIndiaClient = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { makeApiCall } = useApiAuth();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await makeApiCall('/page/product-pacb-from-india');

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
  const imageBase = process.env.NEXT_PUBLIC_IMAGE_URL || '';

  // Extract values from API
  const topHeading = pageDataObj.top_heading || '';
  const topDescription = pageDataObj.top_description || '';
  const section2Image = pageDataObj.image ? `${imageBase}${pageDataObj.image}` : '';
  const section2Html = pageDataObj.content || '';
  const section2Heading =
    typeof section2Html === "string"
      ? (section2Html.match(/<b[^>]*>(.*?)<\/b>/i)?.[1] || "")
      : "";
  const section2Description =
    typeof section2Html === "string"
      ? (section2Html.match(/<p[^>]*>(.*?)<\/p>/i)?.[1] || "")
      : "";

  // Section 3 - SectionThird (gridBoxes)
  const section3Heading = section3.heading || '';
  const section3Items = Array.isArray(section3.list) ? section3.list : [];

  // Section 4 - SectionFourth (slider data)
  // Transform API data into sliderData format
  const sliderData = Array.isArray(section4.list) && section4.list.length > 0
    ? section4.list.map((item) => {
        const imageUrl = item.Image ? `${imageBase}${item.Image}` : '';
        return {
          image: imageUrl,
          text: item.Title || '',
        };
      })
    : [];

  if (loading && !pageData) {
    return <PageLoader />;
  }

  return (
    <main>
      <SpotlightProd
        heading={topHeading}
        description={topDescription}
        bannerImage="/images/product_page_images/banner_img.png"
        bannerImageMob="/images/w-m.png"
        // ctaLink="/contact-us"
        ctaLink="https://www.pay10.in/Pay10world/"
      />

      <SecondSection
        heading={section2Heading}
        description={section2Description}
        image={section2Image}
      />

      <SectionThird
        items={section3Items}
        heading={section3Heading}
        imageBase={imageBase}
        maxWd="max900"
      />

      <SectionFourth sliderData={sliderData} />

      <GetStarted />
    </main>
  );
};

export default PacbIndiaClient;

