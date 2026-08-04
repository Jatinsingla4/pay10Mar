"use client";

import React from "react";
import Link from "next/link";
import Style from "./events.module.scss";
import { Icon } from "@iconify/react";
import { isEmptyHtml } from "../lib/sanitizeHtml";

const firstNonEmptyHtml = (...vals) => vals.find(v => !isEmptyHtml(v)) ?? vals[vals.length - 1];


function formatEventDate(start) {
  if (!start) return "Date TBA";
  const startDate = new Date(start);
  const startDay = startDate.getDate();
  const startMonth = startDate.toLocaleString("en-US", { month: "long" });
  const startYear = startDate.getFullYear();
  return `${startDay} ${startMonth} ${startYear}`;
}

export default function EventsClient({ initialEvents = [], pageData = null }) {
  const getEventStatus = (endDateStr) => {
    if (!endDateStr) return "upcoming";
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const end = new Date(endDateStr);
    return end < today ? "past" : "upcoming";
  };

  return (
    <main>
      <section 
        className={Style.bannerSection}
        style={{
          ...(pageData?.banner_image ? { '--bg-desktop': `url(${pageData.banner_image})` } : {}),
          ...(pageData?.mobile_image ? { '--bg-mobile': `url(${pageData.mobile_image})` } : (pageData?.banner_image ? { '--bg-mobile': `url(${pageData.banner_image})` } : {})),
        }}
      >
        <div className={Style.bannerOverlay} />
        <div className={Style.bannerContent}>
          <h1 data-animation="opacity-up" dangerouslySetInnerHTML={{ __html: firstNonEmptyHtml(pageData?.page_title, "Our Events") }} />
          <p data-animation="opacity-up" data-anim-delay="200" dangerouslySetInnerHTML={{ __html: firstNonEmptyHtml(pageData?.page_subtitle, "Discover the events and conferences where Pay10 connects, innovates, and leads the future of digital payments.") }} />
        </div>
      </section>

      <section className={Style.wrapper}>
        <div className={Style.all_events_container}>
          {initialEvents.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2rem", width: "100%" }}>
              No events found.
            </div>
          ) : (
            initialEvents.map((event, idx) => {
              const status = getEventStatus(event.end_date || event.start_date);
              
              return (
                <Link
                  key={event.id}
                  href={`/events/${event.slug}`}
                  className={Style.events_box}
                  data-animation="opacity-up"
                  data-anim-delay={Math.min(idx * 150, 600)}
                >
                  <div className={Style.events_box_img}>
                    {event.thumbnail && (
                      <img
                        src={event.thumbnail}
                        alt={event.title || "Event Image"}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    )}
                  </div>
                  <div className={Style.events_box_content}>
                    <div className={Style.events_box_headings}>
                      <div className={Style.events_box_meta}>
                        <h6>{formatEventDate(event.start_date)}</h6>
                        <span
                          className={`${Style.event_tag} ${Style[`event_tag_${status}`]}`}
                        >
                          {status === "upcoming" ? "Upcoming" : "Past"}
                        </span>
                      </div>
                      <h3>{event.title}</h3>
                    </div>
                    {event.subtitle && <p>{event.subtitle}</p>}
                    <div className={Style.events_box_cta}>
                      <span>Learn More</span>
                      <Icon icon="fa6-solid:angle-right" />
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {initialEvents.length >= 15 && (
          <div style={{ textAlign: "center", width: "100%" }} data-animation="scale-up">
            <button className={Style.load_more_btn}>Load More</button>
          </div>
        )}
      </section>
    </main>
  );
}
