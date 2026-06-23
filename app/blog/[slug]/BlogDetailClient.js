"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Style from "./blog-details.module.scss";

const BLOG_DATA = {
  "how-to-manage-payment-failures-effectively": {
    heroImage: "/images/blog_page_images/blog_banner_img.png",
    toc: [
      { id: "introduction", label: "Introduction" },
      { id: "what-is-failed-payment", label: "What is a Failed Payment?" },
      { id: "why-do-payments-fail", label: "Why Do Payments Fail?" },
      { id: "effective-methods", label: "Effective Methods to Reduce Payment Failure" },
      { id: "conclusion", label: "Conclusion" },
    ],
    title: "How to Manage Payment Failures Effectively",
    author: "Abha Pal, Content Team",
    date: "June 15, 2026",
    summary: {
      points: [
        "Payment failures can be caused by system downtime, technology errors, insufficient funds, security issues, or incorrect information.",
        "Effective ways to reduce failures include smart routing, an advanced integrated payment platform, strong security, and offering multiple payment methods.",
        "Pay10 is a reliable, CBUAE-licensed payment gateway offering smart routing, 100+ payment options, and enterprise-grade security to minimize payment failures.",
      ],
      cta: { text: "Get started with Pay10", href: "/contact" },
    },
    intro:
      "Pay10 is a CBUAE-licensed payment aggregator and fintech platform helping businesses across the UAE simplify digital payments with secure, scalable, and enterprise-grade payment solutions. Trusted by startups, SMEs, enterprises, D2C brands, and growing businesses, Pay10 supports cards, net banking, wallets, payment links, international payments, and advanced merchant solutions designed for modern digital commerce.",
    sections: [
      {
        id: "introduction",
        heading: "Introduction",
        type: "text",
        content:
          "A declined payment at checkout is a costly moment in the customer journey. It directly translates to lost revenue, lower conversion rates, and a damaged reputation. While completely eliminating payment failures is impossible, understanding why they happen is the first step to minimizing them.",
      },
      {
        id: "what-is-failed-payment",
        heading: "What is a Failed Payment?",
        type: "text",
        content:
          "A failed payment is a transaction that is not completed due to an error or issue, meaning funds are not transferred. It occurs when the card issuer, bank, or gateway does not approve the transaction.",
      },
      {
        type: "mid_cta",
        text: "Digital payments made simpler. Pay10 delivers secure, CBUAE-licensed payment solutions designed for today's fast-moving digital economy.",
        cta: "Try Pay10 Today",
        href: "/contact",
      },
      {
        id: "why-do-payments-fail",
        heading: "Why Do Payments Fail?",
        type: "bullets",
        bullets: [
          {
            label: "System Downtime:",
            text: " If a payment gateway is down or running slowly due to high traffic, transactions time out, fail, or risk data corruption.",
          },
          {
            label: "Technology Failure:",
            text: " Network outages, software bugs, or poorly managed system upgrades prevent the secure processing of transactions.",
          },
          {
            label: "Insufficient Funds:",
            text: " The bank blocks the transaction because the payer's account lacks the money to cover the purchase.",
          },
          {
            label: "Incorrect Information:",
            text: " Customer typos - such as wrong card numbers, expiry dates, or CVVs - cause immediate declines.",
          },
        ],
      },
      {
        id: "effective-methods",
        heading: "Effective Methods to Reduce Payment Failure",
        type: "bullets",
        bullets: [
          {
            label: "Implement Smart Routing:",
            text: " Use a reliable online payment processing service or payment gateway that routes transactions through multiple processors. If one processor experiences downtime, the system automatically reroutes the payment to a functional backup.",
          },
          {
            label: "Upgrade to an Advanced Integrated Platform:",
            text: " Basic payment gateways struggle to scale. Growing businesses require advanced backend functionality to process high transaction volumes seamlessly. A robust cross-border payments platform can further improve transaction success rates by simplifying global payment acceptance and settlement.",
          },
          {
            label: "Prioritize Online Security:",
            text: " Prevent security-related declines by integrating a gateway with top-tier protection, such as PCI-DSS Level 1 compliance, TLS encryption, and tokenization.",
          },
          {
            label: "Offer Multiple Payment Options:",
            text: " Provide a wide variety of payment modes (cards, net banking, wallets). If a customer encounters an issue with one method, they can easily switch to another rather than abandoning the purchase.",
          },
        ],
      },
      {
        id: "conclusion",
        heading: "Conclusion",
        type: "text",
        content:
          "Payment failures directly hurt your revenue, but they are highly preventable. Upgrading to a reliable, secure payment gateway that offers multi-processor routing and diverse payment options keeps your checkout smooth and protects your bottom line.",
      },
      {
        id: "stop-losing",
        heading: "Stop Losing Revenue to Payment Failures",
        type: "links",
        links: [
          { text: "Get Started with Pay10", href: "/contact" },
          { text: "Explore the Pay10 Payment Gateway", href: "/products" },
          { text: "See All Integration Methods", href: "/products" },
        ],
      },
    ],
    alsoRead: [
      {
        title: "Common Challenges of Online Payment Processing",
        href: "/blog/common-challenges-of-online-payment-processing",
      },
    ],
  },
};

