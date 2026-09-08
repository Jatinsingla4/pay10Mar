import React from "react";
import { fetchPageData, fetchPageMeta } from "../lib/fetchPageData";
import OpenFinanceAltareqClient from "./OpenFinanceAltareqClient";

export async function generateMetadata() {
  return fetchPageMeta('transfer-dargent-international', {
    title: "Transfert d'argent International | Pay10",
    description: "Transf\u00e9rez votre argent vers votre compte bancaire. Simplement. Transf\u00e9rez rapidement et facilement des fonds depuis votre portefeuille num\u00e9rique Pay10 vers un compte bancaire.",
    alternates: { canonical: "https://pay10.ma/transfer-dargent-international" },
  });
}

export default async function page() {
  const data = await fetchPageData('transfer-dargent-international');
  return <OpenFinanceAltareqClient pageData={data} />;
}
