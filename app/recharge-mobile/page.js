import React from "react";
import { fetchPageData } from "../lib/fetchPageData";
import RechargeMobileClient from "./RechargeMobileClient";

export async function generateMetadata() {
  const data = await fetchPageData('recharge-mobile');
  if (data?.seo) {
    return {
      title: data.seo.title || "Recharge mobile | Pay10",
      description: data.seo.description || "Rechargez votre mobile. En quelques clics. Avec Pay10, rechargez instantanément votre crédit mobile directement depuis votre application.",
      alternates: { canonical: "https://pay10.ma/recharge-mobile" },
    };
  }
  return {
    title: "Recharge mobile | Pay10",
    description: "Rechargez votre mobile. En quelques clics. Avec Pay10, rechargez instantanément votre crédit mobile directement depuis votre application.",
    alternates: { canonical: "https://pay10.ma/recharge-mobile" },
  };
}

export default async function RechargeMobilePage() {
  const data = await fetchPageData('recharge-mobile');
  return <RechargeMobileClient pageData={data} />;
}
