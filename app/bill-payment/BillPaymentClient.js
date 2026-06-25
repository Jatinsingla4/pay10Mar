"use client";

import React from 'react';
import Style from "./page.module.scss";
import ConsumerFeatureSection from "@/app/components/ui/product/ConsumerFeatureSection";

const BillPaymentClient = () => {
  const utilitySection = {
    heading: "Utility Bill Payments (Coming Soon)",
    subheading: "Your home runs on it. Pay10 makes it easy. Electricity, water, gas, chiller — wherever you live in the UAE, Pay10 UAE App connects you to your authority's billing system directly.",
    points: [
      "Pay electricity, water, gas, and chiller bills in one place",
      "Covers all 7 Emirates — your provider is here",
      "No more logging into separate utility portals",
      "Payment confirmed instantly — no processing delays"
    ],
    imageSrc: "/images/prod_imports/link_acc.png",
    imageAlt: "Utility Bill Payments",
    isReversed: false,
    isGreyBg: true,
  };

  const telecomSection = {
    heading: "Telecom",
    subheading: "Stay connected. Never run out. Pay your phone bill or top up your credit — for both e& and du, prepaid and postpaid — without leaving the app.",
    points: [
      "Pay postpaid bills for e& and du instantly",
      "Top up prepaid credit — for yourself or someone else",
      "Never get cut off because you forgot to recharge",
      "Both UAE network operators — covered"
    ],
    imageSrc: "/images/prod_imports/consumer-app-phone.png",
    imageAlt: "Telecom Bill Payments",
    isReversed: true, // left side photo, right side text
    isGreyBg: true,
  };

  const transportSection = {
    heading: "Top up your commute — all 7 Emirates.",
    subheading: "From your NOL card in Dubai to transport cards across every Emirate — Pay10 has every mode of public transport covered at launch.",
    points: [
      "Top up NOL — metro, bus, tram, ferry, and more",
      "All public transport providers across all 7 Emirates",
      "12 transport authorities enabled from day one"
    ],
    imageSrc: "/images/prod_imports/link_acc.png",
    imageAlt: "Transport Bill Payments",
    isReversed: false, // text left, image right
    isGreyBg: true,
  };

  const giftCardSection = {
    heading: "Gift Cards",
    subheading: "When a bill feels like a gift. Buy a prepaid gift card for someone you love — from Pay10, in seconds. No wrapping. No guessing. Just pick, pay, and send.",
    points: [
      "Buy prepaid gift cards directly from Pay10",
      "Send to anyone — digitally, instantly",
      "Perfect for birthdays, celebrations, or just because",
      "Choose the amount. They choose what to spend it on."
    ],
    imageSrc: "/images/prod_imports/consumer-app-phone.png",
    imageAlt: "Gift Cards",
    isReversed: true, // left side photo, right side text
    isGreyBg: true,
  };

  return (
    <main>
      <section className={Style.bill_hero}>
        <div className={Style.bill_hero_text}>
          <h2>
            Never miss a bill. <br /> Never switch apps again.
          </h2>
          <p>
            All your UAE bills — utilities, telecom, transport, and gift cards — paid from one place. No more juggling apps, portals, or queues.
          </p>
          <p className={Style.slogan}>
            Why Pay when you can Pay10!
          </p>
        </div>
      </section>

      <ConsumerFeatureSection
        heading={utilitySection.heading}
        subheading={utilitySection.subheading}
        points={utilitySection.points}
        imageSrc={utilitySection.imageSrc}
        imageAlt={utilitySection.imageAlt}
        isReversed={utilitySection.isReversed}
        isGreyBg={utilitySection.isGreyBg}
      />

      <ConsumerFeatureSection
        heading={telecomSection.heading}
        subheading={telecomSection.subheading}
        points={telecomSection.points}
        imageSrc={telecomSection.imageSrc}
        imageAlt={telecomSection.imageAlt}
        isReversed={telecomSection.isReversed}
        isGreyBg={telecomSection.isGreyBg}
      />

      <ConsumerFeatureSection
        heading={transportSection.heading}
        subheading={transportSection.subheading}
        points={transportSection.points}
        imageSrc={transportSection.imageSrc}
        imageAlt={transportSection.imageAlt}
        isReversed={transportSection.isReversed}
        isGreyBg={transportSection.isGreyBg}
      />

      <ConsumerFeatureSection
        heading={giftCardSection.heading}
        subheading={giftCardSection.subheading}
        points={giftCardSection.points}
        imageSrc={giftCardSection.imageSrc}
        imageAlt={giftCardSection.imageAlt}
        isReversed={giftCardSection.isReversed}
        isGreyBg={giftCardSection.isGreyBg}
      />
    </main>
  );
};

export default BillPaymentClient;
