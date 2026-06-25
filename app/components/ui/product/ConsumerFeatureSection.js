import React from 'react';
import Style from './ConsumerFeatureSection.module.scss';

const ConsumerFeatureSection = ({
  heading,
  subheading,
  points,
  imageSrc,
  imageAlt,
  isReversed = false,
  isGreyBg = false,
}) => {
  return (
    <section className={`${Style.feature_section} ${isGreyBg ? Style.bg_grey : Style.bg_white}`}>
      <div className={Style.container}>
        <div className={`${Style.text_col} ${isReversed ? Style.order_2 : Style.order_1}`}>
          <h2 data-animation="opacity-up">{heading}</h2>
          {subheading && (
            <p className={Style.subtitle} data-animation="opacity-up" data-anim-delay="100">
              {subheading}
            </p>
          )}
          {points && points.length > 0 && (
            <ul className={Style.points_list}>
              {points.map((point, index) => (
                <li key={index} data-animation="opacity-up" data-anim-delay={`${150 + index * 50}`}>
                  <span className={Style.bullet}></span>
                  {point}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={`${Style.image_col} ${isReversed ? Style.order_1 : Style.order_2}`} data-animation="opacity-up">
          <div className={Style.image_container_with_ring}>
            <div className={`${Style.image_wrapper} ${isGreyBg ? Style.bg_white : Style.bg_white}`}>
              <img src={imageSrc} alt={imageAlt} className={Style.placeholder_img} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsumerFeatureSection;
