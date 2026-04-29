"use client";

import Image from "next/image";
import Style from "./FeaturesWithImage.module.scss";

const FeaturesWithImage = ({ heading, image, items = [], imageBase = '' }) => {
  return (
    <section className={Style.section_wrapper}>
      <div className={Style.wrapper}>
        <div className={Style.business_edge_section}>
          <div className={Style.left_image} data-animation="opacity-up">
            {image ? (
              <Image
                src={image}
                alt="Pay10 International Payment Solutions"
                width={800}
                height={800}
                sizes="(max-width: 768px) 100vw, 40vw"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            ) : null}
          </div>
          <div className={Style.features_content}>
            <h3 className={Style.features_title} data-animation="opacity-up">
              {heading}
            </h3>
            <div className={Style.features_grid} data-animation="opacity-up">
              {items.map((feature, index) => {
                const iconSrc = feature?.Image ? `${imageBase}${feature.Image}` : '';
                const title = feature?.Title || '';
                return (
                  <div key={index} className={Style.feature_card}>
                    <div className={Style.feature_icon}>
                      {iconSrc ? (
                        <Image
                          src={iconSrc}
                          alt={title}
                          width={38}
                          height={39}
                          style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        />
                      ) : null}
                    </div>
                    <p>{title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesWithImage;

