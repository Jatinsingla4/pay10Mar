import React from "react";
import { fetchPageData } from "../lib/fetchPageData";
import SendAbroadClient from "./SendAbroadClient";

export async function generateMetadata() {
  const data = await fetchPageData('transfert-argent');
  if (data?.seo) {
    return {
      title: data.seo.title || "Transfert d'argent | Pay10",
      description: data.seo.description || "Envoyez de l'argent. Simplement. Instantanément. Avec Pay10, envoyez et recevez de l'argent en quelques clics.",
      alternates: { canonical: "https://pay10.ma/transfert-argent" },
    };
  }
  return {
    title: "Transfert d'argent | Pay10",
    description: "Envoyez de l'argent. Simplement. Instantanément. Avec Pay10, envoyez et recevez de l'argent en quelques clics.",
    alternates: { canonical: "https://pay10.ma/transfert-argent" },
  };
}

export default async function SendAbroadPage() {
  const data = await fetchPageData('transfert-argent');
  return <SendAbroadClient pageData={data} />;
}
