"use client";

import { useEffect, useRef, useState } from "react";

/* ============================================================================
 * 矩阵的几何意义可视化
 * ============================================================================
 * 功能 1（旋转与路径）：旋转矩阵 R(θ) = [[cosθ, -sinθ], [sinθ, cosθ]]
 *   作用在基向量 (1,0) 与 (0,1) 上，等价于把二者逆时针旋转 θ 角。
 *   乘 n 次即 R(θ)^n = R(nθ)，总旋转角为 nθ。
 *   红箭头 = (1,0) 旋转后的位置 (cos nθ, sin nθ)；
 *   蓝箭头 = (0,1) 旋转后的位置 (-sin nθ, cos nθ)。
 *
 * 功能 2（行列式与降维）：对角矩阵 diag(a, b) 把 x 轴拉伸 a 倍、y 轴拉伸 b 倍，
 *   由 (a,0) 与 (0,b) 张成的矩形面积 = |a·b|，而 det = a·b。
 *   当 a 或 b 为 0 时，矩形塌缩为一条线（秩降到 1），行列式为 0。
 * ==========================================================================*/

// —— SVG 坐标变换 ——
// SVG 的 y 轴向下，而数学坐标 y 轴向上，因此渲染时对 y 取反。
// 画布 400×400，原点在中心 (200,200)，1 个单位 = 80 像素（可见范围约 ±2.4）。
const SIZE = 400;
const CENTER = SIZE / 2;
const SCALE = 80;

const sx = (x: number) => CENTER + x * SCALE;
const sy = (y: number) => CENTER - y * SCALE;

// 缓动函数：动画平滑的起停
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// 复用的坐标网格（网格线 + 坐标轴 + 刻度标注 + 原点）
function Grid() {
  const ticks = [-2, -1, 1, 2];
  return (
    <g>
      {ticks.map((v) => (
        <line
          key={`gx${v}`}
          x1={sx(v)}
          y1={sy(2.4)}
          x2={sx(v)}
          y2={sy(-2.4)}
          stroke="#e5e7eb"
          strokeWidth={1}
        />
      ))}
      {ticks.map((v) => (
        <line
          key={`gy${v}`}
          x1={sx(-2.4)}
          y1={sy(v)}
          x2={sx(2.4)}
          y2={sy(v)}
          stroke="#e5e7eb"
          strokeWidth={1}
        />
      ))}
      {/* 坐标轴 */}
      <line
        x1={sx(-2.4)}
        y1={sy(0)}
        x2={sx(2.4)}
        y2={sy(0)}
        stroke="#9ca3af"
        strokeWidth={1.5}
      />
      <line
        x1={sx(0)}
        y1={sy(2.4)}
        x2={sx(0)}
        y2={sy(-2.4)}
        stroke="#9ca3af"
        strokeWidth={1.5}
      />
      {/* x 轴刻度与标注 */}
      {ticks.map((v) => (
        <g key={`tx${v}`}>
          <line x1={sx(v)} y1={sy(0) - 4} x2={sx(v)} y2={sy(0) + 4} stroke="#9ca3af" strokeWidth={1} />
          <text x={sx(v)} y={sy(0) + 16} textAnchor="middle" fontSize={10} fill="#9ca3af">
            {v}
          </text>
        </g>
      ))}
      {/* y 轴刻度与标注 */}
      {ticks.map((v) => (
        <g key={`ty${v}`}>
          <line x1={sx(0) - 4} y1={sy(v)} x2={sx(0) + 4} y2={sy(v)} stroke="#9ca3af" strokeWidth={1} />
          <text x={sx(0) - 8} y={sy(v) + 4} textAnchor="end" fontSize={10} fill="#9ca3af">
            {v}
          </text>
        </g>
      ))}
      <circle cx={sx(0)} cy={sy(0)} r={3} fill="#6b7280" />
    </g>
  );
}

