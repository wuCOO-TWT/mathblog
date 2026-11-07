"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Post } from "@/lib/posts";

export default function PostsContent({ posts }: { posts: Post[] }) {
  const searchParams = useSearchParams();
  const activeTag = searchParams.get("tag") ?? "";
  const filtered = activeTag
    ? posts.filter((p) =>
        (p.tag ?? "").split("·").map((t) => t.trim()).includes(activeTag)
      )
    : posts;

  return (
    <main className="flex-1">
      {/* ===== 全页固定背景 ===== */}
      <div className="fixed inset-0 -z-10 bg-[url('/posts-bg.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 dark:bg-black/45" />
      </div>

      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
        <header className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">文章</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {activeTag ? (
              <>
                标签「{activeTag}」：{filtered.length} 篇 ·
                <Link
                  href="/posts"
                  className="ml-1 text-indigo-600 underline dark:text-indigo-400"
                >
                  清除筛选
                </Link>
              </>
            ) : (
              <>共 {filtered.length} 篇 · 学习笔记与思考。</>
            )}
          </p>
        </header>

        <ul className="grid gap-4 sm:grid-cols-2">
          {filtered.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/posts/${post.slug}`}
                className="group flex h-full flex-col gap-2 rounded-2xl border border-black/10 bg-white/30 p-5 backdrop-blur-sm transition-colors hover:border-black/25 hover:bg-white/45 dark:border-white/10 dark:bg-zinc-900/25 dark:hover:border-white/25 dark:hover:bg-zinc-900/40"
              >
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  {post.tag}
                </span>
                <span className="text-lg font-semibold group-hover:underline">
                  {post.title}
                </span>
                <span className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {post.description}
                </span>
                <span className="mt-auto pt-2 text-sm text-indigo-600 dark:text-indigo-400">
                  阅读全文 →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
