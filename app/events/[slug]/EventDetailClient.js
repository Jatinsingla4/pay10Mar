"use client";

import React, { useState, useEffect } from "react";
import { Icon, InlineIcon } from "@iconify/react";
import Link from "next/link";
import Style from "./events-details.module.scss";
import { sanitizeHtml, isEmptyHtml } from "../../lib/sanitizeHtml";

// Local Next.js public paths (starting with /) bypass cmsImageSrc to avoid CDN URL prepending
const resolveImageSrc = (path) => {
  if (!path) return null;
  const p = String(path).trim();
  if (p.startsWith('/')) return p;
  if (/^https?:\/\//i.test(p)) return p;
  return `/${p}`;
};

const EventDetailClient = ({ initialData }) => {
  const [imagesToShow, setImagesToShow] = useState(12);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [initialData]);

  const formatDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return "";

    const start = new Date(startDate);
    const end = new Date(endDate);

    const startDay = start.getDate();
    const endDay = end.getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[start.getMonth()];
    const year = start.getFullYear();

    if (startDay === endDay) {
      return `${startDay} ${month} ${year}`;
    }
    return `${startDay}-${endDay} ${month} ${year}`;
  };

  const handleLoadMoreImages = () => {
    setImagesToShow(prev => prev + 12);
  };

  if (!initialData) {
    return (
      <main>
        <div className={Style.wrapper} style={{ textAlign: "center", padding: "80px 56px" }}>
          <p>Event not found</p>
          <Link href="/events" className={Style.backto_events}>
            <span>
              <InlineIcon
                icon="qlementine-icons:chevron-left-16"
                width="20"
                height="20"
              />
            </span>
            <span>Back To Events</span>
          </Link>
        </div>
      </main>
    );
  }

  // Event details mapped from API
  const eventName = initialData.title || "";
  const eventDateRange = formatDateRange(initialData.start_date, initialData.end_date);
  
  const eventBannerImage = (initialData.banner && resolveImageSrc(initialData.banner)) || null;
  const eventThumbnail = (initialData.thumbnail && resolveImageSrc(initialData.thumbnail)) || null;
  
  const content = isEmptyHtml(initialData.content) ? "" : initialData.content;
  const images = initialData.other_images || [];

  const extractFirstParagraph = (html) => {
    if (!html) return "";
    const text = html.replace(/<[^>]+>/g, "").trim();
    return text.split(/\n/)[0] || text.substring(0, 150) || "";
  };

  const removeFirstParagraph = (html, firstParagraphText) => {
    if (!html || !firstParagraphText) return html;

    const htmlText = html.replace(/<[^>]+>/g, "").trim();
    const firstParaText = firstParagraphText.trim();

    if (htmlText.startsWith(firstParaText)) {
      const pTagRegex = /<p[^>]*>[\s\S]*?<\/p>/i;
      const firstPMatch = html.match(pTagRegex);

      if (firstPMatch) {
        const pText = firstPMatch[0].replace(/<[^>]+>/g, "").trim();
        if (pText.startsWith(firstParaText) || firstParaText.startsWith(pText.substring(0, Math.min(firstParaText.length, pText.length)))) {
          return html.replace(pTagRegex, "").trim();
        }
      }

      const firstParaEscaped = firstParaText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`^([\\s\\S]*?)${firstParaEscaped}([\\s\\S]*?)(\\.|\\n|</p>|</div>|$)`, 'i');
      const match = html.match(regex);

      if (match && match[0]) {
        const result = html.replace(regex, '').trim();
        if (result.length < html.length * 0.9) {
          return result;
        }
      }
    }

    return html;
  };

  const firstParagraph = extractFirstParagraph(content);
  const contentWithoutFirstParagraph = firstParagraph && content
    ? removeFirstParagraph(content, firstParagraph)
    : content;

  const displayedImages = images.slice(0, imagesToShow);
  const hasMoreImages = images.length > imagesToShow;

  return (
    <main className={Style.mainEvnDe}>
      <Link
        href="/events"
        className={Style.backto_events}
      >
        <span>
          <InlineIcon
            icon="qlementine-icons:chevron-left-16"
            width="20"
            height="20"
          />
        </span>
        <span>Back To Events</span>
      </Link>

      <div className={Style.wrapper}>
        <div className={Style.events_details_banner_headings}>
          <h2 data-animation="opacity-up">
            {eventName}
          </h2>
        </div>

        {eventBannerImage && (
          <div
            className={Style.events_details_banner_img}
            data-animation="opacity-up"
          >
            <img
              src={eventBannerImage}
              alt={eventName}
              className={Style.bannerImage}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </div>
        )}
      </div>

      <div className={Style.wrapper}>
        <div className={Style.details_content_container} data-animation="opacity-up">
          {eventThumbnail && (
            <img
              src={eventThumbnail}
              alt={eventName}
              className={Style.thumbnailImage}
              style={{ gridTemplateAreas: "img_box", objectFit: "contain", maxWidth: "160px", width: "100%", height: "auto" }}
            />
          )}
          <div
            className={Style.details_content_box}
            style={{ gridTemplateAreas: "content_box" }}
          >
            {firstParagraph && (
              <h3>
                {firstParagraph}
              </h3>
            )}
            {contentWithoutFirstParagraph && (
              <div
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(contentWithoutFirstParagraph) }}
                className={Style.contentBody}
              />
            )}
          </div>
        </div>
      </div>

      {images.length > 0 && (
        <section className={Style.wrapper}>
          <div className={Style.pictures_container}>
            <h2 data-animation="opacity-up">Event Gallery</h2>
            <div className={Style.pictures}>
              {displayedImages.map((img, idx) => {
                const imageSrc = resolveImageSrc(img);
                if (!imageSrc) return null;
                return (
                  <img
                    key={idx}
                    src={imageSrc}
                    alt={eventName}
                    data-animation="opacity-up"
                    className={Style.picture}
                    style={{ width: "100%", height: "auto", objectFit: "cover" }}
                  />
                );
              })}
            </div>
          </div>
          {hasMoreImages && (
            <div
              style={{ textAlign: "center", width: "100%" }}
              data-animation="scale-up"
            >
              <button className={Style.load_more_btn} onClick={handleLoadMoreImages}>
                Load More
              </button>
            </div>
          )}
        </section>
      )}

      <div className={Style.events_bg_circle} data-animation="opacity-up">
        <img
          src="/images/events_images/events_bg_circle.png"
          alt=""
          className={Style.bgCircleImage}
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </main>
  );
};

export default EventDetailClient;
