import { Suspense } from "react";
import { getAllArticles } from "@/lib/posts";
import PostsContent from "./PostsContent";

export default function Posts() {
  const posts = getAllArticles();
  return (
    <Suspense fallback={null}>
      <PostsContent posts={posts} />
    </Suspense>
  );
}
