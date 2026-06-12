"use client";

import React, { useState, useEffect } from "react";
import Style from "./privacy-policy.module.scss";
import useApiAuth from "../components/hooks/useApiAuth";
import PageLoader from "../components/ui/PageLoader";

const PrivacyClient = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { makeApiCall } = useApiAuth();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await makeApiCall("/page/privacy-policy");

        if (!isMounted) return;

        if (result?.status) {
          setPageData(result);
        } else {
          setPageData(null);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching data:", error);
          setPageData(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [makeApiCall]);

  // Extract data from API response
  const pageDataContent = pageData?.page_data || {};
  const topHeading = pageDataContent.top_heading || undefined;
  const topSubHeading = pageDataContent.top_sub_heading || undefined;
  const content = pageDataContent.content || "";

  if (loading) {
    return <PageLoader />;
  }

  return (
    <main className={Style.mainPriv}>
      <section className={Style.privacy_policy_banner}>
        <p className={Style.topSubHeading}>{topSubHeading}</p>
        <h2>{topHeading}</h2>
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
            <div className={Style.contentHtml}
              dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyClient;
