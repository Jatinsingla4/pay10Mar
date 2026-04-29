import React from "react";
import Style from './AboutBanner.module.scss';

const AboutBanner = ({ topSubHeading, topHeading, topDescription }) => {
  // Provide fallbacks if the props are not passed in
  const fallbackSubHeading = 'ABOUT US';
  const fallbackHeading = '';
  const fallbackDescription =
    'Welcome to Pay10 - where financial boundaries and borders extend beyond convention. Here, we use the power of technology to pave new and exciting monetary avenues that are only limited by your imagination.';

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
            <h2 data-animation="opacity-up" data-anim-delay="100">
              {topHeading || fallbackHeading}
            </h2>
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
