import React from "react";
import CookiePolicyClient from "./CookiePolicyClient";
import { fetchPageData } from "../lib/fetchPageData";

export const metadata = {
  title: "Cookie Policy – Pay 10",
  description: "Read the Cookie Policy of Pay10 to understand how we use cookies and similar technologies on our website.",
  alternates: {
    canonical: "https://pay10.ae/cookie-policy",
  },
};

export default async function CookiePolicyPage() {
  const pageData = await fetchPageData('cookie-policy');
  return <CookiePolicyClient pageData={pageData} />;
}
