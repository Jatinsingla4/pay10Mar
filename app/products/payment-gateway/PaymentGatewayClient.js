"use client";

import MultiPaymentsMethod from "@/app/components/ui/product/pacb-india/MultiPaymentsMethod";
import SimpleLayout from "@/app/components/ui/product/pacb-india/SimpleLayout";
import PaymentLinks from "@/app/components/ui/product/pacb-india/PaymentLinks";
import BannerBreaker from '@/app/components/ui/BannerBreaker';
import GetStarted from "@/app/components/ui/GetStarted";
import PaymentGatewayHero from "@/app/components/ui/product/PaymentGatewayHero";
import AdaptivePaymentIntegrationSection from "@/app/components/ui/product/AdaptivePaymentIntegrationSection";
import FeaturesWithImage from "@/app/components/ui/product/FeaturesWithImage";

const PaymentGatewayClient = () => {
  return (
    <main>
      <PaymentGatewayHero
        eyebrow={undefined}
        title={undefined}
        trustStatement={undefined}
        description={undefined}
        ctaLabel="Get Started"
        ctaHref="/contact-us"
      />

      <FeaturesWithImage
        heading=""
        image=""
        items={[]}
        imageBase=""
      />

      <MultiPaymentsMethod
        heading=""
        description=""
        items={[]}
        imageBase=""
      />

      <SimpleLayout items={[]} imageBase="" startWithImageLeft={false}/>

      <AdaptivePaymentIntegrationSection
        heading=""
        description=""
        image=""
        imageBase=""
        items={[]}
      />

      <PaymentLinks
        heading=""
        description=""
        image={undefined}
        items={[]}
      />

      <BannerBreaker
        title=""
        description=""
        backgroundDesktop=""
        backgroundMobile=""
      />

      <GetStarted />
    </main>
  );
};

export default PaymentGatewayClient;
