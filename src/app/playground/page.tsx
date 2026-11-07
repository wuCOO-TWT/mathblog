import Link from "next/link";
import { demos } from "@/lib/demos";

export default function Playground() {
  return (
    <main className="flex-1">
      {/* ===== 全页固定星空背景 ===== */}
      <div className="fixed inset-0 -z-10 bg-[url('/mathblog/playground-bg.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
        <header className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-sm">实验室</h1>
          <p className="text-sm text-white/70">
            交互式数学可视化，点击卡片进入对应演示。
          </p>
        </header>

        <ul className="grid gap-4 sm:grid-cols-2">
          {demos.map((demo) => (
            <li key={demo.slug}>
              <Link
                href={`/playground/${demo.slug}`}
                className="group flex h-full flex-col gap-2 rounded-2xl border border-black/10 bg-white/70 p-5 backdrop-blur-md transition-colors hover:border-black/25 hover:bg-white/85 dark:border-white/10 dark:bg-zinc-900/60 dark:hover:border-white/25 dark:hover:bg-zinc-900/75"
              >
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  {demo.tag}
                </span>
                <span className="text-lg font-semibold group-hover:underline">
                  {demo.title}
                </span>
                <span className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {demo.description}
                </span>
                <span className="mt-auto pt-2 text-sm text-indigo-600 dark:text-indigo-400">
                  进入演示 →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
