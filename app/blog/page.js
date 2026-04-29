"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Style from "./blog.module.scss";
import { Icon } from "@iconify/react";
import Link from "next/link";
import useApiAuth from "../components/hooks/useApiAuth";
import PageLoader from "../components/ui/PageLoader";

const Blog = () => {
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [allPosts, setAllPosts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const { makeApiCall } = useApiAuth();
  const imageBase = process.env.NEXT_PUBLIC_IMAGE_URL || "";

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await makeApiCall("/blog");

        if (!isMounted) return;

        // console.log(result);

        if (result?.status) {
          setBlogData(result);
          setAllPosts(result.post_listing || []);
          setPagination(result.pagination || null);
          setCurrentPage(result.pagination?.current_page || 1);
        } else {
          setBlogData(null);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching data:", error);
          setBlogData(null);
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

  const handleLoadMore = async () => {
    if (loadingMore || !pagination) return;

    const nextPage = currentPage + 1;

    if (nextPage > pagination.total_pages) return;

    setLoadingMore(true);
    try {
      const result = await makeApiCall(`/blog?page=${nextPage}`);

      if (result?.status && result.post_listing) {
        setAllPosts((prevPosts) => [...prevPosts, ...result.post_listing]);
        setPagination(result.pagination || pagination);
        setCurrentPage(nextPage);
      }
    } catch (error) {
      console.error("Error loading more posts:", error);
    } finally {
      setLoadingMore(false);
    }
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

  const pageData = blogData?.page_data || {};
  const postLatest = blogData?.post_latest || {};
  const hasMorePages =
    pagination && currentPage < pagination.total_pages;

  // API-driven values only
  const topSubHeading = pageData.top_sub_heading || undefined;
  const topHeading = pageData.top_heading || undefined;
  const latestPostImage = postLatest.image
    ? `${imageBase}${postLatest.image}`
    : "/images/blog_page_images/blog_banner_img.png";
  const latestPostDate = formatDate(postLatest.post_date);
  const latestPostTitle = postLatest.name || "";
  const latestPostDescription = postLatest.short_description || "";
  const latestPostSlug = postLatest.slug || "";

  if (loading && !blogData) {
    return <PageLoader />;
  }

  return (
    <main className={Style.blogListing}>
      <div className={Style.blog_banner}>
        <Image
          src="/images/blog_page_images/blog_bannerr_circle.png"
          className={Style.blog_banner_circle}
          alt=""
          width={1200}
          height={1200}
          sizes="(max-width: 900px) 0px, 60vw"
          data-animation="opacity-up"
        />
        <div className={Style.wrapper}>
          <div className={Style.blog_content}>
            <div className={Style.blog_banner_headings}>
              <h5 data-animation="opacity-up">{topSubHeading}</h5>
              <h2 data-animation="opacity-up">{topHeading}</h2>
            </div>
            <div className={Style.blog_banner_content}>
              <div className={Style.blog_banner_left_img}>
                <Image
                  src={latestPostImage}
                  alt={latestPostTitle}
                  width={470}
                  height={470}
                  sizes="(max-width: 900px) 80vw, 470px"
                  className={Style.latestPostImage}
                  data-animation="scale-up"
                  style={{ height: "auto" }}
                />
              </div>
              <div
                className={Style.blog_banner_right_content}
                data-animation="opacity-up"
              >
                <h6>{latestPostDate}</h6>
                <h3>{latestPostTitle}</h3>
                <p>{latestPostDescription}</p>
                {latestPostSlug && (
                  <Link
                    href={`/blog/${latestPostSlug}`}
                    className={Style.blog_content_icon}
                  >
                    <Icon icon="fa6-solid:angle-right" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className={Style.wrapper}>
        <div className={Style.blog_boxes_main}>
          {allPosts.map((blog, idx) => {
            const blogImage = blog.image
              ? `${imageBase}${blog.image}`
              : "/images/blog_page_images/blog_img1.png";
            const blogDate = formatDate(blog.post_date);
            const blogSlug = blog.slug || "";
            return (
              <Link
                key={blog.slug || idx}
                href={blogSlug ? `/blog/${blogSlug}` : "#"}
                className={Style.blog_box_content}
                data-animation="opacity-up"
              >
                <div className={Style.blog_img}>
                  <Image
                    src={blogImage}
                    alt={blog.name || ""}
                    width={900}
                    height={600}
                    sizes="(max-width: 1000px) 100vw, 50vw"
                    className={Style.blogCardImage}
                    style={{ height: "auto" }}
                  />
                </div>
                <h6 className={Style.blog_smalltxt}>{blogDate}</h6>
                <h3 className={Style.blog_heading}>{blog.name || ""}</h3>
                <p className={Style.blog_desc}>
                  {blog.short_description || ""}
                </p>
              </Link>
            );
          })}
        </div>
        {hasMorePages && (
          <div
            style={{ textAlign: "center", width: "100%" }}
            data-animation="scale-up"
          >
            <button
              className={Style.load_more_btn}
              onClick={handleLoadMore}
              disabled={loadingMore}
            >
              {loadingMore ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Blog;
