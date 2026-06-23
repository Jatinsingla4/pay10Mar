"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Style from "./blog-details.module.scss";
import Link from "next/link";
import { InlineIcon } from "@iconify/react";

const BlogDetailClient = () => {
  const params = useParams();
  const slug = params?.slug;
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

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
          <p></p>
          <h1></h1>
        </div>
      </div>

      <div className={Style.wrapper}>
        <div className={Style.details}>
          <h2 data-animation="opacity-up">
            {"The convenience and efficiency of online transactions have revolutionized the way we conduct business in this digital era."}
          </h2>
        </div>
      </div>
    </main>
  );
};

export default BlogDetailClient;
