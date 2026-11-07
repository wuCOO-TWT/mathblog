"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";

type Track = { title: string; artist: string; file: string };

// 歌曲列表（文件位于 public/music/）
const tracks: Track[] = [
  { title: "Hit the Rhyme", artist: "蛋堡", file: "Hit the Rhyme - 蛋堡.mp3" },
  { title: "Stay With Me", artist: "CHANYEOL & 펀치", file: "Stay With Me - CHANYEOL&펀치.mp3" },
  { title: "Confessions", artist: "Usher", file: "Usher-Confessions.mp3" },
  { title: "Winter Sweet", artist: "蛋堡", file: "Winter Sweet - 蛋堡.mp3" },
  { title: "偷偷", artist: "蛋堡 & 阎韦伶", file: "偷偷 - 蛋堡&阎韦伶.mp3" },
  { title: "半岛铁盒", artist: "周杰伦", file: "半岛铁盒-周杰伦.mp3" },
  { title: "圣诞结", artist: "陈奕迅", file: "圣诞结 - 陈奕迅.mp3" },
  { title: "寻找", artist: "蛋堡", file: "寻找 - 蛋堡.mp3" },
  { title: "开不了口", artist: "周杰伦", file: "开不了口-周杰伦.mp3" },
  { title: "爱爱爱", artist: "方大同", file: "方大同-爱爱爱.mp3" },
  { title: "火力全开", artist: "王力宏", file: "火力全开 - 王力宏.mp3" },
  { title: "过程", artist: "蛋堡", file: "过程 - 蛋堡.mp3" },
  { title: "就是爱你", artist: "陶喆", file: "陶喆-就是爱你.mp3" },
  { title: "为你", artist: "CHEN & 伯贤 & XIUMIN", file: "너를 위해 - 첸&백현&시우민.mp3" },
];

// 文件名可能含中文/空格/&，需做 URL 编码
const srcOf = (file: string) => "/mathblog/music/" + encodeURIComponent(file);

function formatTime(sec: number) {
  if (!Number.isFinite(sec) || sec <= 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
    </svg>
  );
}

function PrevIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M6 6h2v12H6zM20 6l-10 6 10 6z" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M16 6h2v12h-2zM4 6l10 6-10 6z" />
    </svg>
  );
}

export default function MusicPlayerCard() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playingRef = useRef(false);

  const track = tracks[index];

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  // 切歌时重新加载；若原本在播放则继续播放
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    setProgress(0);
    setDuration(0);
    if (playingRef.current) {
      audio.play().catch(() => setPlaying(false));
    }
  }, [index]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const prev = () => setIndex((i) => (i - 1 + tracks.length) % tracks.length);
  const next = () => setIndex((i) => (i + 1) % tracks.length);

  const seek = (e: MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || duration <= 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    audio.currentTime = ratio * duration;
    setProgress(ratio * duration);
  };

  return (
    <div className="flex flex-col rounded-2xl border border-black/10 bg-white/75 p-5 backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/65">
      {/* 隐藏的音频元素 */}
      <audio
        ref={audioRef}
        src={srcOf(track.file)}
        preload="metadata"
        onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => next()}
      />

      {/* 头部 */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">Now Playing</p>
        <span className="text-[10px] text-zinc-400">
          {index + 1}/{tracks.length}
        </span>
      </div>

      {/* 封面 + 歌名 */}
      <div className="mt-3 flex items-center gap-3">
        <Image
          src="/mathblog/cover.jpg"
          alt="专辑封面"
          width={64}
          height={64}
          className="h-16 w-16 shrink-0 rounded-lg object-cover"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{track.title}</p>
          <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">{track.artist}</p>
        </div>
      </div>

      {/* 进度条（可点击跳转） */}
      <div className="mt-4">
        <div
          onClick={seek}
          className="h-1 w-full cursor-pointer overflow-hidden rounded-full bg-zinc-200 dark:bg-white/10"
        >
          <div
            className="h-full rounded-full bg-indigo-500"
            style={{ width: `${duration > 0 ? (progress / duration) * 100 : 0}%` }}
          />
        </div>
        <div className="mt-1 flex justify-between text-[10px] text-zinc-400">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* 控制按钮：上一首 / 播放暂停 / 下一首 */}
      <div className="mt-3 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={prev}
          aria-label="上一首"
          className="grid h-8 w-8 place-items-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
        >
          <PrevIcon />
        </button>
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "暂停" : "播放"}
          className="grid h-10 w-10 place-items-center rounded-full bg-indigo-500 text-white transition-colors hover:bg-indigo-600"
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="下一首"
          className="grid h-8 w-8 place-items-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
        >
          <NextIcon />
        </button>
      </div>

      {/* 歌单 */}
      <div className="mt-4 border-t border-black/5 pt-3 dark:border-white/5">
        <p className="mb-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">歌单</p>
        <ul className="max-h-40 space-y-1 overflow-y-auto pr-1">
          {tracks.map((t, i) => (
            <li key={t.file}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className={`flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors ${
                  i === index
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300"
                    : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-white/5"
                }`}
              >
                <span className="truncate">{t.title}</span>
                <span className="shrink-0 text-[10px] text-zinc-400">{t.artist}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
