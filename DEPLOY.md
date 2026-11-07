# 部署指南（mathblog）

本站已配置为**静态导出**（`output: 'export'`）：运行 `npm run build` 会在项目根目录生成 `out/` 文件夹，里面是纯静态的 HTML/CSS/JS，可以托管到任意静态空间。

> 注意：文章内容（`content/posts/*.md`）和照片在**构建时**读取，所以每次改动内容后要重新 `npm run build` 并重新部署。

---

## 方案一：Cloudflare Pages（推荐，最简单）

部署在根路径，网站的绝对路径（`/music`、`/photos`、背景图）无需任何改动即可使用。

1. 把代码推送到 GitHub / GitLab 仓库（仓库里要包含 `package.json`、`content/`、`public/` 等，`node_modules` 和 `out` 不用传）。
2. 登录 [Cloudflare Pages](https://pages.cloudflare.com)，点 **Create a project**，连接仓库。
3. 构建设置填：
   - **Framework preset**：Next.js (Static HTML Export)
   - **Build command**：`npm run build`
   - **Build output directory**：`out`
4. 保存部署。完成后你会得到一个 `https://<项目名>.pages.dev` 地址，可绑定自定义域名。

---

## 方案二：GitHub Pages

已提供 `.github/workflows/deploy.yml`，推送代码到 `main` 分支会自动构建并部署。

1. 在 GitHub 上**新建仓库**并推送代码。
2. 仓库 **Settings → Pages → Build and deployment → Source** 选 **GitHub Actions**。
3. 推送后，Actions 会自动跑 `npm run build` 并把 `out/` 部署到 Pages。

> ⚠️ **重要**：GitHub Pages 的「项目站点」地址是 `https://<用户名>.github.io/<仓库名>/`（带子路径），此时网站里的绝对路径（`/music`、`/photos`、`/home-bg.jpg` 等）会失效。
> 因此 GitHub Pages 请优先用以下两种之一（根路径，绝对路径正常）：
> - **用户站点**：仓库名必须是 `<用户名>.github.io`
> - **自定义域名**：在 Pages 里绑定你自己的域名
>
> 若坚持用项目站点子路径，需要额外配置 `basePath` 并给所有静态资源加前缀，比较麻烦，建议改用 Cloudflare Pages。

---

## 关于音乐（public/music）

音乐目前是 FLAC 无损格式，共 **374MB**，超出多数免费平台限制，需要先处理：

- **方案 A（推荐）**：转成 MP3（约 1/5 体积）。转好后放进 `public/music/`，并同步更新 `src/components/MusicPlayerCard.tsx` 里每首歌的 `file` 后缀（`.flac` → `.mp3`）。
- **方案 B**：把音乐上传到对象存储（阿里云 OSS / 腾讯云 COS / Cloudflare R2），再把 `MusicPlayerCard.tsx` 里的 `srcOf()` 改成返回外链 URL。

---

## 部署前自查清单

- [ ] `npm run build` 能成功，且生成 `out/` 目录
- [ ] 音乐已转 MP3 或迁到对象存储
- [ ] 本地预览 `out/` 正常（可用 `npx serve out` 快速起个静态服务器看）
