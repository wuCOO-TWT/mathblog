import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "个人博客",
  description: "个人学术博客",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="sticky top-0 z-20 border-b border-black/[.08] bg-white/70 backdrop-blur-md dark:border-white/[.145] dark:bg-black/50">
          <nav className="mx-auto flex w-full max-w-3xl items-center gap-6 px-6 py-4 text-sm font-medium">
            <Link href="/" className="transition-opacity hover:opacity-60">
              首页
            </Link>
            <Link href="/posts" className="transition-opacity hover:opacity-60">
              文章
            </Link>
            <Link
              href="/playground"
              className="transition-opacity hover:opacity-60"
            >
              实验室
            </Link>
            <Link href="/photos" className="transition-opacity hover:opacity-60">
              照片墙
            </Link>
            <Link href="/about" className="transition-opacity hover:opacity-60">
              关于
            </Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
