"use client";

import React, { useEffect, useState } from "react";
import Style from "./events.module.scss";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import useApiAuth from "../components/hooks/useApiAuth";
import PageLoader from "../components/ui/PageLoader";

const FALLBACK_EVENTS = [
  {
    key: "gitex-global-2024",
    img: "/images/events_images/events_details_imgs/1.png",
    smalltxt: "14-18 October 2024",
    heading: "GITEX Global 2024",
    link: null,
    desc: "Pay10 showcased its digital payment platform at GITEX Global — the world's leading tech show in Dubai, connecting with 6,000+ exhibitors and 180,000+ visitors.",
    status: "past",
  },
  {
    key: "seamless-middle-east-2025",
    img: "/images/events_images/events_details_imgs/2.png",
    smalltxt: "11-12 June 2025",
    heading: "Seamless Middle East 2025",
    link: null,
    desc: "Pay10 joined regional fintech leaders at Seamless Middle East, the premier event for payments and digital commerce in the UAE and MENA region.",
    status: "past",
  },
  {
    key: "fintech-abu-dhabi-2025",
    img: "/images/events_images/events_details_imgs/3.png",
    smalltxt: "4-6 November 2025",
    heading: "FinTech Abu Dhabi 2025",
    link: null,
    desc: "Join Pay10 at FinTech Abu Dhabi 2025 — bringing together the brightest minds in financial technology across the MENA region to shape the future of payments.",
    status: "upcoming",
  },
  {
    key: "global-fintech-fest-2025",
    img: "/images/events_images/events_details_imgs/4.png",
    smalltxt: "27-29 August 2025",
    heading: "Global Fintech Fest 2025",
    link: null,
    desc: "Pay10 returns to the world's largest fintech festival in Mumbai, showcasing its next-generation digital wallet and merchant payment solutions.",
    status: "upcoming",
  },
];

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
          <div className={Style.events_content_icon}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon icon="fa6-solid:angle-right" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

