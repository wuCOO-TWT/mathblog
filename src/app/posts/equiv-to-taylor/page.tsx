import Link from "next/link";
import PdfViewer from "@/components/PdfViewer";

export default function EquivToTaylorPage() {
  return (
    <main className="flex flex-1 flex-col items-center gap-6 px-4 py-10 sm:px-6">
      <div className="w-full max-w-4xl space-y-4">
        <Link
          href="/posts"
          className="inline-flex items-center gap-1 text-sm text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          ← 返回文章列表
        </Link>

        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            从等价无穷小到泰勒展开
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            吴明泽 · 微积分 · 泰勒展开
          </p>
        </div>

        {/* PDF.js 渲染的在线阅读器（不依赖浏览器内置 PDF 插件） */}
        <PdfViewer file="/mathblog/posts/equiv-to-taylor.pdf" />

        {/* 兜底：在新标签页打开 / 下载 */}
        <a
          href="/mathblog/posts/equiv-to-taylor.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:underline dark:text-indigo-400"
        >
          在新标签页打开 / 下载 PDF ↗
        </a>
      </div>
    </main>
  );
}
