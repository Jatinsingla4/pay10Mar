"use client";

import React, { useState, useEffect } from "react";
import Style from "./vision_mission.module.scss";
import useApiAuth from "../components/hooks/useApiAuth";
import PageLoader from "../components/ui/PageLoader";

const VisionMissionClient = () => {
  const [visionMissionData, setVisionMissionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { makeApiCall } = useApiAuth();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await makeApiCall('/page/vision-mission');

        if (!isMounted) return;

        // console.log(result);

        if (result?.status) {
          setVisionMissionData(result);
        } else {
          setVisionMissionData(null);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching data:', error);
          setVisionMissionData(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [makeApiCall]);

  // Extract data from API response
  const pageData = visionMissionData?.page_data || {};
  const section2 = visionMissionData?.custom_data?.section2 || {};
  const section3 = visionMissionData?.custom_data?.section3 || {};
  const section4 = visionMissionData?.custom_data?.section4 || {};
  const imageBase = process.env.NEXT_PUBLIC_IMAGE_URL || '';

  // Fallback data structure mirroring prod content
  const fallback = {
    topHeading: "VISION & MISSION",
    section2: {
      heading: "OUR VISION",
      content: "To deliver regulated, interoperable payment infrastructure that enables secure, efficient, and trusted digital transactions across the UAE's financial ecosystem.",
      image: "/images/prod_imports/2.png"
    },
    section3: {
      image: "/images/prod_imports/circle-animation.png"
    },
    section4: {
      heading: "OUR MISSION",
      content: "To contribute to a connected and resilient payments landscape in the UAE by building compliance-first financial rails that support scale, transparency, and long-term economic growth.",
      image: "/images/prod_imports/4.png"
    }
  };

  // Image URLs with fallback
  const section2Image = section2.image ? `${imageBase}${section2.image}` : fallback.section2.image;
  const section3Image = section3.image ? `${imageBase}${section3.image}` : fallback.section3.image;
  const section4Image = section4.image ? `${imageBase}${section4.image}` : fallback.section4.image;

  // Heading & content values with fallback
  const topHeading = pageData.top_heading || fallback.topHeading;
  const section2Heading = section2.heading || fallback.section2.heading;
  const section2Content = section2.content || fallback.section2.content;
  const section4Heading = section4.heading || fallback.section4.heading;
  const section4ContentRaw = section4.content || fallback.section4.content;

  // Convert line breaks (\r\n or \n) to <br> tags for HTML rendering
  const section4Content = section4ContentRaw
    .replace(/\r\n/g, '<br />')
    .replace(/\n/g, '<br />')
    .replace(/\r/g, '<br />');

  if (loading && !visionMissionData) {
    return <PageLoader />;
  }

  return (
    <main className={Style.missionMain}>
      <div className={Style.vision_banner}>
        <div className={Style.banner_svg}>
          <img src="/images/about_banner_globe.png" data-animation="opacity-up" alt="" />
          <div data-animation="opacity-up">
            <h2>{topHeading}</h2>
          </div>
        </div>
      </div>

      <div className={Style.bg_circle_wrapper}>
        <section className={Style.wrapper}>
          <div className={Style.vision_second_section}>
            <div className={Style.left_img}>
              <img src={section2Image} data-animation="opacity-up" alt="" />
            </div>
            <div className={Style.vision_content}>
              <h5 data-animation="opacity-up">{section2Heading}</h5>
              <p data-animation="opacity-up" data-anim-delay="100">
                {section2Content}
              </p>
            </div>
          </div>
        </section>

        <section
          className={Style.divider_img}
          data-animation="opacity-up"
          style={{
            backgroundImage: section3Image ? `url(${section3Image})` : undefined
          }}
        >
          <div className={Style.circle_with_icons}>
            <img src="/images/circle_with_icons.png" alt="" />
          </div>
        </section>

        <section className={Style.wrapper}>
          <div className={`${Style.vision_second_section} ${Style.bottom_section}`}>
            <div className={Style.vision_content}>
              <h5 data-animation="opacity-up">{section4Heading}</h5>
              <p
                data-animation="opacity-up"
                data-anim-delay="100"
                dangerouslySetInnerHTML={{ __html: section4Content }}
              />
            </div>
            <div className={Style.left_img} data-animation="opacity-up">
              <img src={section4Image} alt="" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default VisionMissionClient;
