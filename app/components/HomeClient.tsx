"use client";

import React, { useContext } from "react";
import MyPresentation from "./myPresentation";
import Portfolio from "./portfolio";
import BlogPreview from "./BlogPreview";
import { I18nContext } from "../providers/i18nProvider";
import { getAllProjects } from "@/lib/projects";
import type { SerializedBlogPost } from "@/lib/firebaseAdmin";

type HomeClientProps = {
  recentPosts: SerializedBlogPost[];
};

export default function HomeClient({ recentPosts }: HomeClientProps) {
  const context = useContext(I18nContext);
  if (context === null) {
    throw new Error(
      "The I18n is not initialized, Make sure you have the provider set up correctly"
    );
  }

  const works = getAllProjects();

  return (
    <div className="h-full w-full flex flex-col items-center justify-start max-w-full">
      <MyPresentation context={context} />
      <Portfolio context={context} works={works} />
      <BlogPreview context={context} posts={recentPosts} />
    </div>
  );
}
