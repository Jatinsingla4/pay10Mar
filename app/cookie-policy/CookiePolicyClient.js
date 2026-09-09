"use client";

import React from "react";
import Style from "../privacy-policy/privacy-policy.module.scss";
import { sanitizeHtml } from "../lib/sanitizeHtml";

const CookiePolicyClient = ({ pageData = null }) => {
  const cmsContent = pageData?.sections?.[0]?.content || pageData?.page_description;

  return (
    <main className={Style.mainPriv}>
      <section className={Style.content_section}>
        <h1 className={Style.title} data-animation="fade-up">{pageData?.page_title || "Cookie Policy"}</h1>

        <div className={Style.layout}>
          <aside className={Style.sidebar} data-animation="fade-up">
            <button className={Style.tab_pill}>Cookie Policy</button>
          </aside>

          <div className={Style.content_panel}>
            <div className={Style.contentHtml}>
              <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(cmsContent) }} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CookiePolicyClient;
