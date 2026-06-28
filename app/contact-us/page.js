import { Suspense } from "react";
import { defaultMetadata } from "../lib/metadata";
import ContactClient from "./ContactClient";

async function getContactPageData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/pages/contact-us`, {
      headers: { 'X-Api-Key': process.env.NEXT_PUBLIC_AUTH_KEY },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return (data.status || data.success) ? (data.data ?? null) : null;
  } catch {
    return null;
  }
}

export async function generateMetadata() {
  const pageData = await getContactPageData();
  return {
    ...defaultMetadata,
    title: pageData?.seo?.title || "Contact Us | Pay 10",
    description: pageData?.seo?.description || defaultMetadata.description,
  };
}

export default async function Contact() {
  const pageData = await getContactPageData();
  return (
    <Suspense>
      <ContactClient pageData={pageData} />
    </Suspense>
  );
}
