"use client";

import React, { useState, useEffect } from "react";
import Style from "./privacy-policy.module.scss";
import useApiAuth from "../components/hooks/useApiAuth";
import PageLoader from "../components/ui/PageLoader";

const page = () => {
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
    <>
      <main className={Style.mainPriv}>
        <section className={Style.privacy_policy_banner}>
          <div className={Style.wrapper} style={{ margin: 0 }}>
            <div data-animation="opacity-up">
              {topSubHeading && (
                <p className={Style.topSubHeading}>{topSubHeading}</p>
              )}
              <h2>{topHeading}</h2>
            </div>
          </div>
        </section>

        <section className={Style.wrapper} style={{ marginTop: "30px" }}>
          <div className={Style.privacy_policy_content}>
            {content && (
              <div
                className={Style.contentHtml}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default page;
