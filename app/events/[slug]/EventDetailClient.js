"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Icon, InlineIcon } from "@iconify/react";
import Link from "next/link";
import Style from "./events-details.module.scss";

const FALLBACK_EVENT_DETAILS = {
  "gitex-global-2024": {
    page_data: {
      name: "GITEX Global 2024",
      event_start_date: "2024-10-14",
      event_end_date: "2024-10-18",
      image: "/images/events_images/events_banner_img.png",
      thumbnail: "/images/events_images/events_details_imgs/1.png",
      content: "<p>Pay10 made a significant mark at GITEX Global 2024, the world's most influential technology exhibition held at the Dubai World Trade Centre. Our team showcased our cutting-edge digital payment platform, demonstrating how Pay10 is revolutionizing the payments landscape across the UAE and the broader MENA region.</p><p>We engaged with thousands of industry leaders, potential partners, and innovators from over 180 countries, presenting our consumer and merchant app ecosystem and reinforcing our commitment to building a seamless, secure, and accessible digital payment infrastructure.</p>",
      content2: "",
      gallery: JSON.stringify([
        "/images/events_images/events_details_imgs/1.png",
        "/images/events_images/events_details_imgs/2.png",
        "/images/events_images/events_details_imgs/3.png",
      ]),
    },
  },
  "seamless-middle-east-2025": {
    page_data: {
      name: "Seamless Middle East 2025",
      event_start_date: "2025-06-11",
      event_end_date: "2025-06-12",
      image: "/images/events_images/events_banner_img.png",
      thumbnail: "/images/events_images/events_details_imgs/2.png",
      content: "<p>Pay10 participated in Seamless Middle East 2025, the premier annual event connecting the fintech, payments, and digital commerce ecosystem across the UAE and MENA region. Held at the Dubai World Trade Centre, Seamless brought together thousands of decision-makers, innovators, and investors driving the future of digital finance.</p><p>Our team engaged with regional industry leaders, presenting our full suite of digital payment solutions and exploring strategic partnerships to expand Pay10's footprint across the Gulf.</p>",
      content2: "",
      gallery: JSON.stringify([
        "/images/events_images/events_details_imgs/4.png",
        "/images/events_images/events_details_imgs/5.png",
        "/images/events_images/events_details_imgs/6.png",
      ]),
    },
  },
  "fintech-abu-dhabi-2025": {
    page_data: {
      name: "FinTech Abu Dhabi 2025",
      event_start_date: "2025-11-04",
      event_end_date: "2025-11-06",
      image: "/images/events_images/events_banner_img.png",
      thumbnail: "/images/events_images/events_details_imgs/3.png",
      content: "<p>Pay10 is set to participate in FinTech Abu Dhabi 2025, one of the most prestigious fintech events in the MENA region, hosted by the Abu Dhabi Global Market (ADGM). This event brings together global fintech leaders, regulators, investors, and innovators to collaborate on shaping the future of financial services.</p><p>Pay10 will be showcasing its next-generation digital wallet, cross-border payment capabilities, and merchant solutions — highlighting our role in driving financial inclusion and digital transformation across the UAE and beyond.</p>",
      content2: "",
      gallery: JSON.stringify([
        "/images/events_images/events_details_imgs/7.png",
        "/images/events_images/events_details_imgs/8.png",
      ]),
    },
  },
  "global-fintech-fest-2025": {
    page_data: {
      name: "Global Fintech Fest 2025",
      event_start_date: "2025-08-27",
      event_end_date: "2025-08-29",
      image: "/images/events_images/events_banner_img.png",
      thumbnail: "/images/events_images/events_details_imgs/4.png",
      content: "<p>Pay10 returns to the Global Fintech Fest 2025, the world's largest fintech festival, held in Mumbai, India. GFF is the definitive platform for the global fintech ecosystem, attracting over 800 speakers, 300 exhibitors, and 50,000+ attendees from across the world.</p><p>Building on our successful presence at previous editions, Pay10 will present its next-generation digital wallet and merchant payment solutions, demonstrating how we are bridging the gap between traditional banking and the digital economy — not just in the UAE, but globally.</p>",
      content2: "",
      gallery: JSON.stringify([
        "/images/events_images/events_details_imgs/9.png",
        "/images/events_images/events_details_imgs/10.png",
        "/images/events_images/events_details_imgs/1.png",
      ]),
    },
  },
};

