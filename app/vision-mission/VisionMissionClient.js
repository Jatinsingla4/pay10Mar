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

  // Image URLs
  const section2Image = section2.image ? `${imageBase}${section2.image}` : '/images/about_section_img.png';
  const section3Image = section3.image ? `${imageBase}${section3.image}` : '/images/divider_img.png';
  const section4Image = section4.image ? `${imageBase}${section4.image}` : '/images/about_section_img2.png';

  // API-driven values only
  const topHeading = pageData.top_heading || undefined;
  const section2Heading = section2.heading || undefined;
  const section2Content = section2.content || undefined;
  const section4Heading = section4.heading || undefined;
  const section4ContentRaw = section4.content || '';

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
