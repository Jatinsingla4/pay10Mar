"use client";

import React, { useEffect, useState } from "react";
import Style from "./events.module.scss";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import useApiAuth from "../components/hooks/useApiAuth";
import PageLoader from "../components/ui/PageLoader";

const page = () => {
  const [pageData, setPageData] = useState(null);
  const [eventLatest, setEventLatest] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const { makeApiCall } = useApiAuth();

  // Initial load - fetch page 1
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
        if (isMounted) {
          console.error('Error fetching initial data:', error);
        }
      } finally {
        if (isMounted) setInitialLoading(false);
      }
    };

    fetchInitialData();

    return () => {
      isMounted = false;
    };
  }, [makeApiCall]);


  // Helper function to format date range
  const formatDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return { primary: "", secondary: "" };

    const start = new Date(startDate);
    const end = new Date(endDate);

    const startDay = start.getDate();
    const endDay = end.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[start.getMonth()];
    const year = start.getFullYear();

    // Format: "7-9" for primary, "Oct 2025" for secondary
    const primary = `${startDay}-${endDay}`;
    const secondary = `${month} ${year}`;

    return { primary, secondary };
  };

  // Helper function to format single date for event listing
  const formatEventDate = (startDate, endDate) => {
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
      console.error('Error loading more events:', error);
    } finally {
      setLoading(false);
    }
  };

  const imageBase = process.env.NEXT_PUBLIC_IMAGE_URL || "";
  const hasNext = currentPage < totalPages;

  // Page header data from API
  const topSubHeading = pageData?.top_sub_heading || undefined;
  const topHeading = pageData?.top_heading || undefined;
  const topDescription = pageData?.top_description || undefined;

  // Hero (latest event) content from API
  const heroTitle = eventLatest?.name || undefined;
  const heroDescription = eventLatest?.short_description || undefined;

  // ---- NEW LOGIC: Prefer thumbnail for banner image, fallback to image, then fallback to static ----
  const heroImage = eventLatest?.thumbnail
    ? `${imageBase}${eventLatest.thumbnail}`
    : eventLatest?.image
      ? `${imageBase}${eventLatest.image}`
      : "/images/events_images/global_fintech.png";

  // Format dates for hero banner
  const heroDates = formatDateRange(eventLatest?.event_start_date, eventLatest?.event_end_date);
  const heroPrimaryDate = heroDates.primary || undefined;
  const heroSecondaryDate = heroDates.secondary || undefined;

  // Event listing from API - map the array correctly
  const eventsBoxes = allEvents.map((item, index) => ({
    key: item.slug || `event-${index}`,
    img: item.thumbnail ? `${imageBase}${item.thumbnail}` : "/images/events_images/global_fintech.png",
    smalltxt: formatEventDate(item.event_start_date, item.event_end_date),
    heading: item.name || undefined,
    link: item.slug ? `/events/${item.slug}` : "/",
    desc: item.short_description || undefined,
  }));

  if (initialLoading) {
    return <PageLoader />;
  }

  return (
    <>
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
                alt={heroTitle}
                width={150}
                height={150}
                style={{ width: '100%', height: 'auto' }}
                unoptimized={heroImage.startsWith('http')}
              />
            </div>
            <div className={Style.banner_content}>
              <div style={{width:"30%"}}>
                <h2>{heroPrimaryDate}</h2>
                <h5>{heroSecondaryDate}</h5>
              </div>
              <div>
                <div className={Style.banner_txt_icon}>
                  <div className={Style.banner_txt_icon_content}>
                    <h3>{heroTitle}</h3>
                    <p>{heroDescription}</p>
                  </div>
                  <div className={Style.events_content_icon}>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
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
              style={{ width: '100%', height: 'auto' }}
            />
        </div>

        <section className={Style.wrapper}>
          <div className={Style.all_events_container}>
            {eventsBoxes.length === 0 ? (
              <div className={Style.noEvents}>No events found.</div>
            ) : (
              eventsBoxes.map((events) => (
                <Link
                  key={events.key}
                  href={events.link}
                  className={Style.events_box}
                  data-animation="opacity-up"
                >
                  <div className={Style.events_box_img}>
                    <Image
                      src={events.img}
                      alt={events.heading}
                      width={160}
                      height={160}
                      style={{ width: '100%', height: 'auto' }}
                      unoptimized={events.img.startsWith('http')}
                    />
                  </div>
                  <div className={Style.events_box_content}>
                    <div className={Style.events_box_headings}>
                      <h6>{events.smalltxt}</h6>
                      <h3>{events.heading}</h3>
                    </div>
                    <p>{events.desc}</p>
                  </div>
                </Link>
              ))
            )}
          </div>

          {hasNext && (
            <div
              style={{ textAlign: "center", width: "100%" }}
              data-animation="scale-up"
            >
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
    </>
  );
};

export default page;
