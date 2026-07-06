import React from "react";
import BlogClient from "./BlogClient";
import { defaultMetadata } from "../lib/metadata";

export const metadata = {
  ...defaultMetadata,
  title: "Blog | Pay10",
  description: "Get the latest tips and guides on how to stay ahead in the world of digital payments",
};

async function getBlogs() {
  try {
    const res = await fetch("https://pay10d.grapesmobile.com/api/blogs", {
      next: { revalidate: 60 }
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data || [];
  } catch (error) {
    return [];
  }
}

export default async function Blog() {
  const blogs = await getBlogs();
  
  return <BlogClient initialBlogs={blogs} />;
}
