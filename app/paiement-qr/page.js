import React from "react";
import { fetchPageData, fetchPageMeta } from "../lib/fetchPageData";
import QrPaymentClient from "./QrPaymentClient";

export async function generateMetadata() {
  return fetchPageMeta('paiement-qr', {
    title: "Paiement QR – Pay10",
    description: "Scannez. Payez. C'est réglé. Payez vos achats instantanément avec Pay10.",
    alternates: { canonical: "https://pay10.ma/paiement-qr" },
  });
}

export default async function page() {
  const data = await fetchPageData('paiement-qr');
  return <QrPaymentClient pageData={data} />;
}
