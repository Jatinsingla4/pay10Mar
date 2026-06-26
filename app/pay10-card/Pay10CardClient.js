"use client";

import React from "react";
import Style from "./page.module.scss";
import ConsumerFeatureSection from "@/app/components/ui/product/ConsumerFeatureSection";
import Pay10CardFeatures from "./components/Pay10CardFeatures";
import Pay10AppFeature from "./components/Pay10AppFeature";
import Pay10WPSFeature from "./components/Pay10WPSFeature";

const Pay10CardClient = () => {
  const cardFeature = {
    heading: "The first local Debit Card accredited by the Central Bank of the UAE.",
    subheading: "Pay10 is issuing UAE's first CBUAE-accredited local debit card directly through the Pay10 UAE App - offering an instant, secure, and seamless payment experience for everyone who calls the UAE home.",
    points: [],
    extraContent: (
      <div style={{ marginTop: '24px', fontFamily: "'bold', sans-serif", fontSize: '18px', letterSpacing: '1px', textTransform: 'uppercase', color: '#444' }}>
        POWERED BY JAYWAN &middot; UAE'S NATIONAL CARD SCHEME
      </div>
    ),
    imageSrc: "/images/prod_imports/link_acc.png",
    imageAlt: "Pay10 Card",
    isReversed: false,
  };

  return (
    <main>
      <section className={Style.altareq_hero}>
        <div className={Style.altareq_hero_text}>
          <h2>
            Pay10 Card, UAE has been waiting for.
          </h2>
          <p>
            The first local Debit Card accredited by the Central Bank of the UAE — instant, secure, and seamless. Built inside Pay10 UAE App. For banked professionals and WPS employees.
          </p>
        </div>
      </section>

      <div className={Style.bg_circle_wrapper}>

        <ConsumerFeatureSection
          heading={cardFeature.heading}
          subheading={cardFeature.subheading}
          points={cardFeature.points}
          extraContent={cardFeature.extraContent}
          imageSrc={cardFeature.imageSrc}
          imageAlt={cardFeature.imageAlt}
          isReversed={cardFeature.isReversed}
          isGreyBg={false}
          isTransparent={true}
        />

        <Pay10CardFeatures />

        {/* ── Dual Debit Card Section ── */}
        <section className={Style.dual_card_section}>
          <div className={Style.dual_card_header} data-animation="opacity-up">
            <h2>Two cards. One app. Every need covered.</h2>
            <p>Whether you're a salaried professional or a WPS employee, Pay10 has a Jaywan-powered debit card built for your life in the UAE.</p>
          </div>

          <div className={Style.dual_card_grid}>
            {/* Consumer Debit Card */}
            <div className={Style.card_wrapper} data-animation="opacity-up" data-anim-delay="100">
              <div className={Style.debit_card}>
                <div className={Style.debit_card_inner_circle} />
                <div className={Style.card_top}>
                  <span className={Style.card_logo}>Pay10</span>
                  <span className={Style.card_type_badge}>Consumer</span>
                </div>
                <div className={Style.card_chip}>
                  <svg viewBox="0 0 44 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1" y="1" width="42" height="32" rx="5" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
                    <rect x="13" y="1" width="1.5" height="32" fill="rgba(255,255,255,0.3)"/>
                    <rect x="29" y="1" width="1.5" height="32" fill="rgba(255,255,255,0.3)"/>
                    <rect x="1" y="11" width="42" height="1.5" fill="rgba(255,255,255,0.3)"/>
                    <rect x="1" y="21" width="42" height="1.5" fill="rgba(255,255,255,0.3)"/>
                  </svg>
                </div>
                <div className={Style.card_bottom}>
                  <span className={Style.card_number}>•••• •••• •••• 4210</span>
                  <div className={Style.card_meta}>
                    <span className={Style.card_name}>Pay10 Holder</span>
                    <div className={Style.card_scheme}>
                      <img src="/images/prod_imports/Mastercard.svg" alt="Mastercard" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={Style.card_info}>
                <h3>Consumer Debit Card</h3>
                <p>For Pay10 UAE App users. Tap, swipe, or pay online — works at 90%+ of UAE POS terminals and all major ATMs.</p>
              </div>
            </div>

            {/* WPS Debit Card */}
            <div className={Style.card_wrapper} data-animation="opacity-up" data-anim-delay="200">
              <div className={Style.debit_card}>
                <div className={Style.debit_card_inner_circle} />
                <div className={Style.card_top}>
                  <span className={Style.card_logo}>Pay10</span>
                  <span className={Style.card_type_badge}>WPS</span>
                </div>
                <div className={Style.card_chip}>
                  <svg viewBox="0 0 44 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1" y="1" width="42" height="32" rx="5" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
                    <rect x="13" y="1" width="1.5" height="32" fill="rgba(255,255,255,0.3)"/>
                    <rect x="29" y="1" width="1.5" height="32" fill="rgba(255,255,255,0.3)"/>
                    <rect x="1" y="11" width="42" height="1.5" fill="rgba(255,255,255,0.3)"/>
                    <rect x="1" y="21" width="42" height="1.5" fill="rgba(255,255,255,0.3)"/>
                  </svg>
                </div>
                <div className={Style.card_bottom}>
                  <span className={Style.card_number}>•••• •••• •••• 1099</span>
                  <div className={Style.card_meta}>
                    <span className={Style.card_name}>WPS Employee</span>
                    <div className={Style.card_scheme}>
                      <img src="/images/prod_imports/Mastercard.svg" alt="Mastercard" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={Style.card_info}>
                <h3>WPS Debit Card</h3>
                <p>For WPS-enrolled employees. Receive your salary directly and spend instantly — no bank account required.</p>
              </div>
            </div>
          </div>
        </section>

        <Pay10AppFeature />

        <Pay10WPSFeature />

      </div>
    </main>
  );
};

export default Pay10CardClient;
