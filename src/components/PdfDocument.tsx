"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// pdf.js 需要单独的 worker 脚本。这里指向 public/ 下的副本，
// 避免打包器处理 worker 时的兼容性问题。
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

export default function PdfDocument({ file }: { file: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState(0);
  const [width, setWidth] = useState<number>();

  // 按容器实际宽度渲染每一页，实现响应式
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setWidth(el.clientWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <Document
        file={file}
        onLoadSuccess={({ numPages: total }) => setNumPages(total)}
        loading={
          <p className="py-10 text-center text-sm text-zinc-500">PDF 加载中…</p>
        }
        error={
          <p className="py-10 text-center text-sm text-red-500">
            PDF 加载失败，请刷新页面重试。
          </p>
        }
      >
        {Array.from({ length: numPages }, (_, index) => (
          <Page
            key={`page-${index + 1}`}
            pageNumber={index + 1}
            width={width}
            className="mx-auto mb-4 overflow-hidden rounded-lg shadow-md"
          />
        ))}
      </Document>
    </div>
  );
}
