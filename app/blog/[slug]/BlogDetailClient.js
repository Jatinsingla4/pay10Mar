"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Style from "./blog-details.module.scss";

const BLOG_DATA = {
  "how-to-manage-payment-failures-effectively": {
    heroImage: "/images/blog_page_images/blog_hero_banner.jpeg",
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
      { title: "Common Challenges of Online Payment Processing", href: "/blog/common-challenges-of-online-payment-processing" },
      { title: "Card Authorisation Rate Explained", href: "/blog/card-authorisation-rate-explained" },
      { title: "Pay10: Best Digital Payment Solutions for Growth", href: "/blog/pay10-best-digital-payment-solutions-for-growth" },
    ],
    faq: {
      heading: "Benefits to Yield from a Reliable Payment",
      items: [
        {
          question: "Q1. What is a payment failure?",
          answer:
            "A payment failure occurs when a transaction cannot be completed. This can happen due to technical errors, insufficient funds, incorrect payment details, or security blocks by the issuing bank. Payment failures result in lost revenue and a poor customer experience.",
        },
        {
          question: "Q2. How does smart routing help reduce payment failures?",
          answer:
            "Smart routing automatically directs a transaction to the best available payment processor at the time of checkout. If one processor is down or experiencing issues, the system instantly reroutes to a backup — increasing transaction success rates without any manual intervention.",
        },
        {
          question: "Q3. What should I do if my customers are facing repeated payment failures?",
          answer:
            "First, identify whether the failures are gateway-side (technical issues) or customer-side (insufficient funds, wrong details). Then consider enabling retry logic, offering alternate payment methods, and using a gateway with real-time monitoring. Pay10's merchant dashboard gives you full visibility into failure reasons.",
        },
        {
          question: "Q4. Does offering more payment methods reduce failure rates?",
          answer:
            "Yes. When customers have multiple payment options — cards, wallets, bank transfers — they can switch methods if one fails. This reduces checkout abandonment and improves overall conversion rates significantly.",
        },
        {
          question: "Q5. How does Pay10 help businesses manage payment failures?",
          answer:
            "Pay10 is a CBUAE-licensed payment platform with built-in smart routing, real-time failure monitoring, multiple payment method support, and enterprise-grade security. Our advanced infrastructure ensures the highest possible transaction success rates for businesses operating in the UAE.",
        },
      ],
    },
    seoKeywords:
      "Why Businesses Trust Pay10 | CBUAE Licensed Payment Provider | PCI-DSS Compliant | ISO 27001 Certified | 100+ Payment Options | Advanced Fraud Prevention & Risk Monitoring | Trusted by Enterprises & Growing Businesses | Scalable Infrastructure for UAE & Cross-border | Enterprise-grade Payment Technology | Secure Digital Payment Solutions",
    relatedPosts: [
      {
        slug: "pay10-best-digital-payment-solutions-for-growth",
        image: "/images/blog_page_images/blog_img1.png",
        author: "Abha Pal, Content Team",
        date: "June 15, 2026",
        title: "Pay10: Best Digital Payment Solutions for Growth",
        excerpt:
          "The digital revolution in finance and technology has been about the transformation of the financial services industry. Financial Technology better known as Fintech...",
      },
      {
        slug: "common-challenges-of-online-payment-processing",
        image: "/images/blog_page_images/blog_img2.png",
        author: "Abha Pal, Content Team",
        date: "June 3, 2026",
        title: "Common Challenges of Online Payment Processing",
        excerpt:
          "Modern Commerce Backbone: Digital payments have revolutionized business models like e-commerce and subscriptions, shifting from a customer convenience to a survival necessity.",
      },
      {
        slug: "hosted-vs-self-hosted-payment-gateway",
        image: "/images/blog_page_images/blog_img3.png",
        author: "Abha Pal, Content Team",
        date: "June 3, 2026",
        title: "Hosted vs Self-Hosted Payment Gateway",
        excerpt:
          "Security has always been at the forefront of consumers when they make any purchase online. With the increase in data breaches...",
      },
    ],
  },
};

const DEFAULT_POST = BLOG_DATA["how-to-manage-payment-failures-effectively"];

const BlogDetailClient = ({ slug }) => {
  const post = BLOG_DATA[slug] || DEFAULT_POST;
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq((prev) => (prev === index ? null : index));
  };

  return (
    <main>
      {/* Hero Banner */}
      <div className={Style.blog_hero}>
        <div className={Style.hero_image_full}>
          <Image
            src={post.heroImage}
            alt={post.title}
            width={1400}
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

          {/* SEO Keywords Block */}
          {post.seoKeywords && (
            <p className={Style.seo_keywords}>{post.seoKeywords}</p>
          )}

          {/* FAQ Accordion */}
          {post.faq && (
            <div className={Style.faq_section}>
              <h2 className={Style.faq_heading}>{post.faq.heading}</h2>
              <div className={Style.faq_list}>
                {post.faq.items.map((item, i) => (
                  <div
                    key={i}
                    className={`${Style.faq_item} ${activeFaq === i ? Style.faq_active : ""}`}
                  >
                    <button
                      className={Style.faq_trigger}
                      onClick={() => toggleFaq(i)}
                    >
                      <span className={Style.faq_icon}>
                        {activeFaq === i ? "−" : "+"}
                      </span>
                      {item.question}
                    </button>
                    <div className={`${Style.faq_body} ${activeFaq === i ? Style.faq_body_open : ""}`}>
                      <p>{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>

      {/* Related Blogs — full width below two-column layout */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <div className={Style.related_section}>
          <div className={Style.related_inner}>
            <h2 className={Style.related_heading}>Related blogs</h2>
            <div className={Style.related_grid}>
              {post.relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className={Style.related_card}
                >
                  <div className={Style.related_img}>
                    <Image
                      src={related.image}
                      alt={related.title}
                      width={480}
                      height={260}
                    />
                  </div>
                  <div className={Style.related_meta}>
                    <div className={Style.related_avatar} />
                    <div>
                      <span className={Style.related_author}>{related.author}</span>
                      <span className={Style.related_date}>{related.date}</span>
                    </div>
                  </div>
                  <h3 className={Style.related_title}>{related.title}</h3>
                  <p className={Style.related_excerpt}>{related.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default BlogDetailClient;
