import FAQCustomerAppClient from "./FAQCustomerAppClient";
import { stagingRobots } from "../lib/metadata";

const site =
  typeof process.env.NEXT_PUBLIC_SITE_URL === "string"
    ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
    : "";

/** @type {import("next").Metadata} */
export const metadata = {
  title: "FAQ Customer App | Pay10",
  description:
    "FAQ for Pay10 Consumer Wallet — account setup, UAEPASS, security, wallet limits and fees, support, Open Banking & Al Tareq.",
  robots: stagingRobots,
  ...(site ? { alternates: { canonical: `${site}/faq-customer-app` } } : {}),
};

export default function FaqCustomerAppPage() {
  return <FAQCustomerAppClient />;
}
