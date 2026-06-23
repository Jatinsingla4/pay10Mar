import { defaultMetadata } from "../../lib/metadata";
import EventDetailClient from "./EventDetailClient";

// Generate static metadata
export async function generateMetadata({ params }) {
  return {
    ...defaultMetadata,
    title: "Event | Pay10",
  };
}

export default async function EventDetail({ params }) {
  return (
    <>
      {/* Staging: JSON-LD off — uncomment for production */}
      <EventDetailClient />
    </>
  );
}
