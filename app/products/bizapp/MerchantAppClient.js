"use client";

import { useState, useEffect } from "react";
import Style from "./page.module.scss";
import MapHeroBanner from "@/app/components/ui/product/MapHeroBanner";
import BannerBreaker from "@/app/components/ui/BannerBreaker";
import SectionThird from "@/app/components/ui/product/pacb-india/SectionThird";
import SimpleLayout from "@/app/components/ui/product/pacb-india/SimpleLayout";
import IntegrationTwoLayout from "@/app/components/ui/product/IntegrationTwoLayout";
import IntegrationReverseLayout from "@/app/components/ui/product/IntegrationReverseLayout";
import ThreeStepProcess from "@/app/components/ui/product/ThreeStepProcess";
import { TextCenterAppCard } from "@/app/components/ui/TextCenterBlock";
import useApiAuth from "@/app/components/hooks/useApiAuth";
import PageLoader from "@/app/components/ui/PageLoader";
import { cmsImageSrc } from "@/app/lib/cmsImageSrc";

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
  const imageBase = process.env.NEXT_PUBLIC_IMAGE_URL || "";

  const heroCmsSrc = pageDataObj.image ? cmsImageSrc(pageDataObj.image, imageBase) : null;
  const heroImage = {
    src: heroCmsSrc || "/images/product_page_images/ppa122.png",
    alt: pageDataObj.name ? `${pageDataObj.name} hero` : "Pay10 BIZ app interface",
    width: pageDataObj.image_width || 360,
    height: pageDataObj.image_height || 640,
  };

  // Section 3 - SectionThird (gridBoxes)
  const section3Heading = section3.heading || '';

  const section3Items = Array.isArray(section3.list) ? section3.list : [];

  // Section 4 - SimpleLayout (items)
  const simpleLayoutItems = Array.isArray(section4.list) ? section4.list : [];

  const section5Description = section5.description || '';
  const section5Image = section5.image
    ? cmsImageSrc(section5.image, imageBase) || undefined
    : undefined;

  // Section 6 - ThreeStepProcess (steps)
  const section6Items = Array.isArray(section6.list) ? section6.list : [];

  if (loading && !pageData) {
    return <PageLoader />;
  }

  return (
    <main>
      <MapHeroBanner
        eyebrow={pageDataObj.top_sub_heading || ""}
        title={pageDataObj.top_heading || ""}
        description={pageDataObj.top_description || ""}
        ctaHref="/contact-us"
        ctaText="Get In Touch"
        heroImage={heroImage}
        mapImageSrc="/images/temp/adf.png"
      />

      <SimpleLayout items={simpleLayoutItems} imageBase={imageBase} />

      <SectionThird
        items={section3Items}
        heading={section3Heading}
        imageBase={imageBase}
        description="Make your business more cost-efficient with a Pay10 Biz Wallet and watch those profit margins grow."
      />

    <section className={Style.section_space}>
      <div className={Style.merchant_feature_circles}>
        <IntegrationTwoLayout
          heading="Take Control of Your Business"
          desc="Manage your users, oversee your account, and track your funds on our user-friendly dashboard."
          img="/images/af11.avif"
        />
        <IntegrationReverseLayout
          heading="Get Up and Running in a Flash"
          desc="Our onboarding couldn't be simpler and we're always here to help guide you along the way."
          img="/images/img2-1777972464.avif"
          imageBase={imageBase}
        />
      </div>
    </section>

      <ThreeStepProcess items={section6Items} imageBase={imageBase} />

      <TextCenterAppCard
        title="Merchant App"
        appleHref="https://apps.apple.com/ae/app/pay10-biz-uae/id6741104134"
        playHref="https://play.google.com/store/apps/details?id=ae.pay10.merchant.app"
      />

      <div className={Style.section5BannerWrap}>
        <BannerBreaker
          title={section5.heading}
          description={section5Description}
          backgroundDesktop={section5Image}
          backgroundMobile={section5Image}
          classN={Style.section5BannerInner}
          logo={false}
          showCta={false}
        />
      </div>

    </main>
  );
};

export default MerchantAppClient;

