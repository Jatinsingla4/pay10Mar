"use client";

import Style from "./page.module.scss";
import SpotlightProd from "@/app/components/ui/product/pacb-india/SpotlightProd";
import SecondSection from "@/app/components/ui/product/pacb-india/SecondSection";
import SectionThird from "@/app/components/ui/product/pacb-india/SectionThird";
import SectionFourth from "@/app/components/ui/product/pacb-india/SectionFourth";
import GetStarted from "@/app/components/ui/GetStarted";

const PacbIndiaClient = () => {
  return (
    <main>
      <SpotlightProd
        heading=""
        description=""
        bannerImage="/images/product_page_images/banner_img.png"
        bannerImageMob="/images/w-m.png"
        ctaLink="https://www.pay10.in/Pay10world/"
      />

      <SecondSection
        heading=""
        description=""
        image=""
      />

      <SectionThird
        items={[]}
        heading=""
        imageBase=""
        maxWd="max900"
      />

      <SectionFourth sliderData={[]} />

      <GetStarted />
    </main>
  );
};

export default PacbIndiaClient;
