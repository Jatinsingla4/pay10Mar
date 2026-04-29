import React from "react";
import Style from "./page.module.scss";
import BizHeroBanner from "@/app/components/ui/product/BizHeroBanner";
import IntegrationSecondSection from '@/app/components/ui/product/IntegrationSecondSection';
import IntegrationTwoLayout from '@/app/components/ui/product/IntegrationTwoLayout';
import IntegrationReverseLayout from '@/app/components/ui/product/IntegrationReverseLayout';
import TabsWithSlider from '@/app/components/ui/product/TabsWithSlider';
import { fetchApiData } from "@/app/lib/api";
import { defaultMetadata, generateApiMetadata } from "@/app/lib/metadata";

const integrationMethodsDecorations = [
  {
    id: 'document',
    type: 'icon',
    src: '/images/product_page_images/integration_methods_images/wifi_card.svg',
    alt: 'Document',
    size: { width: 64, height: 64 },
    position: {
      desktop: { bottom: '5%', right: '32%' },
      mobile: { bottom: '15%', right: '30%' },
    },
  },
  {
    id: 'mobile-card',
    type: 'icon',
    src: '/images/product_page_images/integration_methods_images/mobile_card.svg',
    alt: 'Mobile Card',
    size: { width: 64, height: 64 },
    position: {
      desktop: { top: '18%', left: '15%' },
      mobile: { top: '15%', left: '25%' },
    },
  },
  {
    id: 'wallet',
    type: 'icon',
    src: '/images/product_page_images/integration_methods_images/wallet.svg',
    alt: 'Wallet',
    size: { width: 64, height: 64 },
    position: {
      desktop: { top: '20%', left: '85%' },
      mobile: { top: '18%', left: '88%' },
    },
  },
  {
    id: 'cubes',
    type: 'icon',
    src: '/images/product_page_images/integration_methods_images/cubes.svg',
    alt: 'Integration',
    size: { width: 64, height: 64 },
    position: {
      desktop: { bottom: '5%', left: '15%' },
      mobile: { top: '50%', left: '12%' },
    },
  },
  {
    id: 'card-machine',
    type: 'icon',
    src: '/images/product_page_images/integration_methods_images/card_machine.svg',
    alt: 'Card Machine',
    size: { width: 64, height: 64 },
    position: {
      desktop: { top: '15%', left: '35%' },
      mobile: { top: '20%', left: '55%' },
    },
  },
  {
    id: 'dollar',
    type: 'icon',
    src: '/images/product_page_images/integration_methods_images/dollar.svg',
    alt: 'Currency',
    size: { width: 64, height: 64 },
    position: {
      desktop: { top: '80%', left: '82%' },
      mobile: { top: '75%', left: '85%' },
    },
  },
  {
    id: 'watch',
    type: 'icon',
    src: '/images/product_page_images/integration_methods_images/watch_scanner.svg',
    alt: 'Wearable Payment',
    size: { width: 64, height: 64 },
    position: {
      desktop: { bottom: '15%', left: '30%' },
      mobile: { bottom: '16%', left: '12%' },
    },
  },
  {
    id: 'circle-4',
    type: 'circle',
    size: { width: '75vmax', height: '75vmax' },
    position: {
      desktop: { top: '50%', left: '50%' },
      mobile: { top: '50%', left: '50%' },
    },
    strokeWidth: 2,
    opacity: 0.45,
  },
  {
    id: 'circle-5',
    type: 'circle',
    size: { width: '55vmax', height: '55vmax' },
    position: {
      desktop: { top: '50%', left: '50%' },
      mobile: { top: '50%', left: '50%' },
    },
    strokeWidth: 2,
    opacity: 0.45,
  },
];

