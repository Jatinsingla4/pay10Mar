import React from "react";
import Style from "./TwoColLayout.module.scss";
import Image from "next/image";

const TwoColLayout = ({ item = null, imageBase = "", reverse = false }) => {
  const title = item?.Title || "";
  const rawImage = item?.Image || "";
  const imageSrc =
    rawImage && (/^https?:\/\//i.test(rawImage) || rawImage.startsWith("/"))
      ? rawImage
      : rawImage
        ? `${imageBase}${rawImage}`
        : "";
  const descriptionHtml = item?.Description || "";

  const imageEl = (
    <div className={Style.left_img_box}>
      {imageSrc ? (
        <Image
          width={540}
          height={540}
          src={imageSrc}
          alt={title}
          data-animation="opacity-up"
        />
      ) : null}
    </div>
  );

  const contentEl = (
    <div className={Style.right_content_box}>
      <div data-animation="opacity-up">
        <h3>{title}</h3>
      </div>
      <div data-animation="opacity-up" data-animation-delay="100">
        {descriptionHtml ? (
          <p dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
        ) : null}
      </div>
    </div>
  );

  return (
    <>
      <div className={Style.grid_container}>
        {reverse ? (
          <>
            {contentEl}
            {imageEl}
          </>
        ) : (
          <>
            {imageEl}
            {contentEl}
          </>
        )}
      </div>
    </>
  );
};

export default TwoColLayout;
