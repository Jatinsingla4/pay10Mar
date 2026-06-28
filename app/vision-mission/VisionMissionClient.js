"use client";

import React from "react";
import Link from "next/link";
import Style from "./vision_mission.module.scss";

const fallback = {
  topHeading: "Vision & Mission",
  section2: {
    heading: "Our Vision",
    content: "To deliver regulated, interoperable payment infrastructure that enables secure, efficient, and trusted digital transactions across the UAE's financial ecosystem.",
    image: "/images/about_images/vision-bubble.png"
  },
  section3: {
    image: "/images/prod_imports/divider-banner.png"
  },
  section4: {
    heading: "Our Mission",
    content: "To contribute to a connected and resilient payments landscape in the UAE by building compliance-first financial rails that support scale, transparency, and long-term economic growth.",
    image: "/images/about_images/mission-bubble.png"
  }
};

const section4Content = fallback.section4.content
  .replace(/\r\n/g, '<br />')
  .replace(/\n/g, '<br />')
  .replace(/\r/g, '<br />');

const VisionMissionClient = () => {
  return (
    <main className={Style.missionMain}>
      <div className={Style.vision_banner}>
        <div className={Style.banner_svg}>
          <div data-animation="opacity-up">
            <h2>{fallback.topHeading}</h2>
          </div>
        </div>
      </div>

      <div className={Style.bg_circle_wrapper}>
        <section className={`${Style.wrapper} ${Style.first_wrapper}`}>
          <div className={Style.vision_second_section}>
            <div className={Style.left_img} data-animation="opacity-up">
              <img src={fallback.section2.image} className={Style.bubble_img} alt="Our Vision" />
            </div>
            <div className={Style.vision_content}>
              <h2 data-animation="opacity-up">{fallback.section2.heading}</h2>
              <p data-animation="opacity-up" data-anim-delay="100">
                {fallback.section2.content}
              </p>
            </div>
          </div>
        </section>

        <section className={`${Style.wrapper} ${Style.last_wrapper}`}>
          <div className={`${Style.vision_second_section} ${Style.bottom_section}`}>
            <div className={Style.vision_content}>
              <h2 data-animation="opacity-up">{fallback.section4.heading}</h2>
              <p
                data-animation="opacity-up"
                data-anim-delay="100"
                dangerouslySetInnerHTML={{ __html: section4Content }}
              />
            </div>
            <div className={Style.right_img} data-animation="opacity-up">
              <img src={fallback.section4.image} className={Style.bubble_img} alt="Our Mission" />
            </div>
          </div>
        </section>

        <section className={Style.cta_section} data-animation="opacity-up">
          <h3 className={Style.cta_heading}>For any queries</h3>
          <p className={Style.cta_sub}>Please feel free to get in touch with us.</p>
          <Link href="/contact-us" className={Style.cta_btn}>Get in Touch</Link>
        </section>
      </div>
    </main>
  );
};

export default VisionMissionClient;
