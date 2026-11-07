import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { getAllPosts, getPost } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

// 预渲染所有已知文章
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return { title: post ? post.data.title : "文章" };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { title, author, date, keywords } = post.data;

  return (
    <main className="flex flex-1 flex-col items-center gap-6 px-4 py-10 sm:px-6">
      <div className="w-full max-w-3xl space-y-6">
        <Link
          href="/posts"
          className="inline-flex items-center gap-1 text-sm text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          ← 返回文章列表
        </Link>

        <header className="space-y-3 border-b border-black/10 pb-6 dark:border-white/10">
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          {(author || date) && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-600 dark:text-zinc-400">
              {author && <span>作者：{author}</span>}
              {date && <span>日期：{date}</span>}
            </div>
          )}
          {keywords && keywords.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {keywords.map((kw) => (
                <span
                  key={kw}
                  className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600 dark:bg-white/10 dark:text-zinc-300"
                >
                  {kw}
                </span>
              ))}
            </div>
          )}
        </header>

        <MarkdownRenderer content={post.content} />
      </div>
    </main>
  );
}
