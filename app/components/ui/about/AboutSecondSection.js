import React from "react";
import Style from './AboutSecondSection.module.scss';

const AboutSecondSection = ({ section2Heading, section2Content, section2Html, section2Image, colReverse = false }) => {
  const imageComponent = (
    <div className={Style.left_img} data-animation="opacity-up">
      {section2Image ? (
        <img
          src={section2Image}
          alt=""
        />
      ) : null}
    </div>
  );

  const contentComponent = (
    <div className={Style.about_content}>
      {section2Html ? (
        <div
          className={Style.html_content}
          data-animation="opacity-up"
          dangerouslySetInnerHTML={{ __html: section2Html }}
        />
      ) : (
        <>
          {section2Heading ? <h3 data-animation="opacity-up">{section2Heading}</h3> : null}
          {section2Content ? <p data-animation="opacity-up">{section2Content}</p> : null}
        </>
      )}
    </div>
  );

  return (
    <div className={Style.about_second_section}>
      {colReverse ? (
        <>
          {contentComponent}
          {imageComponent}
        </>
      ) : (
        <>
          {imageComponent}
          {contentComponent}
        </>
      )}
    </div>
  );
};

export default AboutSecondSection;
