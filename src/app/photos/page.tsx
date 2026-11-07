import { photos } from "@/lib/photos";

export default function Photos() {
  return (
    <main className="flex-1">
      {/* ===== 全页固定背景 ===== */}
      <div className="fixed inset-0 -z-10 bg-[url('/photos-bg.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
        <header className="mb-8 space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-sm">照片墙</h1>
          <p className="text-sm text-white/70">用镜头记录的光影与瞬间。</p>
          <p className="text-xs text-white/50">注：部分图片来自作者的朋友。</p>
        </header>

        {photos.length > 0 ? (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {photos.map((photo) => (
              <figure
                key={photo.src}
                className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full"
                />
                <figcaption className="flex items-center justify-between gap-2 px-3 py-2">
                  <span className="truncate text-xs font-medium text-white/80">
                    {photo.title}
                  </span>
                  {photo.date && (
                    <span className="shrink-0 text-[10px] text-white/50">
                      {photo.date}
                    </span>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <li key={i}>
                  <div className="flex aspect-[4/3] flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-white/20 bg-white/10 text-white/50 backdrop-blur-sm">
                    <span className="text-2xl">📷</span>
                    <span className="text-xs">照片占位</span>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-center text-xs text-white/60">
              照片即将上传，敬请期待。
            </p>
          </>
        )}
      </div>
    </main>
  );
}
