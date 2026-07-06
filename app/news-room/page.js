import NewsRoomClient from "./NewsRoomClient";

export const metadata = {
  title: "News Room | Pay10",
  description:
    "Explore Pay10 press releases, strategic announcements, and media updates from the Pay10 ecosystem.",
};

async function getNews() {
  try {
    const res = await fetch("https://pay10d.grapesmobile.com/api/news", {
      next: { revalidate: 60 },
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    if (data.success && data.data) {
      return data.data;
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch news:", error);
    return [];
  }
}

export default async function page() {
  const newsList = await getNews();

  return (
    <>
      <NewsRoomClient initialNews={newsList} />
    </>
  );
}
