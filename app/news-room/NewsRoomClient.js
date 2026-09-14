"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import styles from "./news-room.module.scss";
import { sanitizeHtml } from "../lib/sanitizeHtml";

const FALLBACK_IMAGE = "/images/news_images/news_banner_img.png";

// Dynamic news list passed from server component

function formatDisplayDate(dateInput) {
  const parsed = new Date(dateInput);
  if (Number.isNaN(parsed.getTime())) return "Date à venir";

  const day = parsed.getDate();
  // French ordinals only mark the 1st ("1er") - every other day is plain.
  const dayText = day === 1 ? "1er" : `${day}`;
  const month = parsed.toLocaleString("fr-FR", { month: "long" });
  const year = parsed.getFullYear();

  return `${dayText} ${month} ${year}`;
}

export default function NewsRoomClient({ initialNews = [], pageData = null }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim().toLowerCase());
    }, 350);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const items = debouncedSearch
    ? initialNews.filter(
        (item) =>
          item.title?.toLowerCase().includes(debouncedSearch) ||
          item.content?.toLowerCase().includes(debouncedSearch)
      )
    : initialNews;

  return (
    <main className={styles.newsRoomMain}>
      <section 
        className={styles.bannerSection}
        style={{
          ...(pageData?.banner_image ? { '--bg-desktop': `url(${pageData.banner_image})` } : {}),
          ...(pageData?.mobile_image ? { '--bg-mobile': `url(${pageData.mobile_image})` } : (pageData?.banner_image ? { '--bg-mobile': `url(${pageData.banner_image})` } : {})),
        }}
      >
        <div className={styles.bannerOverlay} />
        <div className={styles.bannerContent}>
          <h1 dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData?.page_title) }} />
          <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData?.page_subtitle) }} />
        </div>
      </section>

      <section className={styles.wrapper}>
        <div className={styles.searchRow} data-animation="scale-up">
          <label htmlFor="news-room-search" className={styles.searchField}>
            <Icon icon="mdi:magnify" aria-hidden="true" />
            <input
              id="news-room-search"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher des communiqués de presse, actualités et annonces..."
              aria-label="Rechercher des communiqués de presse"
            />
          </label>
        </div>

        <div className={styles.cardsGrid}>
          {items.length === 0 ? (
            <div className={styles.emptyState}>Aucun communiqué de presse trouvé.</div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className={styles.newsCard}
                data-animation="opacity-up"
              >
                <div className={styles.cardMedia}>
                  <img
                    src={item.image || FALLBACK_IMAGE}
                    alt={item.title || "Actualité Pay10"}
                    className={styles.cardImage}
                  />
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.cardDate}>{formatDisplayDate(item.posted_date)}</p>
                  <h3>{item.title}</h3>
                  <div 
                    className={styles.cardDesc} 
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.content) }}
                  />
                  <div className={styles.cardFooter}>
                    {item.slug && (
                      <Link
                        href={`/news-room/${item.slug}`}
                        className={styles.readMoreBtn}
                      >
                        <span>Lire</span>
                        <Icon icon="fa6-solid:angle-right" />
                      </Link>
                    )}
                    <div className={styles.shareRow}>
                      <span>Partager:</span>
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(item.slug ? `https://www.pay10.ae/news-room/${item.slug}` : 'https://www.pay10.ae/news-room')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.shareBtn}
                        aria-label="Share on LinkedIn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Icon icon="mdi:linkedin" />
                      </a>
                      <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(item.slug ? `https://www.pay10.ae/news-room/${item.slug}` : 'https://www.pay10.ae/news-room')}&text=${encodeURIComponent(item.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.shareBtn}
                        aria-label="Share on X"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Icon icon="ri:twitter-x-fill" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
