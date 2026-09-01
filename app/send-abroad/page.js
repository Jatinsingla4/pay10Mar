import React from "react";
import { fetchPageData } from "../lib/fetchPageData";
import SendAbroadClient from "./SendAbroadClient";

export async function generateMetadata() {
  const data = await fetchPageData('send-abroad');
  if (data?.seo) {
    return {
      title: data.seo.title || "Transfert d'argent | Pay10",
      description: data.seo.description || "Envoyez de l'argent. Simplement. Instantanément. Avec Pay10, envoyez et recevez de l'argent en quelques clics.",
      alternates: { canonical: "https://pay10.ma/send-abroad" },
    };
  }
  return {
    title: "Transfert d'argent | Pay10",
    description: "Envoyez de l'argent. Simplement. Instantanément. Avec Pay10, envoyez et recevez de l'argent en quelques clics.",
    alternates: { canonical: "https://pay10.ma/send-abroad" },
  };
}

export default async function SendAbroadPage() {
  const data = await fetchPageData('send-abroad');
  return <SendAbroadClient pageData={data} />;
}
