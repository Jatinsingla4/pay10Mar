"use client";

import React from 'react';
import Style from "./page.module.scss";

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
    </main>
  );
};

export default SendAbroadClient;
