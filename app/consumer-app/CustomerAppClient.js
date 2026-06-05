"use client";

import { useState, useEffect } from "react";
import MapHeroBanner from "@/app/components/ui/product/MapHeroBanner";
import SimpleLayout from "@/app/components/ui/product/pacb-india/SimpleLayout";
import GetStarted from "@/app/components/ui/GetStarted";
import useApiAuth from "@/app/components/hooks/useApiAuth";
import PageLoader from "@/app/components/ui/PageLoader";
import { TextCenterAppCard } from "@/app/components/ui/TextCenterBlock";
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

  const heroImage = {
    src: "/images/prod_imports/consumer-app-phone.png",
    alt: "Pay10 Consumer App",
    width: 412,
    height: 372,
  };

  // Section 2 - SimpleLayout (items)
  const simpleLayoutItems = Array.isArray(section2.list) ? section2.list : [];

  if (loading && !pageData) {
    return <PageLoader />;
  }

  return (
    <main>
      <MapHeroBanner
        eyebrow={pageDataObj.top_sub_heading || ""}
        title={pageDataObj.top_heading || ""}
        description={pageDataObj.top_description || ""}
        heroImage={heroImage}
        mapImageSrc="/images/temp/adf.png"
        ctaText=""
      />

      <SimpleLayout
        items={simpleLayoutItems}
        imageBase={imageBase}
        startWithImageLeft={false}
        useBackgroundCircle={true}
        copyVariant="consumer"
      />

      <TextCenterAppCard />

      <GetStarted />
    </main>
  );
};

export default CustomerAppClient;
