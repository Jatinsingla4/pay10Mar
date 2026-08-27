import React from "react";
import { fetchPageData, fetchPageMeta } from "../lib/fetchPageData";
import QrPaymentClient from "./QrPaymentClient";

export async function generateMetadata() {
  return fetchPageMeta('qr-payement', {
    title: "Paiement QR – Pay10",
    description: "Scannez. Payez. C'est réglé. Payez vos achats instantanément avec Pay10.",
    alternates: { canonical: "https://pay10.ma/qr-payement" },
  });
}

export default async function page() {
  const data = await fetchPageData('qr-payement');
  return <QrPaymentClient pageData={data} />;
}
