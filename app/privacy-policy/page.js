import React from "react";
import PrivacyClient from "./PrivacyClient";
import { fetchPageData } from "../lib/fetchPageData";

export const metadata = {
  title: "Privacy Policy \u2013 Pay 10",
  description: "Read the Privacy Policy of Pay10 to understand how we collect, use, protect, and handle your personal data.",
  alternates: {
    canonical: "https://pay10.ae/privacy-policy",
  },
};

export default async function PrivacyPolicyPage() {
  const pageData = await fetchPageData('privacy-policy');
  return <PrivacyClient pageData={pageData} />;
}