// Local Next.js public paths (starting with /) bypass cmsImageSrc to avoid CDN URL prepending
const resolveImageSrc = (path) => {
  if (!path) return null;
  const p = String(path).trim();
  if (p.startsWith('/')) return p;
  if (/^https?:\/\//i.test(p)) return p;
  return `/${p}`;
};

const EventDetailClient = () => {
  const params = useParams();
  const slug = params?.slug;
  const [imagesToShow, setImagesToShow] = useState(12); // Show first 12 images initially

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Helper function to format date range
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

  const resolvedData = (slug && FALLBACK_EVENT_DETAILS[slug]) || null;

  if (!resolvedData) {
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

  const pageData = resolvedData?.page_data || {};

  // Parse gallery from response (it comes as a JSON string)
  let images = [];
  if (pageData?.gallery) {
    try {
      const galleryArray = JSON.parse(pageData.gallery);
      if (Array.isArray(galleryArray)) {
        images = galleryArray;
      }
    } catch (error) {
      console.error('Error parsing gallery:', error);
    }
  }

  // Fallback to old images format if gallery is not available
  if (images.length === 0 && Array.isArray(resolvedData?.images)) {
    images = resolvedData.images;
  }

  // Event details
  const eventName = pageData.name || "";
  const eventDateRange = formatDateRange(pageData.event_start_date, pageData.event_end_date);
  const eventBannerImage =
    (pageData.image && resolveImageSrc(pageData.image)) ||
    "/images/events_images/events_banner_img.png";
  const eventThumbnail =
    (pageData.thumbnail && resolveImageSrc(pageData.thumbnail)) ||
    "/images/events_images/global_fintech.png";
  const content = pageData.content || "";
  const content2 = pageData.content2 || "";

  // Extract first paragraph for the h3 heading from content
  const extractFirstParagraph = (html) => {
    if (!html) return "";
    const text = html.replace(/<[^>]+>/g, "").trim();
    return text.split(/\n/)[0] || text.substring(0, 150) || "";
  };

  // Remove first paragraph from HTML content to avoid duplication
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

  const firstParagraphFromContent = extractFirstParagraph(content);
  const firstParagraphFromContent2 = extractFirstParagraph(content2);
  const firstParagraph = firstParagraphFromContent || firstParagraphFromContent2;

  const contentWithoutFirstParagraph = firstParagraphFromContent && content
    ? removeFirstParagraph(content, firstParagraphFromContent)
    : content;
  const content2WithoutFirstParagraph = firstParagraphFromContent2 && content2
    ? removeFirstParagraph(content2, firstParagraphFromContent2)
    : content2;

  // Gallery images
  const displayedImages = images.slice(0, imagesToShow);
  const hasMoreImages = images.length > imagesToShow;

  return (
    <main className={Style.mainEvnDe}>
      <Link
        href="/events"
        className={Style.backto_events}
        data-animation="opacity-up"
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

        <div
          className={Style.events_details_banner_img}
          data-animation="opacity-up"
        >
          <Image
            src={eventBannerImage}
            alt={eventName}
            fill
            priority
            sizes="100vw"
            className={Style.bannerImage}
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      <div className={Style.wrapper}>
        <div className={Style.details_content_container} data-animation="opacity-up">
          <Image
            src={eventThumbnail}
            alt={eventName}
            width={160}
            height={160}
            sizes="160px"
            className={Style.thumbnailImage}
            style={{ gridTemplateAreas: "img_box", objectFit: "contain" }}
          />
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
                dangerouslySetInnerHTML={{ __html: contentWithoutFirstParagraph }}
                className={Style.contentBody}
              />
            )}
            {content2WithoutFirstParagraph && (
              <div
                dangerouslySetInnerHTML={{ __html: content2WithoutFirstParagraph }}
                className={Style.contentBody}
              />
            )}
          </div>
        </div>
      </div>

      {images.length > 0 && (
        <section className={Style.wrapper}>
          <div className={Style.pictures_container}>
            <h2 data-animation="opacity-up">Pictures from the event</h2>
            <div className={Style.pictures}>
              {displayedImages.map((img, idx) => {
                // Handle both string paths (from gallery) and object format (legacy)
                const imagePath = typeof img === 'string' ? img : img?.image;
                const imageSrc = imagePath ? resolveImageSrc(imagePath) : null;
                const imageAlt = typeof img === 'string' ? eventName : (img?.name || eventName);
                if (!imageSrc) return null;
                return (
                  <Image
                    key={idx}
                    src={imageSrc}
                    alt={imageAlt}
                    data-animation="opacity-up"
                    width={800}
                    height={600}
                    sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
                    className={Style.picture}
                    style={{ width: "100%", height: "auto" }}
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
        <Image
          src="/images/events_images/events_bg_circle.png"
          alt=""
          width={1920}
          height={900}
          sizes="100vw"
          className={Style.bgCircleImage}
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </main>
  );
};

export default EventDetailClient;
