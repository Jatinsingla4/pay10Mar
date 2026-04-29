import NewsRoomClient from "./NewsRoomClient";
import GetStarted from '../../app/components/ui/GetStarted';
import { notFound } from "next/navigation";

export const metadata = {
  title: "News Room | Pay10",
  description:
    "Explore Pay10 press releases, strategic announcements, and media updates from the Pay10 ecosystem.",
};

export default function page() {
  const isNewsRoomEnabled =
    process.env.NODE_ENV !== "production" ||
    process.env.NEXT_PUBLIC_ENABLE_NEWS_ROOM === "true";

  if (!isNewsRoomEnabled) {
    notFound();
  }

  return (
    <>
    <NewsRoomClient />
    <GetStarted/>
    </>
  )
}
