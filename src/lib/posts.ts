import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Post = {
  slug: string;
  title: string;
  author?: string;
  date?: string;
  description?: string;
  tag?: string;
  keywords?: string[];
};

const POSTS_DIR = path.join(process.cwd(), "content/posts");

function readPostFile(slug: string): { data: Post; content: string } | null {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    data: { slug, ...(data as Record<string, unknown>) } as Post,
    content,
  };
}

export function getPost(slug: string) {
  return readPostFile(slug);
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const posts: Post[] = [];
  for (const file of fs.readdirSync(POSTS_DIR)) {
    if (!file.endsWith(".md")) continue;
    const result = readPostFile(file.replace(/\.md$/, ""));
    if (result) posts.push(result.data);
  }
  // 按日期倒序（缺日期的排到最后）
  return posts.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

// 非 Markdown 的文章（如 PDF）单独维护，不走 content/posts/*.md
export const extraPosts: Post[] = [
  {
    slug: "equiv-to-taylor",
    title: "从等价无穷小到泰勒展开",
    description: "由等价无穷小的思想出发，理解泰勒公式与多项式逼近的内在联系。",
    tag: "微积分 · 泰勒展开",
  },
];

// 全部文章（Markdown + 特殊文章），供列表页与首页计数统一使用
export function getAllArticles(): Post[] {
  return [...getAllPosts(), ...extraPosts];
}
