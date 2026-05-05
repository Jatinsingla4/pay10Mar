import FAQCustomerAppClient from "./FAQCustomerAppClient";

import { generateApiMetadata, stagingRobots } from "../lib/metadata";
import { fetchApiData } from "../lib/api";

const site =
  typeof process.env.NEXT_PUBLIC_SITE_URL === "string"
    ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
    : "";

/** @type {import("next").Metadata} */
const staticMeta = {
  title: "FAQ Merchant Bizz App | Pay10",
  description:
    "FAQ for Pay10 Biz App — merchant onboarding, UAEPASS, security, settlement, fees, support, and usage guidance.",
  robots: stagingRobots,
  ...(site ? { alternates: { canonical: `${site}/faq-merchant-bizz-app` } } : {}),
};

export async function generateMetadata() {
  try {
    const result = await fetchApiData("/page/faq-pay10-biz-app");
    if (result?.status && result.page_data && typeof result.page_data === "object") {
      return generateApiMetadata(
        /** @type {Parameters<typeof generateApiMetadata>[0]} */ (result.page_data)
      );
    }
  } catch (error) {
    console.error("FAQ page metadata:", error);
  }
  return staticMeta;
}

/** FAQ content from `/page/faq-pay10-biz-app` only (no bundled fallback). */
export default function FaqCustomerAppPage() {
  return <FAQCustomerAppClient />;
}
