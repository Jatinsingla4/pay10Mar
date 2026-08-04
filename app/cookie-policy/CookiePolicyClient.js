"use client";

import React from "react";
import Style from "../privacy-policy/privacy-policy.module.scss";
import { sanitizeHtml, isEmptyHtml } from "../lib/sanitizeHtml";

const CookiePolicyClient = ({ pageData = null }) => {
  const cmsContent = pageData?.sections?.[0]?.content || pageData?.page_description;
  const hasCmsContent = !isEmptyHtml(cmsContent);

  return (
    <main className={Style.mainPriv}>
      <section className={Style.content_section}>
        <h1 className={Style.title} data-animation="fade-up">COOKIE POLICY</h1>

        <div className={Style.layout}>
          <aside className={Style.sidebar} data-animation="fade-up">
            <button className={Style.tab_pill}>Cookie Policy</button>
          </aside>

          <div className={Style.content_panel}>
            <div className={Style.contentHtml}>
            {hasCmsContent ? (
              <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(cmsContent) }} />
            ) : (
              <>
              <h2 data-animation="fade-up">Introduction</h2>
              <p data-animation="fade-up">
                Our website, <a href="https://pay10.ae">https://pay10.ae</a> (&ldquo;the website&rdquo;), uses
                cookies and similar technologies (referred to collectively as &ldquo;cookies&rdquo;) to make
                the site work properly and to understand how it is used. This policy explains what
                cookies are, which ones we use, and how you can control them.
              </p>

              <h2 data-animation="fade-up">What are cookies?</h2>
              <p data-animation="fade-up">
                A cookie is a small file that a website stores on your device. Cookies let a site
                remember your actions and preferences over time, and can be read by the site that
                set them (or, in the case of third-party cookies, by a different site).
              </p>

              <h2 data-animation="fade-up">Necessary cookies</h2>
              <p data-animation="fade-up">
                These are required for the website to function and cannot be switched off. On this
                site, this includes remembering the cookie preference you select in the consent banner
                itself, so we don&rsquo;t ask again on every visit.
              </p>

              <h2 data-animation="fade-up">Analytics cookies</h2>
              <p data-animation="fade-up">
                We use Google Analytics and Google Tag Manager to understand how visitors use our
                website, so we can improve it. These cookies collect information such as pages
                visited and time spent on the site, in aggregate and anonymized form. This category
                is optional — you can decline it from the consent banner.
              </p>

              <h2 data-animation="fade-up">Third-party embeds</h2>
              <p data-animation="fade-up">
                Some pages on our website (such as our Contact Us page) embed Google Maps to show
                our office location. Google may set its own cookies when this content loads. Read
                more in the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>.
              </p>

              <h2 data-animation="fade-up">Managing your preferences</h2>
              <p data-animation="fade-up">
                You can accept or decline non-essential cookies at any time from the consent banner
                shown on your first visit, or by clearing your browser&rsquo;s site data to have the
                banner reappear.
              </p>

              <h2 data-animation="fade-up">Changes to this policy</h2>
              <p data-animation="fade-up">
                We may update this Cookie Policy from time to time to reflect changes in the
                technologies we use. Please check back periodically.
              </p>

              <h2 data-animation="fade-up">Contact us</h2>
              <p data-animation="fade-up">
                If you have questions about this Cookie Policy, contact us at{" "}
                <a href="mailto:support@pay10.ae">support@pay10.ae</a>.
              </p>
              </>
            )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CookiePolicyClient;
