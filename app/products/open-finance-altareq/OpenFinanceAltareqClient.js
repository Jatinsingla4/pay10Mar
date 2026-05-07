"use client";

import { useState, useEffect } from "react";
import MapHeroBanner from "@/app/components/ui/product/MapHeroBanner";
import SimpleLayout from "@/app/components/ui/product/pacb-india/SimpleLayout";
import TwoColLayout from "@/app/components/ui/product/pacb-india/TwoColLayout";
import GetStarted from "@/app/components/ui/GetStarted";
import useApiAuth from "@/app/components/hooks/useApiAuth";
import PageLoader from "@/app/components/ui/PageLoader";
import { TextCenterAppCard } from "@/app/components/ui/TextCenterBlock";
import { cmsImageSrc } from "@/app/lib/cmsImageSrc";
import Style from "./page.module.scss";

/** Intro band below hero (hardcoded until CMS). */
const ALTAREQ_CONNECTED_INTRO = {
  Title: "The future of finance is connected",
  Image: "/images/temp/Al-Tareq-Logo.png",
  Description: `
<p>AlTareq is now live in your Pay10 App, giving you seamless, secure access to your bank account, add money, and pay directly from your bank account.</p>
<p>AlTareq is the UAE's national Open Finance gateway launched by the Central Bank of the UAE to securely connect licensed financial institutions, and third-party providers.</p>
`.trim(),
};

/** Hardcoded until CMS `custom_data.section2.list` is wired (Title, Image, Description; optional ImageOnLeft overrides row alternation). */
/** Matches design: English link + Arabic FAQ line accent (see .altareqArabicFaqLink). */
const ALTAREQ_LINK_COLOR = "#b03050";
const ALTAREQ_LINK_STYLE = `color:${ALTAREQ_LINK_COLOR};font-weight:600;text-decoration:none;`;

const OPEN_FINANCE_ALTAREQ_SIMPLE_ROWS = [
  {
    Title: "",
    Image: "/images/temp/a1.png",
    Description: `
<p>Pay10 enabled AlTareq, to safely and securely make payments from your bank account for purchases, top-ups, or sending money to contacts giving you frictionless access to a world of services and insights.</p>
<p>AlTareq and Pay10 bring innovative ways to access and use financial services in the UAE:</p>
<ul>
<li>Connect your bank accounts with your Pay10 Wallet.</li>
<li>Make payments faster than ever before.</li>
<li>Experience real-time, secure connections with Pay10 for streamlined and personalized services.</li>
<li>Track and monitor all linked accounts and transactions conveniently within your Pay10 Wallet.</li>
</ul>
`.trim(),
  },
  {
    Title: "Real-time visibility",
    Image: "/images/temp/a2.png",
    Description:
      "<p>Track and monitor your purchases, top ups and money movements in real-time from your Pay10 Wallet.</p>",
  },
  {
    Title: "A New Era in Payments by AlTareq",
    Image: "/images/temp/a3.png",
    Description: `
<p>Enjoy paying with your bank account at online checkout on your own rules and terms.</p>
<p>No more entering card details or credentials. Securely authorize each transaction through your banking app with AlTareq and Pay10.</p>
`.trim(),
  },
  {
    Title: "You're in control, always",
    Image: "/images/temp/a4.png",
    Description: `
<p>Set your payment limits, frequency, and the duration of your account permission with full transparency.<br />Your account. Your control. Manage all your accounts in one app, download Pay10 now.</p>
`.trim(),
  },
  {
    Title: "Secure by design",
    Image: "/images/temp/a5.png",
    Description:
      "<p>Regulated by the Central Bank of the UAE, your data and financial services are protected with world-class encryption.</p>",
  },

  {
    Title: "Start accepting account-to-account payments for your business.",
    Image: "/images/temp/a6.png",
    Description: `
<p>AlTareq and Pay10's Merchant Payment Acceptance Solution enables you to offer a new real-time payment method in the UAE.</p>
<p>Your customers can pay instantly and securely using their bank accounts powered by AlTareq.</p>
<p>For More Information: <a href="https://pay10.ae/wp-content/uploads/2026/04/Nebras-Open-Finance-FAQs-English.pdf" target="_blank" style="${ALTAREQ_LINK_STYLE}">Nebras Open Finance FAQ</a></p>
<p dir="rtl" lang="ar" class="altareqArabicFaqNote">
  <span class="altareqArabicFaqGray">للمزيد من المعلومات</span><br />
  <a class="altareqArabicFaqLink" href="https://pay10.ae/wp-content/uploads/2026/04/Nebras-Open-Finance-FAQs-Arabic.pdf" target="_blank" style="${ALTAREQ_LINK_STYLE}">الأسئلة الشائعة حول التمويل المفتوح من نبراس</a>
</p>
`.trim(),
  },
];

const OpenFinanceAltareqClient = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { makeApiCall } = useApiAuth();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await makeApiCall("/page/product-open-finance-altareq");

        if (!isMounted) return;

        if (result?.status) {
          setPageData(result);
        } else {
          setPageData(null);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching data:", error);
          setPageData(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [makeApiCall]);

  const pageDataObj = pageData?.page_data || {};
  const imageBase = process.env.NEXT_PUBLIC_IMAGE_URL || "";

  const heroCmsSrc = pageDataObj.image ? cmsImageSrc(pageDataObj.image, imageBase) : null;
  const heroImage = {
    src: heroCmsSrc || "/images/pay10_ae_mobile.png",
    alt: pageDataObj.name ? `${pageDataObj.name} hero` : "Open Finance Altareq",
    width: pageDataObj.image_width || 360,
    height: pageDataObj.image_height || 640,
  };

  const simpleLayoutItems = OPEN_FINANCE_ALTAREQ_SIMPLE_ROWS;

  if (loading && !pageData) {
    return <PageLoader />;
  }

  return (
    <main>
      {/* <div className={Style.heroShell}> */}
        <MapHeroBanner
          eyebrow={pageDataObj.top_sub_heading || ""}
          title={pageDataObj.top_heading || "Real-time Payments via AlTareq"}
          description={
            pageDataObj.top_description ||
            "Discover new ways to access financial services in your Pay10 App with AlTareq, the UAE’s open finance initiative."
          }
          heroImage={heroImage}
          mapImageSrc="/images/temp/adf.png"
          ctaText=""
          ctaHref="/products/consumer-app"
        />
      {/* </div> */}

      <section className={Style.connected_finance_intro}>
        <TwoColLayout item={ALTAREQ_CONNECTED_INTRO} imageBase={imageBase} reverse />
      </section>

      <div className={Style.section_spacing}>
        <SimpleLayout
          items={simpleLayoutItems}
          imageBase={imageBase}
          startWithImageLeft={true}
          useBackgroundCircle={true}
        />
      </div>

      <TextCenterAppCard />

      <GetStarted />
    </main>
  );
};

export default OpenFinanceAltareqClient;
