import Link from "next/link";
import HeineTheoremDemo from "@/components/HeineTheoremDemo";

export default function HeineTheoremPage() {
  return (
    <main className="flex flex-1 flex-col items-center gap-8 px-4 py-10 sm:px-6">
      <div className="w-full max-w-4xl">
        <Link
          href="/playground"
          className="inline-flex items-center gap-1 text-sm text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          ← 返回实验室
        </Link>
      </div>

      <HeineTheoremDemo />
    </main>
  );
}
