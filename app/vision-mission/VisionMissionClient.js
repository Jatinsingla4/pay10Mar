"use client";

import React from "react";
import Style from "./vision_mission.module.scss";

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

const section4Content = fallback.section4.content
  .replace(/\r\n/g, '<br />')
  .replace(/\n/g, '<br />')
  .replace(/\r/g, '<br />');

const VisionMissionClient = () => {
  return (
    <main className={Style.missionMain}>
      <div className={Style.vision_banner}>
        <div className={Style.banner_svg}>
          <img src="/images/about_banner_globe.png" data-animation="opacity-up" alt="" />
          <div data-animation="opacity-up">
            <h2>{fallback.topHeading}</h2>
          </div>
        </div>
      </div>

      <div className={Style.bg_circle_wrapper}>
        <section className={Style.wrapper}>
          <div className={Style.vision_second_section}>
            <div className={Style.left_img}>
              <img src={fallback.section2.image} data-animation="opacity-up" alt="" />
            </div>
            <div className={Style.vision_content}>
              <h5 data-animation="opacity-up">{fallback.section2.heading}</h5>
              <p data-animation="opacity-up" data-anim-delay="100">
                {fallback.section2.content}
              </p>
            </div>
          </div>
        </section>

        <section
          className={Style.divider_img}
          data-animation="opacity-up"
          style={{
            backgroundImage: `url(${fallback.section3.image})`
          }}
        >
          <div className={Style.circle_with_icons}>
            <img src="/images/circle_with_icons.png" alt="" />
          </div>
        </section>

        <section className={Style.wrapper}>
          <div className={`${Style.vision_second_section} ${Style.bottom_section}`}>
            <div className={Style.vision_content}>
              <h5 data-animation="opacity-up">{fallback.section4.heading}</h5>
              <p
                data-animation="opacity-up"
                data-anim-delay="100"
                dangerouslySetInnerHTML={{ __html: section4Content }}
              />
            </div>
            <div className={Style.left_img} data-animation="opacity-up">
              <img src={fallback.section4.image} alt="" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default VisionMissionClient;
