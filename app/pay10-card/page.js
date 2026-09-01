import React from "react";
import { fetchPageData } from "../lib/fetchPageData";
import Pay10CardClient from "./Pay10CardClient";

export async function generateMetadata() {
  const data = await fetchPageData('pay10-card');
  if (data?.seo) {
    return {
      title: data.seo.title || "Alimentation du Wallet | Pay10",
      description: data.seo.description || "Alimentez votre Wallet numérique. Ajoutez de l'argent à votre portefeuille numérique Pay10 directement depuis votre compte bancaire.",
      alternates: { canonical: "https://pay10.ma/pay10-card" },
    };
  }
  return {
    title: "Alimentation du Wallet | Pay10",
    description: "Alimentez votre Wallet numérique. Ajoutez de l'argent à votre portefeuille numérique Pay10 directement depuis votre compte bancaire.",
    alternates: { canonical: "https://pay10.ma/pay10-card" },
  };
}

export default async function Pay10CardPage() {
  const data = await fetchPageData('pay10-card');
  return <Pay10CardClient pageData={data} />;
}
