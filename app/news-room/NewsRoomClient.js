"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import styles from "./news-room.module.scss";

const FALLBACK_IMAGE = "/images/news_images/news_banner_img.png";

const PRESS_RELEASES = [
  {
    id: "pay10-cbuae-license",
    title: "Pay10 Receives Central Bank of UAE Licence for Payment Services",
    description: "Pay10 has been officially licensed by the Central Bank of the UAE to operate as a payment service provider, marking a major milestone in the company's growth across the MENA region.",
    publishedAt: "2024-10-15",
    image: "/images/events_images/events_details_imgs/1.png",
    url: "https://pay10.ae",
  },
  {
    id: "pay10-cross-border-launch",
    title: "Pay10 Launches Cross-Border Payment Solution for UAE Merchants",
    description: "Pay10 has introduced its cross-border payment product, enabling UAE-based merchants to accept international payments in multiple currencies with real-time conversion and competitive exchange rates.",
    publishedAt: "2025-02-20",
    image: "/images/events_images/events_details_imgs/3.png",
    url: "https://pay10.ae",
  },
  {
    id: "pay10-bank-partnership",
    title: "Pay10 Partners with Leading UAE Banks to Expand Digital Wallet Network",
    description: "Pay10 has signed strategic partnership agreements with two of the UAE's largest commercial banks to integrate its digital wallet infrastructure, expanding financial access for consumers and SMEs.",
    publishedAt: "2025-04-08",
    image: "/images/events_images/events_details_imgs/5.png",
    url: "https://pay10.ae",
  },
  {
    id: "pay10-growth-2024",
    title: "Pay10 Reports 200% Growth in Transaction Volume for 2024",
    description: "Pay10 announced record-breaking growth in 2024, processing over $500 million in total transaction volume — a 200% year-on-year increase — driven by strong adoption of its merchant and consumer payment platforms.",
    publishedAt: "2025-01-30",
    image: "/images/events_images/events_details_imgs/7.png",
    url: "https://pay10.ae",
  },
];

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

export default function NewsRoomClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim().toLowerCase());
    }, 350);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const items = debouncedSearch
    ? PRESS_RELEASES.filter(
        (item) =>
          item.title.toLowerCase().includes(debouncedSearch) ||
          item.description.toLowerCase().includes(debouncedSearch)
      )
    : PRESS_RELEASES;

  return (
    <main className={styles.newsRoomMain}>
      <section className={styles.bannerSection}>
        <div className={styles.bannerOverlay} />
        <div className={styles.bannerContent}>
          <h1>Press Releases</h1>
          <p>Stay informed with the latest news, strategic announcements, and media updates directly from the Pay10 ecosystem.</p>
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
              placeholder="Search press releases, news, and announcements..."
              aria-label="Search press releases"
            />
          </label>
        </div>

        <div className={styles.cardsGrid}>
          {items.length === 0 ? (
            <div className={styles.emptyState}>No press releases found.</div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className={styles.newsCard}
                data-animation="opacity-up"
              >
                <div className={styles.cardMedia}>
                  <Image
                    src={item.image || FALLBACK_IMAGE}
                    alt={item.title}
                    width={640}
                    height={360}
                    className={styles.cardImage}
                    unoptimized={item.image?.startsWith("http")}
                  />
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.cardDate}>{formatDisplayDate(item.publishedAt)}</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className={styles.cardFooter}>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.readMoreBtn}
                      >
                        <span>Read More</span>
                        <Icon icon="fa6-solid:angle-right" />
                      </a>
                    )}
                    <div className={styles.shareRow}>
                      <span>Share:</span>
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(item.url || 'https://www.pay10.ae/news-room')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.shareBtn}
                        aria-label="Share on LinkedIn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Icon icon="mdi:linkedin" />
                      </a>
                      <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(item.url || 'https://www.pay10.ae/news-room')}&text=${encodeURIComponent(item.title)}`}
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
