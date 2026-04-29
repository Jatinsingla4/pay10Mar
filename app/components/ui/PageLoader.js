"use client";

import React from "react";
import { Icon } from "@iconify/react";
import styles from "./PageLoader.module.scss";

const PageLoader = () => {
  return (
    <div className={styles.pageLoader}>
      <div className={styles.loaderContent}>
        <Icon
          icon="svg-spinners:ring-resize"
          className={styles.loaderIcon}
        />
      </div>
    </div>
  );
};

export default PageLoader;
