"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import styles from "./news-room.module.scss";
import PageLoader from "../components/ui/PageLoader";

const FALLBACK_IMAGE = "/images/news-banner1.jpg";
const SEARCH_DEBOUNCE_MS = 350;

function sanitizeText(value, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

function formatDisplayDate(dateInput) {
  const parsed = new Date(dateInput);
  if (Number.isNaN(parsed.getTime())) return "DATE TBA";

  const day = parsed.getDate();
  const month = parsed.toLocaleString("en-US", { month: "long" }).toUpperCase();
  const year = parsed.getFullYear();

  const suffix =
    day % 10 === 1 && day % 100 !== 11
      ? "ST"
      : day % 10 === 2 && day % 100 !== 12
      ? "ND"
      : day % 10 === 3 && day % 100 !== 13
      ? "RD"
      : "TH";

  return `${day}${suffix} ${month}, ${year}`;
}

function buildAbsoluteUrl(baseUrl, path) {
  const trimmedPath = sanitizeText(path);
  if (!trimmedPath) return "";
  if (/^https?:\/\//i.test(trimmedPath)) return trimmedPath;

  const normalizedBase = sanitizeText(baseUrl).replace(/\/+$/, "");
  const normalizedPath = trimmedPath.replace(/^\/+/, "");

  if (!normalizedBase) {
    return `/${normalizedPath}`;
  }

  return `${normalizedBase}/${normalizedPath}`;
}

function mapPostListing(items, imageBaseUrl) {
  if (!Array.isArray(items)) return [];

  return items.map((item, index) => {
    const title = sanitizeText(item?.name, "Press Release");

    return {
      id: `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${index}`,
      title,
      description: sanitizeText(
        item?.short_description,
        "No description available."
      ),
      publishedAt: item?.post_date || "",
      image: buildAbsoluteUrl(imageBaseUrl, item?.image) || FALLBACK_IMAGE,
      downloadUrl: buildAbsoluteUrl(imageBaseUrl, item?.download),
    };
  });
}

export default function NewsRoomClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [pageData, setPageData] = useState(null);
  const [pressReleases, setPressReleases] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const requestIdRef = useRef(0);
  const isFirstDebounceRun = useRef(true);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API || "";
  const apiKey = process.env.NEXT_PUBLIC_AUTH_KEY || "";
  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "";

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchPressReleases = async ({
    page = 1,
    keyword = "",
    append = false,
    withInitialLoader = false,
  } = {}) => {
    const callId = Date.now();
    requestIdRef.current = callId;

    if (withInitialLoader) {
      setInitialLoading(true);
    } else if (append) {
      setLoadingMore(true);
    } else {
      setSearchLoading(true);
    }

    setErrorMessage("");

    try {
      const normalizedBase = sanitizeText(apiBaseUrl).replace(/\/+$/, "");
      if (!normalizedBase) {
        throw new Error("Missing NEXT_PUBLIC_API value.");
      }

      const query = new URLSearchParams({ page: String(page) });
      const searchKey = sanitizeText(keyword);
      if (searchKey) {
        query.set("search_key", searchKey);
      }

      const endpoint = `${normalizedBase}/press-releases?${query.toString()}`;
      const response = await fetch(endpoint, {
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`Request failed with ${response.status}`);
      }

      const result = await response.json();
      if (!result?.status) {
        throw new Error("Press releases API returned status false.");
      }

      if (requestIdRef.current !== callId) return;

      const mappedPosts = mapPostListing(result?.post_listing, imageBaseUrl);
      const nextTotalPages = Number(result?.pagination?.total_pages) || 1;
      const nextCurrentPage = Number(result?.pagination?.current_page) || page;

      setPageData(result?.page_data || {});
      setCurrentPage(nextCurrentPage);
      setTotalPages(nextTotalPages);
      setPressReleases((prev) =>
        append ? [...prev, ...mappedPosts] : mappedPosts
      );
    } catch (error) {
      if (requestIdRef.current !== callId) return;
      setErrorMessage(
        error?.message || "Unable to fetch press releases right now."
      );
      if (!append) {
        setPressReleases([]);
      }
    } finally {
      if (requestIdRef.current !== callId) return;
      setInitialLoading(false);
      setLoadingMore(false);
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    if (isFirstDebounceRun.current) {
      isFirstDebounceRun.current = false;
      return;
    }

    fetchPressReleases({ page: 1, keyword: debouncedSearch, append: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  useEffect(() => {
    fetchPressReleases({ page: 1, keyword: "", append: false, withInitialLoader: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLoadMore = () => {
    if (loadingMore || searchLoading || initialLoading) return;
    if (currentPage >= totalPages) return;

    fetchPressReleases({
      page: currentPage + 1,
      keyword: debouncedSearch,
      append: true,
    });
  };

  const canLoadMore = useMemo(
    () => !errorMessage && pressReleases.length > 0 && currentPage < totalPages,
    [errorMessage, pressReleases.length, currentPage, totalPages]
  );
  const topSubHeading = sanitizeText(pageData?.top_sub_heading, "MEDIA & RESOURCES");
  const topHeading = sanitizeText(pageData?.top_heading, "Press Releases");
  const topDescription = sanitizeText(
    pageData?.top_description,
    "Stay informed with the latest news, strategic announcements, and media updates directly from the Pay10 ecosystem."
  ).replace(/\r?\n/g, " ");

  if (initialLoading) {
    return <PageLoader />;
  }

  return (
    <main className={styles.newsRoomMain}>
      <section className={styles.bannerSection}>
        <div className={styles.bannerOverlay} />
        <div className={styles.bannerContent}>
          <h5>{topSubHeading}</h5>
          <h1>{topHeading}</h1>
          <p>{topDescription}</p>
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
              onChange={handleSearchChange}
              placeholder="Search press releases, news, and announcements..."
              aria-label="Search press releases"
            />
          </label>
        </div>

        <div className={styles.cardsGrid}>
          {errorMessage ? (
            <div className={styles.emptyState}>{errorMessage}</div>
          ) : pressReleases.length === 0 ? (
            <div className={styles.emptyState}>
              No press releases found for this search.
            </div>
          ) : (
            pressReleases.map((item) => (
              <article key={item.id} className={styles.newsCard} data-animation="opacity-up">
                <div className={styles.cardMedia}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={640}
                    height={360}
                    className={styles.cardImage}
                    unoptimized={item.image.startsWith("http")}
                  />
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.cardDate}>{formatDisplayDate(item.publishedAt)}</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>

                  <a
                    href={item.downloadUrl || "#"}
                    className={styles.downloadButton}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Download press release: ${item.title}`}
                  >
                    <Icon icon="hugeicons:download-04" />
                    Download
                  </a>
                </div>
              </article>
            ))
          )}
        </div>

        {canLoadMore && (
          <div className={styles.loadMoreWrap} data-animation="scale-up">
            <button
              type="button"
              className={styles.loadMoreBtn}
              onClick={handleLoadMore}
              disabled={loadingMore || searchLoading}
            >
              {loadingMore ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