const page = () => {
  const [pageData, setPageData] = useState(null);
  const [eventLatest, setEventLatest] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [fallbackCount, setFallbackCount] = useState(2);
  const { makeApiCall } = useApiAuth();

  useEffect(() => {
    let isMounted = true;
    const fetchInitialData = async () => {
      setInitialLoading(true);
      try {
        const result = await makeApiCall("/event?page=1");
        if (!isMounted) return;
        if (result?.status) {
          setPageData(result.page_data || {});
          setEventLatest(result.event_latest || {});
          setAllEvents(Array.isArray(result.event_listing) ? result.event_listing : []);
          setCurrentPage(1);
          setTotalPages(Number(result?.pagination?.total_pages) || 1);
        }
      } catch (error) {
        if (isMounted) console.error("Error fetching initial data:", error);
      } finally {
        if (isMounted) setInitialLoading(false);
      }
    };
    fetchInitialData();
    return () => { isMounted = false; };
  }, [makeApiCall]);

  const formatDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return { primary: "", secondary: "" };
    const start = new Date(startDate);
    const end = new Date(endDate);
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return {
      primary: `${start.getDate()}-${end.getDate()}`,
      secondary: `${monthNames[start.getMonth()]} ${start.getFullYear()}`,
    };
  };

  const formatEventDate = (startDate, endDate) => {
    if (!startDate || !endDate) return "";
    const start = new Date(startDate);
    const end = new Date(endDate);
    const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const startDay = start.getDate();
    const endDay = end.getDate();
    return startDay === endDay
      ? `${startDay} ${monthNames[start.getMonth()]} ${start.getFullYear()}`
      : `${startDay}-${endDay} ${monthNames[start.getMonth()]} ${start.getFullYear()}`;
  };

  const getEventStatus = (startDate) => {
    if (!startDate) return "upcoming";
    return new Date(startDate) >= new Date() ? "upcoming" : "past";
  };

  const handleLoadMore = async () => {
    if (loading) return;
    if (allEvents.length === 0) {
      setFallbackCount(prev => Math.min(prev + 2, FALLBACK_EVENTS.length));
      return;
    }
    if (currentPage >= totalPages) return;
    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      const result = await makeApiCall(`/event?page=${nextPage}`);
      if (result?.status) {
        const newEvents = Array.isArray(result.event_listing) ? result.event_listing : [];
        setAllEvents(prev => [...prev, ...newEvents]);
        setCurrentPage(nextPage);
        setTotalPages(Number(result?.pagination?.total_pages) || totalPages);
      }
    } catch (error) {
      console.error("Error loading more events:", error);
    } finally {
      setLoading(false);
    }
  };

  const imageBase = process.env.NEXT_PUBLIC_IMAGE_URL || "";
  const hasNext = allEvents.length === 0
    ? fallbackCount < FALLBACK_EVENTS.length
    : currentPage < totalPages;

  const topSubHeading = pageData?.top_sub_heading || "EVENTS & CONFERENCES";
  const topHeading = pageData?.top_heading || "Our Events";

  const heroTitle = eventLatest?.name || "Global Fintech Fest 2024";
  const heroDescription = eventLatest?.short_description || "Pay10 at the world's largest fintech festival — showcasing our vision for the future of digital payments in the MENA region.";
  const heroImage = eventLatest?.thumbnail
    ? `${imageBase}${eventLatest.thumbnail}`
    : eventLatest?.image
      ? `${imageBase}${eventLatest.image}`
      : "/images/events_images/global_fintech.png";

  const heroDates = formatDateRange(
    eventLatest?.event_start_date || "2024-08-28",
    eventLatest?.event_end_date || "2024-08-30"
  );

  const eventsBoxes = allEvents.length > 0
    ? allEvents.map((item, index) => ({
        key: item.slug || `event-${index}`,
        img: item.thumbnail ? `${imageBase}${item.thumbnail}` : "/images/events_images/global_fintech.png",
        smalltxt: formatEventDate(item.event_start_date, item.event_end_date),
        heading: item.name || "",
        link: item.slug ? `/events/${item.slug}` : null,
        desc: item.short_description || "",
        status: getEventStatus(item.event_start_date),
      }))
    : FALLBACK_EVENTS;

  const displayedEvents = allEvents.length === 0
    ? eventsBoxes.slice(0, fallbackCount)
    : eventsBoxes;

  if (initialLoading) return <PageLoader />;

  return (
    <main className={Style.eventMain}>
      <div className={Style.wrapper}>
        <div className={Style.events_banner_headings}>
          <h5>{topSubHeading}</h5>
          <h2>{topHeading}</h2>
        </div>

        {eventLatest?.slug ? (
          <Link href={`/events/${eventLatest.slug}`} className={Style.events_banner_img}>
            <HeroBannerContent heroImage={heroImage} heroTitle={heroTitle} heroDescription={heroDescription} heroDates={heroDates} Style={Style} />
          </Link>
        ) : (
          <div className={Style.events_banner_img}>
            <HeroBannerContent heroImage={heroImage} heroTitle={heroTitle} heroDescription={heroDescription} heroDates={heroDates} Style={Style} />
          </div>
        )}
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
          {displayedEvents.length === 0 ? (
            <div className={Style.emptyState}>
              <div className={Style.emptyIcon}>
                <Icon icon="solar:calendar-bold-duotone" />
              </div>
              <h3>No Events Yet</h3>
              <p>Stay tuned — exciting events and conferences are coming soon!</p>
            </div>
          ) : (
            displayedEvents.map((event) => {
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
            })
          )}
        </div>

        {hasNext && displayedEvents.length > 0 && (
          <div style={{ textAlign: "center", width: "100%" }} data-animation="scale-up">
            <button
              className={Style.load_more_btn}
              onClick={handleLoadMore}
              disabled={loading || initialLoading}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default page;
