"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Style from "./blog-details.module.scss";
import Link from "next/link";
import { InlineIcon } from "@iconify/react";
import useApiAuth from "../../components/hooks/useApiAuth";
import PageLoader from "../../components/ui/PageLoader";
import { cmsImageSrc } from "../../lib/cmsImageSrc";

const BlogDetailClient = () => {
  const params = useParams();
  const slug = params?.slug;
  const [blogDetailData, setBlogDetailData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const { makeApiCall } = useApiAuth();
  const imageBase = process.env.NEXT_PUBLIC_IMAGE_URL || "";

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!slug) return;

      setLoading(true);
      try {
        const result = await makeApiCall(`/blog_detail/${slug}`);

        if (!isMounted) return;

        // console.log(result);

        if (result?.status) {
          setBlogDetailData(result);
        } else {
          setBlogDetailData(null);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching data:", error);
          setBlogDetailData(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [slug, makeApiCall]);

  const handleToggle = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      const options = { day: "numeric", month: "long", year: "numeric" };
      return date.toLocaleDateString("en-US", options);
    } catch (error) {
      return dateString;
    }
  };

  // Parse FAQ JSON
  const parseFAQ = (faqJson) => {
    if (!faqJson) return [];
    try {
      const parsed = typeof faqJson === "string" ? JSON.parse(faqJson) : faqJson;
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Error parsing FAQ JSON:", error);
      return [];
    }
  };

  if (loading && !blogDetailData) {
    return <PageLoader />;
  }

  if (!blogDetailData) {
    return (
      <main>
        <div className={Style.wrapper} style={{ textAlign: "center", padding: "80px 56px" }}>
          <p>Blog post not found</p>
          <Link href="/blog" className={Style.backto_blog}>
            <span>
              <InlineIcon
                icon="qlementine-icons:chevron-left-16"
                width="20"
                height="20"
              />
            </span>
            <span>Back To Blog</span>
          </Link>
        </div>
      </main>
    );
  }

  const pageData = blogDetailData?.page_data || {};
  const postDate = formatDate(pageData.post_date);
  const postTitle = pageData.name || "";
  const postImageFromCms = pageData.image ? cmsImageSrc(pageData.image, imageBase) : null;
  const postImage =
    postImageFromCms || "/images/blog_page_images/blog_details_imgs/img2.png";
  const postImageMobile =
    postImageFromCms || "/images/blog_page_images/blog_details_imgs/mob_img2.png";
  const content = pageData.content || "";
  const content2 = pageData.content2 || "";
  const faqData = parseFAQ(pageData.faq_json);

  // Extract first paragraph for the h3 heading
  const extractFirstParagraph = (html) => {
    if (!html) return "";
    const text = html.replace(/<[^>]+>/g, "").trim();
    return text.split(/\n/)[0] || text.substring(0, 150) || "";
  };

  const firstParagraph = extractFirstParagraph(content);

  return (
    <main>
      <Link href="/blog" className={Style.backto_blog}>
        <span>
          <InlineIcon
            icon="qlementine-icons:chevron-left-16"
            width="20"
            height="20"
          />
        </span>
        <span>Back To Blog</span>
      </Link>
      <div className={Style.blog_details_banner} data-animation="opacity-up">
        <div className={Style.wrapper}>
          <p>{postDate}</p>
          <h1>{postTitle}</h1>
        </div>
      </div>

      <div className={Style.wrapper}>
        <div className={Style.details}>
          <h2 data-animation="opacity-up">
            {firstParagraph || "The convenience and efficiency of online transactions have revolutionized the way we conduct business in this digital era."}
          </h2>
          {content && (
            <div
              className={Style.blogContent}
              data-animation="opacity-up"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </div>
      </div>

      {postImage && (
        <div className={Style.img_second} data-animation="opacity-up">
          <Image
            src={postImage}
            alt={postTitle}
            width={1600}
            height={900}
            sizes="100vw"
            className={Style.desktopImage}
          />
          <Image
            src={postImageMobile}
            alt={postTitle}
            width={900}
            height={900}
            sizes="100vw"
            className={Style.mobileImage}
          />
        </div>
      )}

      {content2 && (
        <div className={Style.wrapper}>
          <div className={Style.work_details}>
            <div
              className={Style.blogContent}
              dangerouslySetInnerHTML={{ __html: content2 }}
            />
          </div>
        </div>
      )}

      {faqData.length > 0 && (
        <section className={Style.benefits_section}>
          <div className={Style.wrapper}>
            <h2 data-animation="opacity-up">Benefits to Yield from a Reliable Payment</h2>
            <div className={Style.accordion} data-animation="opacity-up">
              {faqData.map((item, index) => {
                const isActive = activeIndex === index;
                const hasDescription = Boolean(item.description);
                return (
                  <div
                    key={item.title || index}
                    className={`${Style.accordion_item} ${isActive ? Style.active : ""}`}
                  >
                    <button
                      type="button"
                      className={Style.accordion_header}
                      onClick={() => handleToggle(index)}
                      aria-expanded={isActive}
                    >
                      <span className={Style.toggle_sign} aria-hidden="true"></span>
                      <span>{item.title}</span>
                    </button>
                    {hasDescription && (
                      <div
                        className={`${Style.accordion_body} ${isActive ? Style.open : ""}`}
                        aria-hidden={!isActive}
                      >
                        <p>{item.description}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default BlogDetailClient;
