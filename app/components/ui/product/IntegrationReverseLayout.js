import React from "react";
import Style from "./IntegrationReverseLayout.module.scss";
import Image from "next/image";

const resolveImageSrc = (raw, imageBase = "") => {
  if (!raw) return "";
  const src = String(raw);
  if (/^https?:\/\//i.test(src) || src.startsWith("/")) return src;
  return `${imageBase}${src}`;
};

const IntegrationReverseLayout = ({
  heading = "Mobile SDK",
  desc = "Integrate our Mobile SDK into your app to start accepting payments quickly and securely.",
  img = "/images/product_page_images/integration_methods_images/reverse_grid_img.png",
  imageBase = "",
}) => {
  const imageSrc = resolveImageSrc(img, imageBase);

  return (
    <section className={Style.reverse_layout}>
      <div className={Style.reverse_grid}>
        <div className={Style.left_img}>
          <div data-animation="opacity-up">
            <Image
              width={585}
              height={453}
              src={imageSrc}
              alt="Integratin image"
            />
          </div>
        </div>
        <div className={Style.right_content}>
          <div data-animation="opacity-up">
            <h3>{heading}</h3>
          </div>
          <div data-animation="opacity-up">
            <p>{desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationReverseLayout;