const resolveImageSrc = (raw, imageBase = "") => {
  if (!raw) return "";
  const src = String(raw);
  if (/^https?:\/\//i.test(src) || src.startsWith("/")) return src;
  return `${imageBase}${src}`;
};

const normalizeText = (raw) =>
  String(raw || "")
    .replace(/\r\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const pickBoldAndParagraph = (html) => {
  const src = String(html || "");
  if (!src) return { heading: "", description: "" };
  const heading = src.match(/<b[^>]*>(.*?)<\/b>/i)?.[1] || "";
  const description = src.match(/<p[^>]*>(.*?)<\/p>/i)?.[1] || "";
  return { heading, description };
};

export async function generateMetadata() {
  const apiRes = await fetchApiData("/page/integration-methods");
  if (!apiRes?.status) {
    return {
      ...defaultMetadata,
      title: "Integration Methods | Pay10",
    };
  }
  return generateApiMetadata(
    apiRes?.page_data,
    "Integration Methods | Pay10",
    defaultMetadata.description
  );
}

const page = async () => {
  const apiRes = await fetchApiData("/page/integration-methods");
  const pageDataObj = apiRes?.page_data || {};
  const section3List = Array.isArray(apiRes?.custom_data?.section3?.list)
    ? apiRes.custom_data.section3.list
    : [];
  const section4 = apiRes?.custom_data?.section4 || {};
  const imageBase = process.env.NEXT_PUBLIC_IMAGE_URL || "";

  const topSubHeading = pageDataObj.top_sub_heading || undefined;
  const topHeading = pageDataObj.top_heading || undefined;
  const topDescription = pageDataObj.top_description || "";

  // Section 2: derived from `page_data.content`
  const contentHtml = pageDataObj.content || "";
  const section2Extract = pickBoldAndParagraph(contentHtml);

  // Section 3: list[0..2] = Hosted Payment Page, Mobile SDK, Direct API
  const s3a = section3List[0] || {};
  const s3b = section3List[1] || {};
  const s3c = section3List[2] || {};

  const hostedHeading = s3a.Title || undefined;
  const hostedDesc = normalizeText(s3a["Designation "] || s3a.Designation || s3a.Description);
  const hostedImg =
    resolveImageSrc(s3a.Image, imageBase) ||
    "/images/product_page_images/integration_methods_images/section_second_img.png";

  const mobileHeading = s3b.Title || undefined;
  const mobileDesc = normalizeText(s3b["Designation "] || s3b.Designation || s3b.Description);
  const mobileImg =
    resolveImageSrc(s3b.Image, imageBase) ||
    "/images/product_page_images/integration_methods_images/reverse_grid_img.png";

  const directHeading = s3c.Title || undefined;
  const directDesc = normalizeText(s3c["Designation "] || s3c.Designation || s3c.Description);
  const directImg =
    resolveImageSrc(s3c.Image, imageBase) ||
    "/images/product_page_images/integration_methods_images/third_section_img.png";

  const pluginsHeading = section4.heading || undefined;

  const secondSection = {
    heading: hostedHeading,
    desc: hostedDesc,
    img: hostedImg,
  }

  const thirdSection = {
    heading: directHeading,
    desc: directDesc,
    img: directImg,
  }

  return (
    <>
        <main>
            <section className={Style.integration_banner}>
                <BizHeroBanner
                  eyebrow={topSubHeading}
                  title={topHeading}
                  description={topDescription}
                  ctaHref="https://pay10global.atlassian.net/wiki/external/ZTYxOTg1YjhiNjIyNDYzYjg4ZTFiNmJiYzc5ZDU1OTA"
                  ctaText="API Integration Docs"
                  heroImage={null}
                  decorations={integrationMethodsDecorations}
                  className={Style.integrationBannerCustom}
                />
            </section>

            <IntegrationSecondSection
              heading={section2Extract.heading}
              description={section2Extract.description}
              htmlContent={contentHtml}
              renderHtml={false}
            />

          <div className={Style.bg_circle}>
            <IntegrationTwoLayout
              heading={secondSection.heading}
              desc={secondSection.desc}
              img={secondSection.img}
            />

            <IntegrationReverseLayout
              heading={mobileHeading}
              desc={mobileDesc}
              img={mobileImg}
              imageBase={imageBase}
            />

            <IntegrationTwoLayout
              heading={thirdSection.heading}
              desc={thirdSection.desc}
              img={thirdSection.img}
            />

            <TabsWithSlider
              heading={pluginsHeading}
              section4={section4}
              imageBase={imageBase}
            />
          </div>

        </main>
    </>
  )
}

export default page
