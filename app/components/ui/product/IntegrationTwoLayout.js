import React from "react";
import styles from "./IntegrationTwoLayout.module.scss";
import Image from "next/image";

const IntegrationTwoLayout = ({ heading, desc, img }) => {
  return (
    <section className={styles.integration_layout}>
      <div className={styles.layout_grid}>
        <div className={styles.copyCol}>
          {heading ? (
            <div data-animation="opacity-up">
              <h3>{heading}</h3>
            </div>
          ) : null}
          {desc ? (
            <div data-animation="opacity-up">
              <p>{desc}</p>
            </div>
          ) : null}
        </div>
        <div className={styles.visualCol}>
          {img ? (
            <div data-animation="opacity-up">
              <Image
                width={585}
                height={453}
                src={img}
                alt={heading || "Integration image"}
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default IntegrationTwoLayout;