const DEFAULT_POST = BLOG_DATA["how-to-manage-payment-failures-effectively"];

const BlogDetailClient = ({ slug }) => {
  const post = BLOG_DATA[slug] || DEFAULT_POST;

  return (
    <main>
      {/* Hero Banner */}
      <div className={Style.blog_hero}>
        <div className={Style.hero_text}>
          <h2>
            How to avoid <span>payment</span>
            <br />
            <span>failure?</span>
          </h2>
          <div className={Style.hero_line} />
        </div>
        <div className={Style.hero_image}>
          <Image
            src={post.heroImage}
            alt={post.title}
            width={680}
            height={460}
            priority
          />
        </div>
      </div>

      {/* Two-column layout */}
      <div className={Style.blog_layout}>
        {/* Sticky Sidebar */}
        <aside className={Style.sidebar}>
          <p className={Style.toc_heading}>Table of contents</p>
          <ul className={Style.toc_list}>
            {post.toc.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
          <div className={Style.sidebar_cta}>
            <p>Ready to scale your global payments with Pay10?</p>
            <Link href="/contact">Get Started</Link>
          </div>
        </aside>

        {/* Main Article */}
        <article className={Style.article}>
          <h1 className={Style.article_title}>{post.title}</h1>

          <div className={Style.article_meta}>
            <div className={Style.author_avatar} />
            <div className={Style.author_info}>
              <strong>{post.author}</strong>
              <span>{post.date}</span>
            </div>
          </div>

          {/* Summary Box */}
          <div className={Style.summary_box}>
            <h3>Summary</h3>
            <ul>
              {post.summary.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
            <Link href={post.summary.cta.href}>{post.summary.cta.text}</Link>
          </div>

          {/* Intro */}
          <p className={Style.article_intro}>{post.intro}</p>

          {/* Sections */}
          {post.sections.map((section, i) => {
            if (section.type === "mid_cta") {
              return (
                <div key={i} className={Style.mid_cta}>
                  <p>{section.text}</p>
                  <Link href={section.href}>{section.cta}</Link>
                </div>
              );
            }

            if (section.type === "links") {
              return (
                <div key={i} id={section.id} className={Style.stop_losing}>
                  <h2>{section.heading}</h2>
                  <p>
                    {section.links.map((link, j) => (
                      <React.Fragment key={j}>
                        <Link href={link.href}>{link.text}</Link>
                        {j < section.links.length - 1 ? ".  " : "."}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              );
            }

            return (
              <section key={i} id={section.id} className={Style.section}>
                <h2>{section.heading}</h2>
                {section.content && <p>{section.content}</p>}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet, j) => (
                      <li key={j}>
                        <strong>{bullet.label}</strong>
                        {bullet.text}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            );
          })}

          {/* Also Read */}
          {post.alsoRead && post.alsoRead.length > 0 && (
            <div className={Style.also_read}>
              <p>Also read:</p>
              <ul>
                {post.alsoRead.map((item, i) => (
                  <li key={i}>
                    <Link href={item.href}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>
      </div>
    </main>
  );
};

export default BlogDetailClient;
