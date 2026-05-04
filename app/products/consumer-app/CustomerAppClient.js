"use client";

import { useState, useEffect } from "react";
import BizHeroBanner, { customerAppDecorations } from "@/app/components/ui/product/BizHeroBanner";
import SimpleLayout from "@/app/components/ui/product/pacb-india/SimpleLayout";
import GetStarted from "@/app/components/ui/GetStarted";
import useApiAuth from "@/app/components/hooks/useApiAuth";
import PageLoader from "@/app/components/ui/PageLoader";
import Style from "./page.module.scss";
import ReverseLayout from "@/app/components/ui/product/pacb-india/ReverseLayout";

const CustomerAppClient = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { makeApiCall } = useApiAuth();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await makeApiCall("/page/product-pay10-app");

        if (!isMounted) return;

        if (result?.status) {
          setPageData(result);
        } else {
          setPageData(null);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching data:", error);
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
  const imageBase = process.env.NEXT_PUBLIC_IMAGE_URL || "";

  // Extract values from API
  const topHeading = pageDataObj.top_heading || "";
  const topDescription = pageDataObj.top_description || "";
  const heroImageSrc = "/images/banner_img1.png";

  // Section 2 - SimpleLayout (items)
  const simpleLayoutItems = Array.isArray(section2.list) ? section2.list : [];

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
          alt: "Pay10 App interface",
          width: 360,
          height: 640,
        }}
        decorations={customerAppDecorations}
      />

      <SimpleLayout
        items={simpleLayoutItems}
        imageBase={imageBase}
        startWithImageLeft={false}
        useBackgroundCircle={true}
      />

      <GetStarted />
    </main>
  );
};

export default CustomerAppClient;
