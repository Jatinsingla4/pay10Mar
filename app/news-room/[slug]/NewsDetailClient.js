"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import Style from "./news-details.module.scss";
import { sanitizeHtml } from "../../lib/sanitizeHtml";

function formatDisplayDate(dateInput) {
  const parsed = new Date(dateInput);
  if (Number.isNaN(parsed.getTime())) return "DATE TBA";

  const day = parsed.getDate();
  const month = parsed.toLocaleString("en-US", { month: "long" }).toUpperCase();
  const year = parsed.getFullYear();

  const suffix =
    day % 10 === 1 && day % 100 !== 11 ? "ST"
    : day % 10 === 2 && day % 100 !== 12 ? "ND"
    : day % 10 === 3 && day % 100 !== 13 ? "RD"
    : "TH";

  return `${day}${suffix} ${month}, ${year}`;
}

const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, "").trim().slice(0, 140) + "...";
};

const NewsDetailClient = ({ initialData, otherNews = [] }) => {
  if (!initialData) {
    return (
      <main className={Style.newsDetailMain}>
        <div className={Style.notFound}>
          <p>News article not found.</p>
          <Link href="/news-room" className={Style.backBtn}>
            <Icon icon="fa6-solid:angle-left" />
            <span>Back to News Room</span>
          </Link>
        </div>
      </main>
    );
  }

  const { title, content, posted_date, image } = initialData;

  return (
    <main className={Style.newsDetailMain}>
      <div className={Style.hero}>
        <Link href="/news-room" className={Style.backBtn} data-animation="opacity-up">
          <Icon icon="fa6-solid:angle-left" />
          <span>Back to News Room</span>
        </Link>

        <span className={Style.pill} data-animation="opacity-up">PRESS RELEASE</span>

        <h1 className={Style.title} data-animation="opacity-up">{title}</h1>
        <p className={Style.date} data-animation="opacity-up">{formatDisplayDate(posted_date)}</p>
      </div>

      <div className={Style.wrapper}>
        <div className={Style.articleCard} data-animation="opacity-up">
          {image && (
            <div className={Style.detailMedia}>
              <img src={image} alt={title || "News Article"} className={Style.detailImage} />
            </div>
          )}

          <div
            className={Style.content}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(content || "") }}
          />

          <div className={Style.articleFooter}>
            <Link href="/news-room" className={Style.footerBackBtn}>
              <Icon icon="fa6-solid:angle-left" />
              <span>All Pay10 News</span>
            </Link>
          </div>
        </div>
      </div>

      <div className={Style.relatedSection}>
        <div className={Style.relatedWrapper}>
          <p className={Style.keepReading} data-animation="opacity-up">KEEP READING</p>
          <h2 className={Style.relatedHeading} data-animation="opacity-up">More Press Releases</h2>

          {otherNews.length > 0 && (
            <div className={Style.relatedGrid}>
              {otherNews.map((item) => (
                <div key={item.slug} className={Style.relatedCard} data-animation="opacity-up">
                  <p className={Style.relatedDate}>{formatDisplayDate(item.posted_date)}</p>
                  <h3>{item.title}</h3>
                  <p className={Style.relatedExcerpt}>{stripHtml(item.content)}</p>
                  <Link href={`/news-room/${item.slug}`} className={Style.readMoreBtn}>
                    <span>Read More</span>
                    <Icon icon="fa6-solid:angle-right" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default NewsDetailClient;
