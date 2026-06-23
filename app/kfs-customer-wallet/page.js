import KfsBizAppClient from "./KfsBizAppClient";
import { stagingRobots } from "../lib/metadata";

const site =
  typeof process.env.NEXT_PUBLIC_SITE_URL === "string"
    ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
    : "";

/** @type {import("next").Metadata} */
export const metadata = {
  title: "KFS Customer Wallet | Pay10",
  description:
    "Key Facts Statement for Pay10 Customer Wallet — limits, fees, security, support, and disclosures.",
  robots: stagingRobots,
  ...(site ? { alternates: { canonical: `${site}/kfs-customer-wallet` } } : {}),
};

export default function KfsBizAppPage() {
  return <KfsBizAppClient />;
}
