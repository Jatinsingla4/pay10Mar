"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Icon, InlineIcon } from "@iconify/react";
import styles from "./press-release.module.scss";
import useApiAuth from "../../components/hooks/useApiAuth";
import PageLoader from "../../components/ui/PageLoader";

const FALLBACK_DETAILS = {
  "pay10-cbuae-license": {
    title: "Pay10 Receives Central Bank of UAE Licence for Payment Services",
    publishedAt: "2024-10-15",
    image: "/images/events_images/events_details_imgs/1.png",
    downloadUrl: "",
    content: [
      "Pay10 has been officially licensed by the Central Bank of the UAE (CBUAE) to operate as a licensed payment service provider, marking a landmark milestone in the company's journey to build a world-class digital payments ecosystem in the UAE.",
      "The CBUAE licence enables Pay10 to offer a comprehensive range of payment services including digital wallets, merchant payment processing, and cross-border remittances — bringing its platform fully in line with the UAE's robust regulatory framework.",
      "\"This licence is a testament to our commitment to compliance, security, and long-term trust,\" said the Pay10 leadership team. \"Being regulated by the Central Bank of the UAE gives our merchants and consumers the confidence to transact with us, knowing that their money and data are protected under the highest standards.\"",
      "Pay10 will use this licence as a foundation to expand its product offerings across the UAE, with plans to introduce new financial services for both consumers and businesses in the coming quarters.",
    ],
  },
  "pay10-cross-border-launch": {
    title: "Pay10 Launches Cross-Border Payment Solution for UAE Merchants",
    publishedAt: "2025-02-20",
    image: "/images/events_images/events_details_imgs/3.png",
    downloadUrl: "",
    content: [
      "Pay10 has officially launched its cross-border payment solution, enabling UAE-based merchants to accept international payments in multiple currencies with real-time conversion and highly competitive exchange rates.",
      "The new product supports over 30 currencies and integrates directly with Pay10's existing merchant dashboard, allowing businesses to start accepting global payments with minimal technical setup.",
      "The cross-border solution addresses a critical gap in the UAE payments market, where many SMEs have historically struggled with high FX fees and slow settlement times when dealing with international customers.",
      "Pay10's cross-border product features transparent pricing with no hidden fees, same-day settlement in AED for international transactions, and a robust fraud detection layer powered by AI.",
      "The launch is expected to open up significant new revenue streams for UAE merchants operating in e-commerce, tourism, and professional services sectors.",
    ],
  },
  "pay10-bank-partnership": {
    title: "Pay10 Partners with Leading UAE Banks to Expand Digital Wallet Network",
    publishedAt: "2025-04-08",
    image: "/images/events_images/events_details_imgs/5.png",
    downloadUrl: "",
    content: [
      "Pay10 has signed strategic partnership agreements with two of the UAE's leading commercial banks to integrate its digital wallet infrastructure, significantly expanding the financial access available to consumers and small businesses across the country.",
      "Under the agreements, bank customers will be able to link their existing bank accounts directly to the Pay10 digital wallet, enabling instant top-ups, peer-to-peer transfers, and merchant payments without leaving their preferred banking environment.",
      "\"This partnership represents a major step in our strategy to embed Pay10 into the everyday financial life of UAE residents,\" said the Pay10 team. \"By working with established banks, we can reach millions of customers and offer them the convenience of digital payments alongside the security and trust they already associate with their bank.\"",
      "The integration is expected to go live in phases beginning Q3 2025, with a full rollout to all customers of the partner banks by end of year.",
    ],
  },
  "pay10-growth-2024": {
    title: "Pay10 Reports 200% Growth in Transaction Volume for 2024",
    publishedAt: "2025-01-30",
    image: "/images/events_images/events_details_imgs/7.png",
    downloadUrl: "",
    content: [
      "Pay10 has announced record-breaking growth figures for 2024, processing over $500 million in total transaction volume — a 200% year-on-year increase — driven by strong adoption of its merchant and consumer payment platforms across the UAE.",
      "The company onboarded over 5,000 new merchants during the year, spanning sectors from retail and hospitality to healthcare and professional services. Consumer wallet activations grew by 180%, with daily active users increasing threefold compared to 2023.",
      "Key growth drivers included the launch of Pay10's QR-based instant payment product, the expansion of its merchant app to include inventory and analytics tools, and the introduction of instalment payment options at checkout.",
      "\"2024 was a breakout year for Pay10,\" said a company spokesperson. \"We proved that UAE businesses and consumers are ready to embrace a homegrown digital payments ecosystem — and we are just getting started. Our focus for 2025 is to continue expanding our product suite and enter new markets across the MENA region.\"",
      "Pay10 expects transaction volumes to grow by a further 150% in 2025, buoyed by its new CBUAE licence, cross-border payment capabilities, and upcoming banking partnerships.",
    ],
  },
};

