import FAQMerchantBizzAppClient from "./FAQMerchantBizzAppClient";
import { stagingRobots } from "../lib/metadata";

const site =
  typeof process.env.NEXT_PUBLIC_SITE_URL === "string"
    ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
    : "";

/** @type {import("next").Metadata} */
export const metadata = {
  title: "FAQ Merchant App | Pay10",
  description:
    "FAQ for Pay10 Merchant App — merchant onboarding, UAEPASS, security, settlement, fees, support, and usage guidance.",
  robots: stagingRobots,
  ...(site ? { alternates: { canonical: `${site}/faq-merchant-bizz-app` } } : {}),
};

export default function FaqMerchantBizzAppPage() {
  return <FAQMerchantBizzAppClient />;
}
