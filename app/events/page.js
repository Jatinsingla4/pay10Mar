"use client";

import React, { useEffect, useState, useMemo } from "react";
import Style from "./events.module.scss";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import useApiAuth from "../components/hooks/useApiAuth";
import PageLoader from "../components/ui/PageLoader";

const FILTERS = ["All", "Upcoming", "Past"];

const page = () => {
  const [pageData, setPageData] = useState(null);
  const [eventLatest, setEventLatest] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
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
    if (currentPage >= totalPages || loading) return;
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
  const hasNext = currentPage < totalPages;

  const topSubHeading = pageData?.top_sub_heading || "EVENTS & CONFERENCES";
  const topHeading = pageData?.top_heading || "Our Events";

  const heroTitle = eventLatest?.name || "";
  const heroDescription = eventLatest?.short_description || "";
  const heroImage = eventLatest?.thumbnail
    ? `${imageBase}${eventLatest.thumbnail}`
    : eventLatest?.image
      ? `${imageBase}${eventLatest.image}`
      : "/images/events_images/global_fintech.png";

  const heroDates = formatDateRange(eventLatest?.event_start_date, eventLatest?.event_end_date);

  const eventsBoxes = allEvents.map((item, index) => ({
    key: item.slug || `event-${index}`,
    img: item.thumbnail ? `${imageBase}${item.thumbnail}` : "/images/events_images/global_fintech.png",
    smalltxt: formatEventDate(item.event_start_date, item.event_end_date),
    heading: item.name || "",
    link: item.slug ? `/events/${item.slug}` : "#",
    desc: item.short_description || "",
    status: getEventStatus(item.event_start_date),
  }));

  const filteredEvents = useMemo(() => {
    if (activeFilter === "All") return eventsBoxes;
    return eventsBoxes.filter(e => e.status === activeFilter.toLowerCase());
  }, [eventsBoxes, activeFilter]);

  if (initialLoading) return <PageLoader />;

  return (
    <main className={Style.eventMain}>
      <div className={Style.wrapper}>
        <div className={Style.events_banner_headings}>
          <h5 data-animation="opacity-up">{topSubHeading}</h5>
          <h2 data-animation="opacity-up">{topHeading}</h2>
        </div>

        <Link
          href={eventLatest?.slug ? `/events/${eventLatest.slug}` : "#"}
          className={Style.events_banner_img}
          data-animation="opacity-up"
        >
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
        </Link>
      </div>

      <div className={Style.events_bg_circle} data-animation="opacity-up">
        <Image
          src="/images/events_images/events_bg_circle.png"
          alt=""
          width={1920}
          height={1080}
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      <section className={Style.wrapper}>
        {eventsBoxes.length > 0 && (
          <div className={Style.filter_tabs} data-animation="opacity-up">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                className={`${Style.filter_tab} ${activeFilter === filter ? Style.filter_tab_active : ""}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        )}

        <div className={Style.all_events_container}>
          {filteredEvents.length === 0 ? (
            <div className={Style.emptyState}>
              <div className={Style.emptyIcon}>
                <Icon icon="solar:calendar-bold-duotone" />
              </div>
              <h3>
                {activeFilter !== "All"
                  ? `No ${activeFilter} Events`
                  : "No Events Yet"}
              </h3>
              <p>
                {activeFilter !== "All"
                  ? `No ${activeFilter.toLowerCase()} events at the moment.`
                  : "Stay tuned — exciting events and conferences are coming soon!"}
              </p>
              {activeFilter !== "All" && (
                <button
                  className={Style.emptyStateBtn}
                  onClick={() => setActiveFilter("All")}
                >
                  View All Events
                </button>
              )}
            </div>
          ) : (
            filteredEvents.map((event) => (
              <Link
                key={event.key}
                href={event.link}
                className={Style.events_box}
                data-animation="opacity-up"
              >
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
                  <div className={Style.events_box_cta}>
                    <span>Learn More</span>
                    <Icon icon="fa6-solid:angle-right" />
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {hasNext && filteredEvents.length > 0 && (
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
