import NewsRoomClient from "./NewsRoomClient";
import GetStarted from '../../app/components/ui/GetStarted';

export const metadata = {
  title: "News Room | Pay10",
  description:
    "Explore Pay10 press releases, strategic announcements, and media updates from the Pay10 ecosystem.",
};

export default function page() {
  return (
    <>
    <NewsRoomClient />
    <GetStarted/>
    </>
  )
}
