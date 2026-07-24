import React from "react";
import Style from './AboutBanner.module.scss';
import { sanitizeHtml, isEmptyHtml } from '../../../lib/sanitizeHtml';

const AboutBanner = ({ topSubHeading, topHeading, topDescription, bannerImage, mobileImage }) => {
  // Provide fallbacks if the props are not passed in
  const fallbackSubHeading = '';
  const fallbackHeading = 'About Us';
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

  const description = isEmptyHtml(topDescription) ? fallbackDescription : topDescription;
  const formattedDescription = formatDescription(description);

  return (
    <section>
      <div 
        className={Style.about_banner}
        style={{
          '--bg-desktop': bannerImage ? `url(${bannerImage})` : undefined,
          '--bg-mobile': mobileImage ? `url(${mobileImage})` : (bannerImage ? `url(${bannerImage})` : undefined)
        }}
      >
        <div className={Style.banner_svg}>
          <div className={Style.banner_content}>
            <h5 data-animation="opacity-up">
              {topSubHeading || fallbackSubHeading}
            </h5>
            <h2 data-animation="opacity-up" data-anim-delay="100">
              {topHeading || fallbackHeading}
            </h2>
            <p
              data-animation="opacity-up"
              data-anim-delay="200"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(formattedDescription) }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBanner;
