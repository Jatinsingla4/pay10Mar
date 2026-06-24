"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Style from "./events.module.scss";
import { Icon } from "@iconify/react";

const EVENTS = [
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

const page = () => {
  return (
    <main>
      {/* Hero Banner — gradient banner matching news-room style */}
      <section className={Style.bannerSection}>
        <div className={Style.bannerOverlay} />
        <div className={Style.bannerContent}>
          <h5 data-animation="opacity-up">EVENTS &amp; CONFERENCES</h5>
          <h1 data-animation="opacity-up" data-anim-delay="100">Our Events</h1>
          <p data-animation="opacity-up" data-anim-delay="200">Discover the events and conferences where Pay10 connects, innovates, and leads the future of digital payments.</p>
        </div>
      </section>

      {/* Events listing — vertical card design */}
      <section className={Style.wrapper}>
        <div className={Style.all_events_container}>
          {EVENTS.map((event, idx) => (
            <Link key={event.key} href={event.link} className={Style.events_box} data-animation="opacity-up" data-anim-delay={idx * 150}>
              <div className={Style.events_box_img}>
                <Image
                  src={event.img}
                  alt={event.heading}
                  width={160}
                  height={160}
                  style={{ width: "100%", height: "auto" }}
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
                <div className={Style.events_box_cta}>
                  <span>Learn More</span>
                  <Icon icon="fa6-solid:angle-right" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: "center", width: "100%" }} data-animation="scale-up">
          <button className={Style.load_more_btn}>Load More</button>
        </div>
      </section>
    </main>
  );
};

export default page;
