"use client";

import React from 'react';
import Style from "./page.module.scss";
import ConsumerFeatureSection from "@/app/components/ui/product/ConsumerFeatureSection";
import InteractiveGlobe from "@/app/components/ui/3d/InteractiveGlobe";

const SendAbroadClient = () => {
  return (
    <main>
      <section className={Style.send_hero}>
        <div className={Style.send_hero_text}>
          <h2>
            Your family <br /> shouldn't wait <br /> for their money.
          </h2>
          <p>
            With Pay10 UAE App Send Abroad, your transfer reaches your loved ones the same day — instantly. No days of waiting. No beneficiary delays. Just send, and it's there.
          </p>
        </div>
      </section>

      <section className={Style.stats_strip}>
        <div className={Style.stats_grid}>
          <div className={Style.stat_card}>
            <h3>7</h3>
            <p>Countries live now</p>
          </div>
          <div className={Style.stat_card}>
            <h3>+8</h3>
            <p>Countries coming soon</p>
          </div>
          <div className={Style.stat_card}>
            <h3>140+</h3>
            <p>Countries expanding to</p>
          </div>
          <div className={Style.stat_card}>
            <h3>Instant</h3>
            <p>Same-day every transfer</p>
          </div>
        </div>
      </section>

      <section className={Style.download_cta}>
        <div data-animation="opacity-up">
          <h3>Get the App Now</h3>
        </div>
        <div className={Style.store_buttons} data-animation="opacity-up" data-anim-delay="100">
          <a href="https://apps.apple.com/ae/app/pay10-uae/id6739810874" target="_blank" rel="noopener noreferrer">
            <img src="/images/foo-app1.svg" alt="Download on the App Store" />
          </a>
          <a href="https://play.google.com/store/apps/details?id=ae.payten.wallet.app&hl=en" target="_blank" rel="noopener noreferrer">
            <img src="/images/foo-app2.svg" alt="Get it on Google Play" />
          </a>
        </div>
      </section>

      <ConsumerFeatureSection
        heading={
          <>
            Instant. Same day.<br />
            No waiting. No excuses.
          </>
        }
        subheading="Every other way to send money abroad asks you to wait — to add a beneficiary, wait for approval, then wait again for the money to arrive. Pay10 UAE App Send Abroad doesn't. When you Send Abroad with Pay10, your transfer moves the moment you confirm it."
        imageSrc="/images/prod_imports/consumer-app-phone.png"
        imageAlt="Instant Money Transfer"
        isReversed={false}
        isGreyBg={true}
      />

      <section className={Style.steps_section}>
        <div className={Style.steps_container}>
          <div className={Style.steps_left} data-animation="opacity-up">
            <InteractiveGlobe />
          </div>
          
          <div className={Style.steps_right}>
            <div className={Style.step_card} data-animation="opacity-up" data-anim-delay="100">
              <span className={Style.step_number}>Step 1</span>
              <h3>Open your Pay10 UAE App</h3>
              <p>Select Send Abroad Feature</p>
            </div>
            <div className={Style.step_card} data-animation="opacity-up" data-anim-delay="200">
              <span className={Style.step_number}>Step 2</span>
              <h3>Select country</h3>
              <p>Choose from your available Send Abroad destinations — based on your home country.</p>
            </div>
            <div className={Style.step_card} data-animation="opacity-up" data-anim-delay="300">
              <span className={Style.step_number}>Step 3</span>
              <h3>Enter amount & recipient</h3>
              <p>Enter how much to send and your recipient's details. No waiting for approvals.</p>
            </div>
            <div className={Style.step_card} data-animation="opacity-up" data-anim-delay="400">
              <span className={Style.step_number}>Step 4</span>
              <h3>Sent. Instantly.</h3>
              <p>Confirm and it's done. Your loved one receives their money the same day.</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default SendAbroadClient;
