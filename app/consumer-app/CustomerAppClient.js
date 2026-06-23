"use client";

import MapHeroBanner from "@/app/components/ui/product/MapHeroBanner";
import SimpleLayout from "@/app/components/ui/product/pacb-india/SimpleLayout";
import GetStarted from "@/app/components/ui/GetStarted";
import { TextCenterAppCard } from "@/app/components/ui/TextCenterBlock";

const CustomerAppClient = () => {
  const heroImage = {
    src: "/images/prod_imports/consumer-app-phone.png",
    alt: "Pay10 Consumer App",
    width: 412,
    height: 372,
  };

  return (
    <main>
      <MapHeroBanner
        eyebrow=""
        title=""
        description=""
        heroImage={heroImage}
        mapImageSrc="/images/temp/adf.png"
        ctaText=""
      />

      <SimpleLayout
        items={[]}
        imageBase=""
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
