"use client";

import React from "react";
import { Icon } from "@iconify/react";
import Style from "./ConsumerHero.module.scss";

const features = [
  {
    icon: "ph:qr-code-bold",
    title: "Scan & Pay",
    description: "Scan any Pay10 DQR code at merchants across all 7 Emirates. Pay instantly - no card, no cash.",
  },
  {
    icon: "ph:paper-plane-tilt-bold",
    title: "Transfer & Send",
    description: "Transfer to yourself or anyone - just enter the IBAN. No login waits, no approvals. Instant.",
  },
  {
    icon: "ph:device-mobile-bold",
    title: "Send to Mobile",
    description: "Send money to anyone using their UAE mobile number. No bank details needed.",
  },
  {
    icon: "ph:clock-counter-clockwise-bold",
    title: "Track & Control",
    description: "Every payment, every transfer - your full financial history in one place.",
  },
  {
    icon: "ph:receipt-bold",
    title: "Pay Bills (Coming Soon)",
    description: "All your bills; Utility, Telcom, Transport, and Gift Cards - . All 7 Emirates. One app.",
  },
  {
    icon: "ph:globe-hemisphere-west-bold",
    title: "Send Abroad (Coming Soon)",
    description: "Send money home to your loved ones. Instantly.",
  },
  {
    icon: "ph:credit-card-bold",
    title: "Pay10 Card (Coming Soon)",
    description: "UAE's first CBUAE-accredited local Jaywan debit card. Instant, secure, seamless.",
  },
];

const ConsumerHero = () => {
  return (
    <section className={Style.consumer_hero}>
      <div className={Style.hero_content}>
        <h5 className={Style.eyebrow} data-animation="opacity-up">
          Pay10 UAE App · Consumer super app
        </h5>
        <h1 className={Style.headline} data-animation="opacity-up" data-anim-delay="100">
          PAY SMARTER, SEND FASTER, <br /> LIVE EASIER - ALL IN ONE APP.
        </h1>
        <p className={Style.description} data-animation="opacity-up" data-anim-delay="200">
          One app for every payment moment in the UAE. scan and pay, transfer money, send to mobile, pay bills, send abroad and track it all - all from Pay10.
        </p>
      </div>

      <svg width="0" height="0">
        <defs>
          <linearGradient id="heroIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffb100" />
            <stop offset="100%" stopColor="#ff0000" />
          </linearGradient>
        </defs>
      </svg>

      <div className={Style.features_wrapper} data-animation="opacity-up" data-anim-delay="300">
        <div className={Style.features_scroll}>
          {features.map((item, index) => (
            <div className={Style.feature_card} key={index}>
              <div className={Style.feature_icon}>
                <Icon icon={item.icon} width="36" height="36" />
              </div>
              <h3 className={Style.feature_title}>{item.title}</h3>
              <p className={Style.feature_desc}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConsumerHero;
