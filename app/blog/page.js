"use client";

import React, { useState } from "react";
import Image from "next/image";
import Style from "./blog.module.scss";
import { Icon } from "@iconify/react";
import Link from "next/link";

const Blog = () => {
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
              <h5 data-animation="opacity-up"></h5>
              <h2 data-animation="opacity-up"></h2>
            </div>
            <div className={Style.blog_banner_content}>
              <div className={Style.blog_banner_left_img}>
                <Image
                  src="/images/blog_page_images/blog_banner_img.png"
                  alt=""
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
                <h6></h6>
                <h3></h3>
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className={Style.wrapper}>
        <div className={Style.blog_boxes_main}>
        </div>
      </section>
    </main>
  );
};

export default Blog;