function formatDate(dateInput) {
  const parsed = new Date(dateInput);
  if (Number.isNaN(parsed.getTime())) return "";
  const day = parsed.getDate();
  const month = parsed.toLocaleString("en-US", { month: "long" });
  const year = parsed.getFullYear();
  const suffix =
    day % 10 === 1 && day % 100 !== 11 ? "st"
    : day % 10 === 2 && day % 100 !== 12 ? "nd"
    : day % 10 === 3 && day % 100 !== 13 ? "rd"
    : "th";
  return `${day}${suffix} ${month}, ${year}`;
}

export default function PressReleaseDetailClient() {
  const params = useParams();
  const slug = params?.slug;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { makeApiCall } = useApiAuth();
  const imageBase = process.env.NEXT_PUBLIC_IMAGE_URL || "";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await makeApiCall(`/press-release/${slug}`);
        if (isMounted && result?.status) {
          setData(result);
        } else if (isMounted) {
          setData(null);
        }
      } catch {
        if (isMounted) setData(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    if (slug) fetchData();
    return () => { isMounted = false; };
  }, [slug, makeApiCall]);

  if (loading) return <PageLoader />;

  const fallback = slug && FALLBACK_DETAILS[slug];
  const apiPageData = data?.page_data;

  const title = apiPageData?.name || fallback?.title || "Press Release";
  const publishedAt = apiPageData?.post_date || fallback?.publishedAt || "";
  const imageRaw = apiPageData?.image || fallback?.image || null;
  const imageSrc = imageRaw
    ? (imageRaw.startsWith("/") ? imageRaw : `${imageBase}${imageRaw}`)
    : "/images/news_images/news_banner_img.png";
  const downloadUrl = apiPageData?.download
    ? `${imageBase}${apiPageData.download}`
    : fallback?.downloadUrl || "";
  const apiContent = apiPageData?.content || "";
  const fallbackParagraphs = fallback?.content || [];

  if (!apiPageData && !fallback) {
    return (
      <main className={styles.main}>
        <div className={styles.wrapper} style={{ textAlign: "center", padding: "80px 0" }}>
          <p>Press release not found.</p>
          <Link href="/news-room" className={styles.backLink}>
            <InlineIcon icon="qlementine-icons:chevron-left-16" width="20" height="20" />
            Back to News Room
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <Link href="/news-room" className={styles.backLink}>
        <InlineIcon icon="qlementine-icons:chevron-left-16" width="20" height="20" />
        Back to News Room
      </Link>

      <div className={styles.wrapper}>
        <div className={styles.heading}>
          <h1 data-animation="opacity-up">{title}</h1>
        </div>

        {publishedAt && (
          <div className={styles.meta}>
            <span className={styles.date}>{formatDate(publishedAt)}</span>
          </div>
        )}

        <div className={styles.bannerImage} data-animation="opacity-up">
          <Image
            src={imageSrc}
            alt={title}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 900px"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className={styles.content} data-animation="opacity-up">
          {apiContent ? (
            <div dangerouslySetInnerHTML={{ __html: apiContent }} />
          ) : (
            fallbackParagraphs.map((para, i) => <p key={i}>{para}</p>)
          )}
        </div>

        {downloadUrl && (
          <div className={styles.downloadWrap}>
            <a
              href={downloadUrl}
              className={styles.downloadButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon icon="hugeicons:download-04" />
              Download Press Release
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
