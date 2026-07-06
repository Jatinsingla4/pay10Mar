import React from "react";
import EventsClient from "./EventsClient";

export const metadata = {
  title: "Events | Pay10",
  description: "Discover the events and conferences where Pay10 connects, innovates, and leads the future of digital payments.",
};

async function getEvents() {
  try {
    const res = await fetch("https://pay10d.grapesmobile.com/api/events", {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    
    if (!res.ok) {
      console.error("Failed to fetch events:", res.statusText);
      return [];
    }

    const json = await res.json();
    return json?.data || [];
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

export default async function EventsPage() {
  const events = await getEvents();
  
  return <EventsClient initialEvents={events} />;
}
