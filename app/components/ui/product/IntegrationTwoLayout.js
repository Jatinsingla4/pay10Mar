import React from "react";
import styles from "./IntegrationTwoLayout.module.scss";
import Image from "next/image";

const IntegrationTwoLayout = ({ heading, desc, img }) => {
  return (
    <section className={styles.integration_layout}>
      <div className={styles.layout_grid}>
        <div className={styles.left_content}>
          <div data-animation="opacity-up">
            <h3>{heading}</h3>
          </div>
          <div data-animation="opacity-up">
            <p>{desc}</p>
          </div>
        </div>
        <div className={styles.right_img}>
          <div data-animation="opacity-up">
            <Image width={585} height={453} src={img} alt="Integration image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationTwoLayout;
