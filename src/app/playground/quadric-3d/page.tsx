import Link from "next/link";

export default function Quadric3DPage() {
  return (
    <main className="flex h-[calc(100vh-58px)] flex-col gap-2 p-2">
      <div className="flex items-center">
        <Link
          href="/playground"
          className="inline-flex items-center gap-1 text-sm text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          ← 返回实验室
        </Link>
      </div>

      {/* 内嵌 3D 演示：外层显式撑满可视高度，iframe 作为 flex 子项铺满
          （避免百分比高度在 flex 链中解析失败、回退成 iframe 默认 150px） */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-black/10 dark:border-white/10">
        <iframe
          src="/demos/quadric-3d.html"
          title="二次型 3D 可视化"
          className="min-h-0 w-full flex-1"
        />
      </div>
    </main>
  );
}
