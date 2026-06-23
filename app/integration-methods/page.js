import React from "react";
import Style from "./page.module.scss";
import BizHeroBanner from "@/app/components/ui/product/BizHeroBanner";
import IntegrationSecondSection from '@/app/components/ui/product/IntegrationSecondSection';
import IntegrationTwoLayout from '@/app/components/ui/product/IntegrationTwoLayout';
import IntegrationReverseLayout from '@/app/components/ui/product/IntegrationReverseLayout';
import TabsWithSlider from '@/app/components/ui/product/TabsWithSlider';
import { defaultMetadata } from "@/app/lib/metadata";

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

export async function generateMetadata() {
  return {
    ...defaultMetadata,
    title: "Integration Methods | Pay10",
  };
}

const page = async () => {
  const hostedImg = "/images/product_page_images/integration_methods_images/section_second_img.png";
  const mobileImg = "/images/product_page_images/integration_methods_images/reverse_grid_img.png";
  const directImg = "/images/product_page_images/integration_methods_images/third_section_img.png";

  const secondSection = {
    heading: undefined,
    desc: "",
    img: hostedImg,
  };

  const thirdSection = {
    heading: undefined,
    desc: "",
    img: directImg,
  };

  return (
    <>
        <main>
            <section className={Style.integration_banner}>
                <BizHeroBanner
                  eyebrow={undefined}
                  title={undefined}
                  description=""
                  ctaHref="/contact-us"
                  ctaText="Get In Touch"
                  showCtaIcon={false}
                  heroImage={null}
                  decorations={integrationMethodsDecorations}
                  className={Style.integrationBannerCustom}
                />
            </section>

            <IntegrationSecondSection
              heading=""
              description=""
              htmlContent=""
              renderHtml={false}
            />

          <div className={Style.bg_circle}>
            <IntegrationTwoLayout
              heading={secondSection.heading}
              desc={secondSection.desc}
              img={secondSection.img}
            />

            <IntegrationReverseLayout
              heading={undefined}
              desc=""
              img={mobileImg}
              imageBase=""
            />

            <IntegrationTwoLayout
              heading={thirdSection.heading}
              desc={thirdSection.desc}
              img={thirdSection.img}
            />

            <TabsWithSlider
              heading="Server Integrations"
              section4={{}}
              imageBase=""
              initialTab="server"
              hideTabs={true}
              compactCards={true}
            />
          </div>

        </main>
    </>
  )
}

export default page
