import KfsBizAppClient from "./KfsBizAppClient";

import { generateApiMetadata, stagingRobots } from "../lib/metadata";
import { fetchApiData } from "../lib/api";

const site =
  typeof process.env.NEXT_PUBLIC_SITE_URL === "string"
    ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
    : "";

/** @type {import("next").Metadata} */
const staticMeta = {
  title: "KFS Merchant App | Pay10",
  description:
    "Key Facts Statement for Pay10 Merchant App — UAE merchant payment acceptance, wallet limits, fees, security, support, and disclosures.",
  robots: stagingRobots,
  ...(site ? { alternates: { canonical: `${site}/kfs-biz-app` } } : {}),
};

export async function generateMetadata() {
  try {
    const result = await fetchApiData("/page/kfs-biz-app");
    if (result?.status && result.page_data && typeof result.page_data === "object") {
      return generateApiMetadata(
        /** @type {Parameters<typeof generateApiMetadata>[0]} */ (result.page_data)
      );
    }
  } catch (error) {
    console.error("KFS Merchant App metadata:", error);
  }
  return staticMeta;
}

/** Content from `/page/kfs-biz-app` only (no hardcoded body). */
export default function KfsBizAppPage() {
  return <KfsBizAppClient />;
}
