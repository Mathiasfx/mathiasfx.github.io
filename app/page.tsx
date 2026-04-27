import { getLatestPosts } from "@/lib/firebaseAdmin";
import HomeClient from "./components/HomeClient";

/** Lista los últimos posts desde Firestore en cada request (no solo en el build). */
export const dynamic = "force-dynamic";

export default async function Home() {
  let recentPosts: Awaited<ReturnType<typeof getLatestPosts>> = [];
  try {
    recentPosts = await getLatestPosts(4);
  } catch {
    recentPosts = [];
  }

  return <HomeClient recentPosts={recentPosts} />;
}
