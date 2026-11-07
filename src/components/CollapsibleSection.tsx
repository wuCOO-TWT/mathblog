"use client";

import { useState, type ReactNode } from "react";

export default function CollapsibleSection({
  title,
  subtitle,
  defaultOpen = false,
  children,
}: {
  title: string;
  subtitle?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-xl border border-black/10 dark:border-white/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-white/5"
      >
        <span className="min-w-0">
          <span className="block text-base font-semibold">{title}</span>
          {subtitle && (
            <span className="mt-0.5 block text-xs text-zinc-500 dark:text-zinc-400">
              {subtitle}
            </span>
          )}
        </span>
        <span className="shrink-0 rounded-full border border-black/10 px-3 py-1 text-xs text-zinc-500 dark:border-white/10 dark:text-zinc-400">
          {open ? "收起" : "展开"}
        </span>
      </button>

      {open && (
        <div className="border-t border-black/10 px-5 py-5 dark:border-white/10">
          {children}
        </div>
      )}
    </div>
  );
}
