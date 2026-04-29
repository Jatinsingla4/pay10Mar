"use client";

import React, { useState, useEffect } from "react";
import Style from "./terms_and_conditions.module.scss";
import Link from "next/link";
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
        const result = await makeApiCall("/page/terms-conditions");

        if (!isMounted) return;

        // console.log(result);

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
  const content = pageDataContent.content || "";

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <main>

        <section className={Style.terms_and_condition_banner}>
          <div className={Style.wrapper} style={{margin: 0}}>
            <div>
              <h2>{topHeading}</h2>
            </div>
          </div>
        </section>

        <section className={Style.wrapper}>
          <div className={Style.terms_and_conditions_content}>
            {content && (
              <div
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
