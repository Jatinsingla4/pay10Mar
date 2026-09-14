"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import Style from "./news-details.module.scss";
import { sanitizeHtml } from "../../lib/sanitizeHtml";

function formatDisplayDate(dateInput) {
  const parsed = new Date(dateInput);
  if (Number.isNaN(parsed.getTime())) return "DATE À CONFIRMER";

  const day = parsed.getDate();
  const month = parsed.toLocaleString("fr-FR", { month: "long" }).toUpperCase();
  const year = parsed.getFullYear();

  // French only marks an ordinal on the 1st ("1er") - every other day is bare.
  const dayLabel = day === 1 ? "1ER" : `${day}`;

  return `${dayLabel} ${month}, ${year}`;
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
          <p>Article introuvable.</p>
          <Link href="/news-room" className={Style.backBtn}>
            <Icon icon="fa6-solid:angle-left" />
            <span>Retour aux actualités</span>
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
          <span>Retour aux actualités</span>
        </Link>

        <span className={Style.pill} data-animation="opacity-up">COMMUNIQUÉ DE PRESSE</span>

        <h1 className={Style.title} data-animation="opacity-up">{title}</h1>
        <p className={Style.date} data-animation="opacity-up">{formatDisplayDate(posted_date)}</p>
      </div>

      <div className={Style.wrapper}>
        <div className={Style.articleCard} data-animation="opacity-up">
          {image && (
            <div className={Style.detailMedia}>
              <img src={image} alt={title || "Actualité Pay10"} className={Style.detailImage} />
            </div>
          )}

          <div
            className={Style.content}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(content || "") }}
          />

          <div className={Style.articleFooter}>
            <Link href="/news-room" className={Style.footerBackBtn}>
              <Icon icon="fa6-solid:angle-left" />
              <span>Toutes les actualités Pay10</span>
            </Link>
          </div>
        </div>
      </div>

      <div className={Style.relatedSection}>
        <div className={Style.relatedWrapper}>
          <p className={Style.keepReading} data-animation="opacity-up">À LIRE AUSSI</p>
          <h2 className={Style.relatedHeading} data-animation="opacity-up">Plus de communiqués de presse</h2>

          {otherNews.length > 0 && (
            <div className={Style.relatedGrid}>
              {otherNews.map((item) => (
                <div key={item.slug} className={Style.relatedCard} data-animation="opacity-up">
                  <p className={Style.relatedDate}>{formatDisplayDate(item.posted_date)}</p>
                  <h3>{item.title}</h3>
                  <p className={Style.relatedExcerpt}>{stripHtml(item.content)}</p>
                  <Link href={`/news-room/${item.slug}`} className={Style.readMoreBtn}>
                    <span>Lire la suite</span>
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
