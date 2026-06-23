"use client";

import React, { useState } from "react";
import Style from "./events.module.scss";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";

const FALLBACK_EVENTS = [
  {
    key: "gitex-global-2024",
    img: "/images/events_images/events_details_imgs/1.png",
    smalltxt: "14-18 October 2024",
    heading: "GITEX Global 2024",
    link: "/events/gitex-global-2024",
    desc: "Pay10 showcased its digital payment platform at GITEX Global — the world's leading tech show in Dubai, connecting with 6,000+ exhibitors and 180,000+ visitors.",
    status: "past",
  },
  {
    key: "seamless-middle-east-2025",
    img: "/images/events_images/events_details_imgs/2.png",
    smalltxt: "11-12 June 2025",
    heading: "Seamless Middle East 2025",
    link: "/events/seamless-middle-east-2025",
    desc: "Pay10 joined regional fintech leaders at Seamless Middle East, the premier event for payments and digital commerce in the UAE and MENA region.",
    status: "past",
  },
  {
    key: "fintech-abu-dhabi-2025",
    img: "/images/events_images/events_details_imgs/3.png",
    smalltxt: "4-6 November 2025",
    heading: "FinTech Abu Dhabi 2025",
    link: "/events/fintech-abu-dhabi-2025",
    desc: "Join Pay10 at FinTech Abu Dhabi 2025 — bringing together the brightest minds in financial technology across the MENA region to shape the future of payments.",
    status: "upcoming",
  },
  {
    key: "global-fintech-fest-2025",
    img: "/images/events_images/events_details_imgs/4.png",
    smalltxt: "27-29 August 2025",
    heading: "Global Fintech Fest 2025",
    link: "/events/global-fintech-fest-2025",
    desc: "Pay10 returns to the world's largest fintech festival in Mumbai, showcasing its next-generation digital wallet and merchant payment solutions.",
    status: "upcoming",
  },
];

const HERO_EVENT = FALLBACK_EVENTS[0];

const HeroBannerContent = ({ heroImage, heroTitle, heroDescription, heroDates, Style }) => (
  <>
    <div className={Style.hero_img_logo}>
      <Image
        src={heroImage}
        alt={heroTitle || "Pay10 Event"}
        width={150}
        height={150}
        style={{ width: "100%", height: "auto" }}
        unoptimized={heroImage.startsWith("http")}
      />
    </div>
    <div className={Style.banner_content}>
      {heroDates.primary && (
        <div style={{ width: "30%" }}>
          <h2>{heroDates.primary}</h2>
          <h5>{heroDates.secondary}</h5>
        </div>
      )}
      <div>
        <div className={Style.banner_txt_icon}>
          <div className={Style.banner_txt_icon_content}>
            {heroTitle && <h3>{heroTitle}</h3>}
            {heroDescription && <p>{heroDescription}</p>}
          </div>
        </div>
      </div>
    </div>
  </>
);

const page = () => {
  const topSubHeading = "EVENTS & CONFERENCES";
  const topHeading = "Our Events";

  const heroTitle = HERO_EVENT.heading;
  const heroDescription = HERO_EVENT.desc;
  const heroImage = HERO_EVENT.img;
  const heroDates = { primary: "14-18", secondary: "Oct 2024" };

  return (
    <main className={Style.eventMain}>
      <div className={Style.wrapper}>
        <div className={Style.events_banner_headings}>
          <h5>{topSubHeading}</h5>
          <h2>{topHeading}</h2>
        </div>

        <Link href={HERO_EVENT.link} className={Style.events_banner_img}>
          <HeroBannerContent heroImage={heroImage} heroTitle={heroTitle} heroDescription={heroDescription} heroDates={heroDates} Style={Style} />
        </Link>
      </div>

      <div className={Style.events_bg_circle}>
        <Image
          src="/images/events_images/events_bg_circle.png"
          alt=""
          width={1920}
          height={1080}
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      <section className={Style.wrapper}>
        <div className={Style.all_events_container}>
          {FALLBACK_EVENTS.map((event) => {
            const cardInner = (
              <>
                <div className={Style.events_box_img}>
                  <Image
                    src={event.img}
                    alt={event.heading || "Event"}
                    width={160}
                    height={160}
                    style={{ width: "100%", height: "auto" }}
                    unoptimized={event.img.startsWith("http")}
                  />
                </div>
                <div className={Style.events_box_content}>
                  <div className={Style.events_box_headings}>
                    <div className={Style.events_box_meta}>
                      {event.smalltxt && <h6>{event.smalltxt}</h6>}
                      <span className={`${Style.event_tag} ${Style[`event_tag_${event.status}`]}`}>
                        {event.status === "upcoming" ? "Upcoming" : "Past"}
                      </span>
                    </div>
                    <h3>{event.heading}</h3>
                  </div>
                  {event.desc && <p>{event.desc}</p>}
                  {event.link && (
                    <div className={Style.events_box_cta}>
                      <span>Learn More</span>
                      <Icon icon="fa6-solid:angle-right" />
                    </div>
                  )}
                </div>
              </>
            );
            return event.link ? (
              <Link key={event.key} href={event.link} className={Style.events_box} data-animation="opacity-up">
                {cardInner}
              </Link>
            ) : (
              <div key={event.key} className={Style.events_box} data-animation="opacity-up">
                {cardInner}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default page;
