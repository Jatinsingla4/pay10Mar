"use client";

import React from "react";
import { formatFaqRichText } from "../faq-customer-app/formatFaqMarks";
import {
  buildKfsToc,
  normalizeKfsHero,
} from "./kfsBizApiNormalize";
import Style from "./kfs-biz-app.module.scss";

const scrollToBlock = (id) => {
  if (typeof document === "undefined") return;
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const STATIC_HERO = normalizeKfsHero(undefined);

/**
 * KFS Merchant App — static (no API calls).
 */
const KfsBizAppClient = () => {
  return (
    <main className={Style.main}>
      <header className={Style.heroBanner}>
        <div className={Style.heroInner}>
          <p className={Style.heroKicker}>{STATIC_HERO.kicker}</p>
          <h1 className={Style.heroTitle}>{STATIC_HERO.title}</h1>
        </div>
      </header>
      <div className={Style.contentShell}>
        <p className={Style.emptyState} role="status">
          No Key Facts content is available.
        </p>
      </div>
    </main>
  );
};

export default KfsBizAppClient;
