"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { photos } from "@/lib/photos";

export default function PhotoCarouselCard() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (photos.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % photos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Link
      href="/photos"
      className="group relative flex min-h-[130px] flex-col justify-between overflow-hidden rounded-2xl border border-black/10 bg-zinc-900 p-4 transition-colors hover:border-indigo-400/70 dark:border-white/10"
    >
      {/* 轮播图片：3 秒切换，左右滑动 */}
      <div
        className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {photos.map((photo) => (
          <div key={photo.src} className="relative h-full w-full shrink-0">
            <Image
              src={photo.src}
              alt=""
              fill
              sizes="(max-width: 768px) 45vw, 200px"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* 遮罩：保证文字可读 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

      {/* 文字 */}
      <span className="relative w-fit rounded-full bg-white/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white backdrop-blur">
        摄影
      </span>
      <span className="relative mt-auto flex items-center justify-between text-sm font-semibold text-white">
        照片墙
        <span className="text-xs font-normal text-white/70">
          {index + 1}/{photos.length} →
        </span>
      </span>
    </Link>
  );
}
