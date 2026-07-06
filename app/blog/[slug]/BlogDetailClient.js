"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Style from "./blog-details.module.scss";
import { sanitizeHtml } from "../../lib/sanitizeHtml";


const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const resolveImageSrc = (path) => {
  if (!path) return null;
  const p = String(path).trim();
  if (p.startsWith('/')) return p;
  if (/^https?:\/\//i.test(p)) return p;
  return `/${p}`;
};

const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, '').substring(0, 150) + "...";
};

const BlogDetailClient = ({ initialData }) => {
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [initialData]);

  if (!initialData) {
    return (
      <main>
        <div style={{ textAlign: "center", padding: "100px 20px" }}>
          <p>Blog not found</p>
          <Link href="/blog" className={Style.sidebar_cta} style={{ display: 'inline-block', marginTop: '20px' }}>
            Back To Blogs
          </Link>
        </div>
      </main>
    );
  }

  const toggleFaq = (index) => {
    setActiveFaq((prev) => (prev === index ? null : index));
  };

  const title = initialData.title || "";
  const author = initialData.author || "Pay10";
  const date = formatDate(initialData.published_date);
  const heroImage = resolveImageSrc(initialData.website_banner);
  const summaryHtml = initialData.summary || "";
  const sections = initialData.contents || [];
  const faqs = initialData.faqs || [];
  const relatedBlogs = initialData.related_blogs || [];

  return (
    <main>
      {/* Hero Banner */}
      {heroImage && (
        <div className={Style.blog_hero} data-animation="opacity-up">
          <div className={Style.hero_image_full}>
            <img
              src={heroImage}
              alt={title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      )}

      {/* Two-column layout */}
      <div className={Style.blog_layout}>
        {/* Sticky Sidebar */}
        <aside className={Style.sidebar} data-animation="opacity-up" data-anim-delay="200">
          {sections.length > 0 && (
            <>
              <p className={Style.toc_heading}>Table of contents</p>
              <ul className={Style.toc_list}>
                {sections.map((sec, i) => (
                  <li key={i}>
                    <a href={`#section-${i}`}>{sec.key_heading}</a>
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className={Style.sidebar_cta}>
            <p>Ready to scale your global payments with Pay10?</p>
            <Link href="/contact">Get Started</Link>
          </div>
        </aside>

        {/* Main Article */}
        <article className={Style.article}>
          <h1 className={Style.article_title} data-animation="opacity-up">{title}</h1>

          <div className={Style.article_meta} data-animation="opacity-up" data-anim-delay="100">
            <div className={Style.author_avatar} />
            <div className={Style.author_info}>
              <strong>{author}</strong>
              <span>{date}</span>
            </div>
          </div>

          {/* Summary Box */}
          {summaryHtml && (
            <div className={Style.summary_box} data-animation="opacity-up" data-anim-delay="150">
              <h3>Summary</h3>
              <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(summaryHtml) }} />
            </div>
          )}

          {/* Sections */}
          {sections.map((section, i) => (
            <section key={i} id={`section-${i}`} className={Style.section}>
              <h2>{section.key_heading}</h2>
              {section.content && (
                <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(section.content) }} />
              )}
            </section>
          ))}

          {/* Stop Losing Revenue CTA */}
          <div className={Style.stop_losing}>
            <h2>Ready to transform your payments?</h2>
            <p>
              <Link href="/contact">Get Started with Pay10</Link>.{" "}
              <Link href="/payment-gateway">Explore the Pay10 Payment Gateway</Link>.
            </p>
          </div>

          {/* FAQ Accordion */}
          {faqs.length > 0 && (
            <div className={Style.faq_section}>
              <h2 className={Style.faq_heading}>Frequently Asked Questions</h2>
              <div className={Style.faq_list}>
                {faqs.map((item, i) => (
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

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <div className={Style.related_section}>
          <div className={Style.related_inner}>
            <h2 className={Style.related_heading} data-animation="opacity-up">Related blogs</h2>
            <div className={Style.related_grid}>
              {relatedBlogs.map((related, idx) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className={Style.related_card}
                  data-animation="opacity-up"
                  data-anim-delay={Math.min(idx * 150, 600)}
                >
                  <div className={Style.related_img}>
                    {resolveImageSrc(related.website_banner) && (
                      <img
                        src={resolveImageSrc(related.website_banner)}
                        alt={related.title}
                        style={{ width: "100%", height: "260px", objectFit: "cover" }}
                      />
                    )}
                  </div>
                  <div className={Style.related_meta}>
                    <div className={Style.related_avatar} />
                    <div>
                      <span className={Style.related_author}>{related.author || "Pay10"}</span>
                      <span className={Style.related_date}>{formatDate(related.published_date)}</span>
                    </div>
                  </div>
                  <h3 className={Style.related_title}>{related.title}</h3>
                  <p className={Style.related_excerpt}>{related.subtitle || stripHtml(related.summary)}</p>
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
