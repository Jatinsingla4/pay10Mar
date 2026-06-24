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
 * KFS Customer Wallet — static (no API calls).
 */
const KfsBizAppClient = () => {
  return (
    <main className={Style.main}>
      <header className={Style.heroBanner}>
        <div className={Style.heroInner}>
          <p className={Style.heroKicker} data-animation="opacity-up">{STATIC_HERO.kicker}</p>
          <h1 className={Style.heroTitle} data-animation="opacity-up" data-anim-delay="100">{STATIC_HERO.title}</h1>
        </div>
      </header>
      <div className={Style.contentShell} data-animation="opacity-up" data-anim-delay="200">
        <p className={Style.emptyState} role="status">
          No Key Facts content is available.
        </p>
      </div>
    </main>
  );
};

export default KfsBizAppClient;
