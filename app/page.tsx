import { getLatestPosts } from "@/lib/firebaseAdmin";
import HomeClient from "./components/HomeClient";

export const revalidate = 3600;

export default async function Home() {
  let recentPosts: Awaited<ReturnType<typeof getLatestPosts>> = [];
  try {
    recentPosts = await getLatestPosts(4);
  } catch {
    recentPosts = [];
  }

  return <HomeClient recentPosts={recentPosts} />;
}
