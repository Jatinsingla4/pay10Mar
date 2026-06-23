import { stagingRobots } from "../../lib/metadata";
import BlogDetailClient from "./BlogDetailClient";

// Generate static metadata
export async function generateMetadata({ params }) {
  return { title: 'Blog | Pay10', robots: stagingRobots };
}

export default async function BlogDetail({ params }) {
  return (
    <>
      {/* Staging: JSON-LD off — uncomment for production */}
      <BlogDetailClient />
    </>
  );
}
