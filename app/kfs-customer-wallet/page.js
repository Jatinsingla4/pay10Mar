import KfsBizAppClient from "./KfsBizAppClient";

import { generateApiMetadata, stagingRobots } from "../lib/metadata";
import { fetchApiData } from "../lib/api";

const site =
  typeof process.env.NEXT_PUBLIC_SITE_URL === "string"
    ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
    : "";

/** @type {import("next").Metadata} */
const staticMeta = {
  title: "KFS Customer Wallet | Pay10",
  description:
    "Key Facts Statement for Pay10 Customer Wallet — limits, fees, security, support, and disclosures.",
  robots: stagingRobots,
  ...(site ? { alternates: { canonical: `${site}/kfs-customer-wallet` } } : {}),
};

export async function generateMetadata() {
  try {
    const result = await fetchApiData("/page/kfs-customer-wallet");
    if (result?.status && result.page_data && typeof result.page_data === "object") {
      return generateApiMetadata(
        /** @type {Parameters<typeof generateApiMetadata>[0]} */ (result.page_data)
      );
    }
  } catch (error) {
    console.error("KFS Customer Wallet metadata:", error);
  }
  return staticMeta;
}

/** Content from `/page/kfs-customer-wallet` only (no hardcoded body). */
export default function KfsBizAppPage() {
  return <KfsBizAppClient />;
}
