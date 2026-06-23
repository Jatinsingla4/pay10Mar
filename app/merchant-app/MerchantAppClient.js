"use client";

import Style from "./page.module.scss";
import MapHeroBanner from "@/app/components/ui/product/MapHeroBanner";
import BannerBreaker from "@/app/components/ui/BannerBreaker";
import SectionThird from "@/app/components/ui/product/pacb-india/SectionThird";
import SimpleLayout from "@/app/components/ui/product/pacb-india/SimpleLayout";
import IntegrationTwoLayout from "@/app/components/ui/product/IntegrationTwoLayout";
import IntegrationReverseLayout from "@/app/components/ui/product/IntegrationReverseLayout";
import ThreeStepProcess from "@/app/components/ui/product/ThreeStepProcess";
import { TextCenterAppCard } from "@/app/components/ui/TextCenterBlock";

const MerchantAppClient = () => {
  return (
    <main>
      <MapHeroBanner
        eyebrow={undefined}
        title={undefined}
        description={undefined}
        ctaHref="/contact-us"
        ctaText="Get In Touch"
        heroImage={{ src: null, alt: undefined, width: undefined, height: undefined }}
        mapImageSrc="/images/temp/adf.png"
      />

      <SimpleLayout items={[]} imageBase="" />

      <SectionThird
        items={[]}
        heading={undefined}
        imageBase=""
        description={undefined}
      />

    <section className={Style.section_space}>
      <div className={Style.merchant_feature_circles}>
        <IntegrationTwoLayout
          heading={undefined}
          desc={undefined}
          img={undefined}
        />
        <IntegrationReverseLayout
          heading={undefined}
          desc={undefined}
          img={undefined}
          imageBase=""
        />
      </div>
    </section>

      <ThreeStepProcess items={[]} imageBase="" />

      <TextCenterAppCard
        title="Merchant App"
        appleHref="https://apps.apple.com/ae/app/pay10-biz-uae/id6741104134"
        playHref="https://play.google.com/store/apps/details?id=ae.pay10.merchant.app"
      />

      <div className={Style.section5BannerWrap}>
        <BannerBreaker
          title={undefined}
          description={undefined}
          backgroundDesktop={undefined}
          backgroundMobile={undefined}
          classN={Style.section5BannerInner}
          logo={false}
          showCta={false}
        />
      </div>

    </main>
  );
};

export default MerchantAppClient;
