"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Style from "./blog.module.scss";
import { Icon } from "@iconify/react";

const FEATURED_POST = {
  slug: "everything-you-need-to-know-about-digital-wallets-in-the-uae",
  category: "Digital Payments",
  title: "Everything You Need to Know About Digital Wallets in the UAE",
  excerpt:
    "Digital wallets have transformed the way residents and businesses in the UAE handle transactions. From CBUAE-licensed providers to seamless contactless payments, here's your complete guide to navigating the UAE's digital wallet landscape.",
  author: "Pay10 Content Team",
  date: "June 17, 2026",
  image: "/images/blog_page_images/blog_banner_img.png",
};

const BLOG_POSTS = [
  {
    slug: "how-pay10-is-revolutionizing-cross-border-payments",
    image: "/images/blog_page_images/blog_img1.png",
    category: "Cross-Border Payments",
    title: "How Pay10 is Revolutionizing Cross-Border Payments in the UAE",
    excerpt:
      "As the UAE's first licensed Third-Party Provider under CBUAE's Open Finance framework, Pay10 is redefining how businesses and individuals send money across borders.",
    date: "June 15, 2026",
  },
  {
    slug: "open-finance-in-the-uae-what-it-means-for-businesses",
    image: "/images/blog_page_images/blog_img2.png",
    category: "Open Finance",
    title: "Open Finance in the UAE: What It Means for Your Business",
    excerpt:
      "The Central Bank of the UAE's Open Finance framework is opening new doors for fintech innovation. Here's what businesses need to know about this landmark regulatory shift.",
    date: "June 10, 2026",
  },
  {
    slug: "5-benefits-of-using-a-cbuae-licensed-payment-gateway",
    image: "/images/blog_page_images/blog_img3.png",
    category: "Payment Gateway",
    title: "5 Benefits of Using a CBUAE Licensed Payment Gateway",
    excerpt:
      "Choosing a CBUAE-licensed payment gateway isn't just a compliance checkbox — it's a strategic advantage. Discover the five key benefits that set licensed gateways apart.",
    date: "June 5, 2026",
  },
  {
    slug: "understanding-merchant-acquiring-services-in-the-uae",
    image: "/images/blog_page_images/blog_img4.png",
    category: "Merchant Services",
    title: "Understanding Merchant Acquiring Services in the UAE",
    excerpt:
      "Merchant acquiring is the backbone of every card payment. Learn how acquiring services work, why they matter, and how Pay10's licensed acquiring capabilities can help your business grow.",
    date: "June 1, 2026",
  },
  {
    slug: "the-future-of-digital-payments-in-the-middle-east",
    image: "/images/blog_page_images/blog_img1.png",
    category: "Industry Insights",
    title: "The Future of Digital Payments in the Middle East",
    excerpt:
      "From real-time payments to AI-driven fraud prevention, the Middle East's payment landscape is evolving at an unprecedented pace. Here's what the next five years hold.",
    date: "May 28, 2026",
  },
  {
    slug: "what-is-stored-value-facility-svf-and-how-does-it-work",
    image: "/images/blog_page_images/blog_img2.png",
    category: "Fintech",
    title: "What is a Stored Value Facility (SVF) and How Does It Work?",
    excerpt:
      "SVF licenses allow businesses to issue prepaid wallets and stored value accounts. With Pay10 holding an SVF license from CBUAE, here's everything you need to know.",
    date: "May 20, 2026",
  },
];

const Blog = () => {
  return (
    <main className={Style.blogListing}>
      <div className={Style.blog_banner}>
        <div className={Style.wrapper}>
          <div className={Style.blog_content}>
            <div className={Style.blog_banner_headings}>
              <h5 data-animation="opacity-up">Pay10 Blog</h5>
              <h2 data-animation="opacity-up">
                Get the latest tips and guides on how to stay ahead in the world
                of digital payments
              </h2>
            </div>

            <div className={Style.blog_banner_content}>
              <div className={Style.blog_banner_left_img}>
                <Image
                  src={FEATURED_POST.image}
                  alt={FEATURED_POST.title}
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
                <h6>{FEATURED_POST.author} &nbsp;|&nbsp; {FEATURED_POST.date}</h6>
                <h3>{FEATURED_POST.title}</h3>
                <p>{FEATURED_POST.excerpt}</p>
                <Link
                  href={`/blog/${FEATURED_POST.slug}`}
                  className={Style.blog_content_icon}
                >
                  <Icon icon="carbon:arrow-right" width={20} height={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className={Style.wrapper}>
        <div className={Style.blog_boxes_main}>
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={Style.blog_box_content}
            >
              <div className={Style.blog_img}>
                <Image
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={340}
                  className={Style.blogCardImage}
                  style={{ height: "auto", borderRadius: "12px" }}
                />
              </div>
              <p className={Style.blog_smalltxt}>
                {post.category} &nbsp;|&nbsp; {post.date}
              </p>
              <h3 className={Style.blog_heading}>{post.title}</h3>
              <p className={Style.blog_desc}>{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Blog;
