import KfsBizAppClient from "./KfsBizAppClient";
import { stagingRobots } from "../lib/metadata";

const site =
  typeof process.env.NEXT_PUBLIC_SITE_URL === "string"
    ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
    : "";

/** @type {import("next").Metadata} */
export const metadata = {
  title: "KFS Merchant App | Pay10",
  description:
    "Key Facts Statement for Pay10 Merchant App — UAE merchant payment acceptance, wallet limits, fees, security, support, and disclosures.",
  robots: stagingRobots,
  ...(site ? { alternates: { canonical: `${site}/kfs-biz-app` } } : {}),
};

export default function KfsBizAppPage() {
  return <KfsBizAppClient />;
}
