import FAQCustomerAppClient from "./FAQCustomerAppClient";

import { generateApiMetadata, stagingRobots } from "../lib/metadata";
import { fetchApiData } from "../lib/api";

const site =
  typeof process.env.NEXT_PUBLIC_SITE_URL === "string"
    ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
    : "";

/** @type {import("next").Metadata} */
const staticMeta = {
  title: "FAQ Customer App | Pay10",
  description:
    "FAQ for Pay10 Consumer Wallet — account setup, UAEPASS, security, wallet limits and fees, support, Open Banking & Al Tareq.",
  robots: stagingRobots,
  ...(site ? { alternates: { canonical: `${site}/faq-customer-app` } } : {}),
};

export async function generateMetadata() {
  try {
    const result = await fetchApiData("/page/faq-customer-app");
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

/** FAQ content from `/page/faq-customer-app` only (no bundled fallback). */
export default function FaqCustomerAppPage() {
  return <FAQCustomerAppClient />;
}
