"use client";

import dynamic from "next/dynamic";

// react-pdf 底层是 pdf.js，依赖浏览器专有 API（如 DOMMatrix），
// 因此关闭服务端渲染，只在浏览器端加载。
const PdfDocument = dynamic(() => import("./PdfDocument"), {
  ssr: false,
  loading: () => (
    <p className="py-10 text-center text-sm text-zinc-500">PDF 加载中…</p>
  ),
});

export default function PdfViewer({ file }: { file: string }) {
  return <PdfDocument file={file} />;
}
