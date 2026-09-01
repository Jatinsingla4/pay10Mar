import React from "react";
import { fetchPageData } from "../lib/fetchPageData";
import BillPaymentClient from "./BillPaymentClient";

export async function generateMetadata() {
  const data = await fetchPageData('bill-payment');
  if (data?.seo) {
    return {
      title: data.seo.title || "Paiement de factures | Pay10",
      description: data.seo.description || "Toutes vos factures, simplement depuis Pay10. Retrouvez vos services essentiels au même endroit et gardez le contrôle de vos paiements.",
      alternates: { canonical: "https://pay10.ma/bill-payment" },
    };
  }
  return {
    title: "Paiement de factures | Pay10",
    description: "Toutes vos factures, simplement depuis Pay10. Retrouvez vos services essentiels au même endroit et gardez le contrôle de vos paiements.",
    alternates: { canonical: "https://pay10.ma/bill-payment" },
  };
}

export default async function BillPaymentPage() {
  const data = await fetchPageData('bill-payment');
  return <BillPaymentClient pageData={data} />;
}
