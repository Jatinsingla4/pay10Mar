"use client";

import React from "react";
import Style from "./privacy-policy.module.scss";

const PrivacyClient = () => {
  return (
    <main className={Style.mainPriv}>
      <section className={Style.privacy_policy_banner}>
        <p className={Style.topSubHeading}></p>
        <h2></h2>
      </section>

      <section className={Style.content_section}>
        <div className={Style.arabic_btn_row}>
          <a href="/privacy-policy/#" className={Style.arabic_btn}>يبرع</a>
        </div>

        <div className={Style.layout}>
          <aside className={Style.sidebar}>
            <button className={Style.tab_pill}>Privacy Policy</button>
          </aside>
          <div className={Style.content_panel}>
            <div className={Style.contentHtml} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyClient;
