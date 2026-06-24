import React from "react";
import Style from './AboutBanner.module.scss';

const AboutBanner = ({ topSubHeading, topHeading, topDescription }) => {
  // Provide fallbacks if the props are not passed in
  const fallbackSubHeading = '';
  const fallbackHeading = '';
  const fallbackDescription = '';

  // Format description text: convert \r\n to <br /> and handle HTML tags
  const formatDescription = (text) => {
    if (!text) return '';

    // Convert \r\n and \n to <br /> tags
    let formatted = text
      .replace(/\r\n/g, '<br />')
      .replace(/\n/g, '<br />')
      .replace(/\r/g, '<br />');

    return formatted;
  };

  const description = topDescription || fallbackDescription;
  const formattedDescription = formatDescription(description);

  return (
    <section>
      <div className={Style.about_banner}>
        <div className={Style.banner_svg}>
          <img
            src="/images/about_images/banner_circle.png"
            alt=""
            data-animation="opacity"
            data-anim-delay="50"
          />
          <div className={Style.banner_content}>
            <h5 data-animation="opacity-up">
              {topSubHeading || fallbackSubHeading}
            </h5>
            <p
              data-animation="opacity-up"
              data-anim-delay="200"
              dangerouslySetInnerHTML={{ __html: formattedDescription }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBanner;
