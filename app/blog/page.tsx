import React from "react";
import { getAllPosts } from "@/lib/firebaseAdmin";
import BlogPageClient from "../components/BlogPageClient";

export const revalidate = 3600;

export default async function BlogPage() {
  try {
    const posts = await getAllPosts();
    return <BlogPageClient posts={posts} />;
  } catch (error) {
    console.error("Error loading posts:", error);
    return <BlogPageClient posts={[]} />;
  }
}
