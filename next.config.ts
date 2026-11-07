import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 静态导出：生成纯静态站点，可托管到 GitHub Pages / Cloudflare Pages */
  output: "export",
  images: {
    /* 静态导出不支持默认图片优化，关闭优化直接输出原图 */
    unoptimized: true,
  },
  cacheComponents: false,
  partialPrefetching: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
