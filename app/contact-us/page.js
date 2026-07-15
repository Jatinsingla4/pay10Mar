import { Suspense } from "react";
import { defaultMetadata } from "../lib/metadata";
import { fetchPageData } from "../lib/fetchPageData";
import ContactClient from "./ContactClient";

export async function generateMetadata() {
  const data = await fetchPageData('contact-us');
  if (data?.seo) {
    return {
      ...defaultMetadata,
      title: data.seo.title || "Contact Us | Pay10",
      description: data.seo.description || defaultMetadata.description,
    };
  }
  return { ...defaultMetadata, title: "Contact Us | Pay10" };
}

export default async function Contact() {
  const data = await fetchPageData('contact-us');
  return (
    <Suspense>
      <ContactClient pageData={data} />
    </Suspense>
  );
}
