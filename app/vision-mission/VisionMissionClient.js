"use client";

import React from "react";
import BannerBreaker from '../components/ui/BannerBreaker';
import GlobalContactCTA from '../components/ui/GlobalContactCTA';
import Style from "./vision_mission.module.scss";
import { sanitizeHtml } from "../lib/sanitizeHtml";

const VisionMissionClient = ({ pageData }) => {
  const sections = pageData?.sections || [];
  const topHeading = pageData?.page_title || "";
  const bannerImage = pageData?.banner_image;

  return (
    <main className={Style.missionMain}>
      <div 
        className={Style.vision_banner}
        style={{
          '--desktop-bg': pageData?.banner_image ? `url(${pageData.banner_image})` : 'none',
          '--mobile-bg': pageData?.mobile_image ? `url(${pageData.mobile_image})` : (pageData?.banner_image ? `url(${pageData.banner_image})` : 'none')
        }}
      >
        <div className={Style.banner_svg}>
          <div data-animation="opacity-up">
            {topHeading && <h2>{topHeading}</h2>}
          </div>
        </div>
      </div>

      <div className={Style.bg_circle_wrapper}>
        {sections.map((section, idx) => {
          const isEven = idx % 2 === 0;
          const wrapperClass = idx === 0 ? `${Style.wrapper} ${Style.first_wrapper}` : (idx === sections.length - 1 ? `${Style.wrapper} ${Style.last_wrapper}` : Style.wrapper);
          const innerClass = isEven ? Style.vision_second_section : `${Style.vision_second_section} ${Style.bottom_section}`;
          
          return (
            <section key={idx} className={wrapperClass}>
              <div className={innerClass}>
                {isEven ? (
                  <>
                    <div className={Style.left_img} data-animation="opacity-up">
                      {section.images?.[0] && <img src={section.images[0]} className={Style.bubble_img} alt={section.title} />}
                    </div>
                    <div className={Style.vision_content}>
                      {section.title && <h2 data-animation="opacity-up">{section.title}</h2>}
                      {section.content && (
                        <div data-animation="opacity-up" data-anim-delay="100" dangerouslySetInnerHTML={{ __html: sanitizeHtml(section.content) }} />
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className={Style.vision_content}>
                      {section.title && <h2 data-animation="opacity-up">{section.title}</h2>}
                      {section.content && (
                        <div data-animation="opacity-up" data-anim-delay="100" dangerouslySetInnerHTML={{ __html: sanitizeHtml(section.content) }} />
                      )}
                    </div>
                    <div className={Style.right_img} data-animation="opacity-up">
                      {section.images?.[0] && <img src={section.images[0]} className={Style.bubble_img} alt={section.title} />}
                    </div>
                  </>
                )}
              </div>
            </section>
          );
        })}

        <GlobalContactCTA />
      </div>
    </main>
  );
};

export default VisionMissionClient;
