import Image from "next/image";
import Link from "next/link";
import { getAllArticles } from "@/lib/posts";
import { demos } from "@/lib/demos";
import MusicPlayerCard from "@/components/MusicPlayerCard";
import PhotoCarouselCard from "@/components/PhotoCarouselCard";

function formatDate(date?: string) {
  if (!date) return "";
  const [y, m, d] = date.split("-");
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export default function Home() {
  const articles = getAllArticles();
  const latest = articles[0];
  const articleCount = articles.length;
  const demoCount = demos.length;
  const tags = Array.from(
    new Set(
      articles.flatMap((p) =>
        p.tag ? p.tag.split("·").map((t) => t.trim()).filter(Boolean) : []
      )
    )
  );
  const tagCount = tags.length;

  return (
    <main className="relative flex-1">
      {/* ===================== 全页固定背景（原图直出，避免放大失真） ===================== */}
      <div className="fixed inset-0 -z-10 bg-[url('/home-bg.jpg')] bg-cover bg-center bg-no-repeat">
        {/* 轻微遮罩：仅暗色模式保留，亮色模式除雾让背景更清晰 */}
        <div className="absolute inset-0 dark:bg-black/40" />
      </div>

      {/* ===================== 内容 ===================== */}
      <div className="mx-auto w-full max-w-5xl px-4 pb-16 pt-8 sm:px-6">
        {/* 搜索栏（占位） */}
        <div className="mb-6 flex justify-center">
          <input
            type="search"
            placeholder="搜索标题、描述或标签..."
            aria-label="搜索"
            className="w-full max-w-lg rounded-full border border-black/10 bg-white/80 px-5 py-2.5 text-sm shadow-sm outline-none backdrop-blur placeholder:text-zinc-400 focus:border-zinc-400 dark:border-white/10 dark:bg-zinc-900/80 dark:focus:border-white/40"
          />
        </div>

        {/* 顶部两栏：个人卡片 + 音乐播放器 */}
        <div className="grid gap-4 md:grid-cols-[1.7fr_1fr]">
          {/* 个人卡片 */}
          <div className="rounded-2xl border border-black/10 bg-white/75 p-5 backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/65">
            <div className="flex items-center gap-4">
              <Image
                src="/avatar.jpg"
                alt="吴明泽的头像"
                width={64}
                height={64}
                className="h-16 w-16 shrink-0 rounded-xl object-cover"
              />
              <div className="min-w-0">
                <p className="text-xl font-bold">吴明泽</p>
                <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                  源于"我想要"的热爱，不断地去理解这个世界，认识这个世界，认识我的人生，认识我。
                </p>
              </div>
            </div>
            <div className="mt-5 flex gap-8 border-t border-black/5 pt-4 dark:border-white/5">
              {[
                { n: String(articleCount), label: "文章" },
                { n: String(tagCount), label: "标签" },
                { n: String(demoCount), label: "演示" },
              ].map((stat) => (
                <div key={stat.label}>
                  <span className="text-lg font-semibold">{stat.n}</span>
                  <span className="ml-1 text-xs text-zinc-400">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 侧卡：音乐播放器 */}
          <MusicPlayerCard />
        </div>

        {/* 横幅条：更新公告（可点击） */}
        {latest && (
          <Link
            href={`/posts/${latest.slug}`}
            className="my-4 flex items-center justify-center gap-2 rounded-xl bg-zinc-800/85 px-4 py-3 text-sm text-zinc-300 backdrop-blur-sm transition-colors hover:bg-zinc-800"
          >
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-zinc-400">
              更新公告
            </span>
            <span className="truncate">最新更新：《{latest.title}》</span>
            <span className="shrink-0 text-indigo-400">→</span>
          </Link>
        )}

        {/* 内容卡片网格：最新文章 + 实验室精选 + 标签 + 阅读统计 */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* 左大卡：最新文章（可点击） */}
          {latest && (
            <Link
              href={`/posts/${latest.slug}`}
              className="group flex min-h-[280px] flex-col justify-end rounded-2xl border border-black/10 bg-white/55 p-5 backdrop-blur-md transition-colors hover:border-black/25 hover:bg-white/70 dark:border-white/10 dark:bg-zinc-900/45 dark:hover:border-white/25 dark:hover:bg-zinc-900/60"
            >
              <span className="w-fit rounded-full bg-indigo-500/90 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-white">
                最新文章
              </span>
              <span className="mt-3 text-lg font-semibold leading-7 group-hover:underline">
                {latest.title}
              </span>
              <span className="mt-1 line-clamp-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {latest.description}
              </span>
              <span className="mt-4 flex items-center justify-between border-t border-black/5 pt-3 text-xs text-zinc-500 dark:border-white/10 dark:text-zinc-400">
                <span>{latest.tag}</span>
                <span className="flex items-center gap-2">
                  {formatDate(latest.date)}
                  <span className="text-indigo-600 dark:text-indigo-400">
                    阅读全文 →
                  </span>
                </span>
              </span>
            </Link>
          )}

          {/* 右：2×2 小卡 */}
          <div className="grid grid-cols-2 gap-4">
            {/* 实验室精选（可点击） */}
            {demos.slice(0, 1).map((demo) => (
              <Link
                key={demo.slug}
                href={`/playground/${demo.slug}`}
                className="group flex min-h-[130px] flex-col justify-between rounded-2xl border border-black/10 bg-white/55 p-4 backdrop-blur-md transition-colors hover:border-indigo-400/70 hover:bg-white/70 dark:border-white/10 dark:bg-zinc-900/45 dark:hover:border-indigo-400/70 dark:hover:bg-zinc-900/60"
              >
                <span className="text-[10px] font-medium uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  实验室
                </span>
                <span className="mt-auto text-sm font-semibold leading-5 group-hover:underline">
                  {demo.title}
                </span>
                <span className="mt-1 text-[10px] text-zinc-500 dark:text-zinc-400">
                  {demo.tag}
                </span>
              </Link>
            ))}

            {/* 摄影（轮播，点击进入照片墙） */}
            <PhotoCarouselCard />

            {/* 标签（可点击筛选文章） */}
            <div className="flex min-h-[130px] flex-col rounded-2xl border border-black/10 bg-white/45 p-4 backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/35">
              <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                标签
              </span>
              <div className="mt-2 flex flex-wrap content-start gap-1.5">
                {tags.map((t) => (
                  <Link
                    key={t}
                    href={`/posts?tag=${encodeURIComponent(t)}`}
                    className="rounded-full border border-black/10 px-2 py-0.5 text-[10px] text-zinc-600 transition-colors hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-600 dark:border-white/15 dark:text-zinc-300 dark:hover:border-indigo-400 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300"
                  >
                    {t}
                  </Link>
                ))}
              </div>
            </div>

            {/* 阅读统计（可点击进入文章） */}
            <Link
              href="/posts"
              className="group flex min-h-[130px] flex-col justify-between rounded-2xl border border-black/10 bg-white/45 p-4 backdrop-blur-md transition-colors hover:border-black/25 hover:bg-white/60 dark:border-white/10 dark:bg-zinc-900/35 dark:hover:border-white/25 dark:hover:bg-zinc-900/50"
            >
              <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                阅读统计
              </span>
              <div className="mt-auto flex items-end justify-between">
                <div className="flex gap-3 text-xs text-zinc-600 dark:text-zinc-300">
                  <span>
                    <span className="mr-0.5 text-base font-bold">{articleCount}</span>
                    文章
                  </span>
                  <span>
                    <span className="mr-0.5 text-base font-bold">{demoCount}</span>
                    演示
                  </span>
                  <span>
                    <span className="mr-0.5 text-base font-bold">{tagCount}</span>
                    标签
                  </span>
                </div>
                <span className="text-indigo-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-indigo-400">
                  →
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* 底部状态栏（占位） */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-black/10 bg-white/75 px-4 py-3 text-xs text-zinc-500 backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/60 dark:text-zinc-400">
          <span>系统时间 / 运行时长占位</span>
          <span className="flex flex-wrap gap-2">
            {["Next.js", "React", "Tailwind"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-black/10 px-2 py-0.5 dark:border-white/10"
              >
                {t}
              </span>
            ))}
          </span>
          <span>ICP 备案占位</span>
        </div>
      </div>
    </main>
  );
}