export default function MatrixGeometryDemo() {
  // —— 功能 1：旋转与路径 ——
  const [theta, setTheta] = useState(45); // 每次旋转角度（度）
  const [n, setN] = useState(1); // 乘方次数
  const [angle, setAngle] = useState(0); // 当前显示的总旋转角（弧度）
  const angleRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // —— 功能 2：行列式与降维 ——
  const [a, setA] = useState(1.5);
  const [b, setB] = useState(1.0);

  // 卸载时清理动画
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // 平滑动画到目标角度（弧度）
  const animateTo = (target: number) => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    const start = angleRef.current;
    const duration = 800;
    const t0 = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - t0) / duration, 1);
      const value = start + (target - start) * easeInOutCubic(t);
      angleRef.current = value;
      setAngle(value);
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  const handleTransform = () => animateTo((n * theta * Math.PI) / 180);
  const handleReset = () => animateTo(0);

  // 旋转后的两个基向量
  const red = { x: Math.cos(angle), y: Math.sin(angle) }; // (1,0) 旋转后
  const blue = { x: -Math.sin(angle), y: Math.cos(angle) }; // (0,1) 旋转后

  // 行列式与秩
  const det = a * b;
  const rank = (a === 0 ? 0 : 1) + (b === 0 ? 0 : 1);
  const degenerate = rank < 2;

  return (
    <div className="w-full max-w-5xl space-y-6">
      {/* 标题与说明 */}
      <div className="space-y-1.5">
        <h2 className="text-xl font-semibold">矩阵的几何意义：旋转与行列式</h2>
        <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          左侧演示旋转矩阵 R(θ) 对两个基向量的作用：乘 n 次即旋转 nθ。
          右侧演示对角矩阵对坐标轴的拉伸，其行列式等于张成矩形的面积，为 0 时发生降维。
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* ================= 功能 1：旋转与路径 ================= */}
        <section className="rounded-xl border border-black/10 p-4 dark:border-white/10">
          <h3 className="mb-3 font-semibold">功能 1 · 旋转与路径</h3>
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-auto w-full">
            <defs>
              <marker
                id="rot-red"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
              </marker>
              <marker
                id="rot-blue"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
              </marker>
            </defs>
            <Grid />
            {/* 红色箭头：(1,0) 旋转后的位置 */}
            <line
              x1={sx(0)}
              y1={sy(0)}
              x2={sx(red.x)}
              y2={sy(red.y)}
              stroke="#ef4444"
              strokeWidth={2.5}
              markerEnd="url(#rot-red)"
            />
            {/* 蓝色箭头：(0,1) 旋转后的位置 */}
            <line
              x1={sx(0)}
              y1={sy(0)}
              x2={sx(blue.x)}
              y2={sy(blue.y)}
              stroke="#3b82f6"
              strokeWidth={2.5}
              markerEnd="url(#rot-blue)"
            />
          </svg>

          <div className="mt-3 space-y-3">
            <label className="flex items-center gap-3 text-sm">
              <span className="w-14 shrink-0 text-zinc-600 dark:text-zinc-400">角度 θ</span>
              <input
                type="range"
                min={0}
                max={360}
                step={1}
                value={theta}
                onChange={(e) => setTheta(Number(e.target.value))}
                className="w-full accent-red-500"
              />
              <span className="w-12 text-right font-mono">{theta}°</span>
            </label>
            <label className="flex items-center gap-3 text-sm">
              <span className="w-14 shrink-0 text-zinc-600 dark:text-zinc-400">次数 n</span>
              <input
                type="range"
                min={0}
                max={5}
                step={1}
                value={n}
                onChange={(e) => setN(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
              <span className="w-12 text-right font-mono">{n}</span>
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleTransform}
                className="rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-indigo-600"
              >
                执行变换
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-md border border-black/10 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-white/10 dark:hover:bg-white/10"
              >
                重置
              </button>
            </div>
            <p className="font-mono text-sm text-zinc-600 dark:text-zinc-400">
              目标 nθ = {n * theta}°　·　当前 {(angle * 180 / Math.PI).toFixed(1)}°
            </p>
          </div>
        </section>

        {/* ================= 功能 2：行列式与降维 ================= */}
        <section
          className={`rounded-xl border p-4 transition-colors ${
            degenerate
              ? "border-red-400 bg-red-50 dark:border-red-500/40 dark:bg-red-500/10"
              : "border-black/10 dark:border-white/10"
          }`}
        >
          <h3 className="mb-3 font-semibold">功能 2 · 行列式与降维</h3>
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-auto w-full">
            <defs>
              <marker
                id="det-arrow"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
              </marker>
            </defs>
            <Grid />
            {/* 由 (a,0) 与 (0,b) 张成的矩形 */}
            <polygon
              points={`${sx(0)},${sy(0)} ${sx(a)},${sy(0)} ${sx(a)},${sy(b)} ${sx(0)},${sy(b)}`}
              fill={degenerate ? "#fca5a5" : "#a5b4fc"}
              fillOpacity={degenerate ? 0.7 : 0.45}
              stroke={degenerate ? "#ef4444" : "#6366f1"}
              strokeWidth={2}
            />
            {/* 两条张成边 (a,0) 与 (0,b) */}
            <line x1={sx(0)} y1={sy(0)} x2={sx(a)} y2={sy(0)} stroke="#6366f1" strokeWidth={2.5} markerEnd="url(#det-arrow)" />
            <line x1={sx(0)} y1={sy(0)} x2={sx(0)} y2={sy(b)} stroke="#6366f1" strokeWidth={2.5} markerEnd="url(#det-arrow)" />
          </svg>

          <div className="mt-3 space-y-3">
            <label className="flex items-center gap-3 text-sm">
              <span className="w-8 shrink-0 font-mono text-zinc-600 dark:text-zinc-400">a</span>
              <input
                type="range"
                min={0}
                max={2}
                step={0.05}
                value={a}
                onChange={(e) => setA(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
              <span className="w-12 text-right font-mono">{a.toFixed(2)}</span>
            </label>
            <label className="flex items-center gap-3 text-sm">
              <span className="w-8 shrink-0 font-mono text-zinc-600 dark:text-zinc-400">b</span>
              <input
                type="range"
                min={0}
                max={2}
                step={0.05}
                value={b}
                onChange={(e) => setB(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
              <span className="w-12 text-right font-mono">{b.toFixed(2)}</span>
            </label>

            <p className="font-mono text-sm text-zinc-700 dark:text-zinc-300">
              行列式 det = a × b = {det.toFixed(2)}（面积 = {Math.abs(det).toFixed(2)}）
            </p>

            {degenerate ? (
              <p className="rounded-md bg-red-100 px-3 py-2 text-sm font-medium text-red-700 dark:bg-red-500/20 dark:text-red-300">
                ⚠ 发生降维，秩为 {rank}
              </p>
            ) : (
              <p className="text-sm text-zinc-600 dark:text-zinc-400">秩为 2，空间未被压缩。</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
