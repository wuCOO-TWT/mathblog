"use client";

import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

/* ============================================================================
 * 海涅定理（归结原则）可视化演示
 * ============================================================================
 *
 * 【定理内容】
 *   lim_{x→x0} f(x) = A 存在，当且仅当：对任意满足 x_n → x0（且 x_n ≠ x0）
 *   的序列 {x_n}，都有 lim_{n→∞} f(x_n) = A。
 *
 *   —— 也就是说，极限是否存在，不依赖“从哪条路径逼近”。只要存在两条
 *      不同路径给出不同的极限，原极限就不存在。
 *
 * 【本演示的函数】
 *   f(x) = sin(1/x)，考察 x → 0。
 *   f(x) 在 x = 0 处无定义（1/x 除以零）；并且当 x 靠近 0 时，|1/x| 越来越大，
 *   sin(1/x) 在 [-1, 1] 之间无限次振荡，所以极限不存在。
 *
 * 【构造两条“路径”（序列）】
 *   序列 A：x_n = 1 / (π/2 + 2nπ + 1/n)
 *     ⇒ 1/x_n = π/2 + 2nπ + 1/n
 *     ⇒ f(x_n) = sin(1/x_n) = sin(π/2 + 2nπ + 1/n)
 *              = sin(π/2 + 1/n) = cos(1/n) → +1（n→∞）
 *       （分母多出的 1/n 项让函数值随 n 变化、真正“趋近”1，而非恒等于 1）
 *     ⇒ n→∞ 时，分母 π/2 + 2nπ + 1/n → ∞，故 x_n → 0。
 *
 *   序列 B：x_n = 1 / (3π/2 + 2nπ + 1/n)
 *     ⇒ 1/x_n = 3π/2 + 2nπ + 1/n
 *     ⇒ f(x_n) = sin(1/x_n) = sin(3π/2 + 2nπ + 1/n)
 *              = sin(3π/2 + 1/n) = -cos(1/n) → -1（n→∞）
 *     ⇒ n→∞ 时，x_n → 0。
 *
 * 【结论】
 *   两条序列的自变量都趋近于 0，但函数值分别趋近于 +1 与 -1。
 *   极限若存在必须唯一；这里出现了两个不同的极限，矛盾，
 *   因此 lim_{x→0} sin(1/x) 不存在 —— 这就是“路径依赖导致极限不存在”。
 * ==========================================================================*/

// —— 数学函数定义 ——

// f(x) = sin(1/x)。x = 0 时无定义，调用方须保证 x ≠ 0。
function f(x: number): number {
  return Math.sin(1 / x);
}

// 序列 A：x_n = 1 / (π/2 + 2nπ + 1/n)。
// 分母多出的 1/n 使 1/x_n = π/2 + 2nπ + 1/n，于是
// f(x_n) = sin(π/2 + 1/n) = cos(1/n)，随 n 变化并趋近 +1；同时 x_n → 0。
function sequenceA(n: number): number {
  return 1 / (Math.PI / 2 + 2 * n * Math.PI + 1 / n);
}

// 序列 B：x_n = 1 / (3π/2 + 2nπ + 1/n)。
// f(x_n) = sin(3π/2 + 1/n) = -cos(1/n)，随 n 变化并趋近 -1；同时 x_n → 0。
function sequenceB(n: number): number {
  return 1 / ((3 * Math.PI) / 2 + 2 * n * Math.PI + 1 / n);
}

type CurvePoint = { x: number; y: number | null };

// 在 [-1, 1] 上等间距采样，生成 sin(1/x) 的曲线数据。
// x = 0 处无定义，用 null 表示，折线会在此断开（connectNulls 默认 false）。
function generateCurveData(intervalCount = 1000): CurvePoint[] {
  const data: CurvePoint[] = [];
  for (let i = 0; i <= intervalCount; i++) {
    const x = -1 + (2 * i) / intervalCount; // i=0 → -1，i=intervalCount → 1
    const xr = Math.round(x * 1000) / 1000; // 消除浮点累计误差
    data.push({ x: xr, y: xr === 0 ? null : f(xr) });
  }
  return data;
}

// 数字格式化：保留 5 位小数。
const fmt = (v: number) => v.toFixed(5);

// 两条序列的配色：A 红（→ +1），B 蓝（→ -1）。
const COLOR_A = "#ef4444";
const COLOR_B = "#3b82f6";

export default function HeineTheoremDemo() {
  // 当前选中的序列（A 或 B），以及采样索引 n（1 ~ 20）。
  const [sequence, setSequence] = useState<"A" | "B">("A");
  const [n, setN] = useState(1);

  // 曲线数据是常量，用 useMemo 缓存，避免拖动滑动条时重复计算 1000 个点。
  const curveData = useMemo(() => generateCurveData(), []);

  // 两条序列在当前 n 下的采样点横坐标。
  const xA = sequenceA(n);
  const xB = sequenceB(n);
  // 对应的函数值（随 n 变化，并分别趋近 +1 和 -1；这里按公式实时计算）。
  const fA = f(xA);
  const fB = f(xB);

  // 当前激活序列（用于高亮按钮与读数卡片）。
  const active = sequence === "A";

  return (
    <div className="w-full max-w-4xl space-y-6">
      {/* 标题与结论说明 */}
      <div className="space-y-1.5">
        <h2 className="text-xl font-semibold">
          海涅定理：f(x) = sin(1/x) 在 x→0 时极限不存在
        </h2>
        <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          两条序列的自变量 xₙ 都趋近于 0，但函数值分别趋近于 +1 与 -1：路径不同、极限不同，
          因此 lim<sub>x→0</sub> sin(1/x) 不存在。
        </p>
      </div>

      {/* 控制区：选择序列的按钮 + 索引滑动条 */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setSequence("A")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              sequence === "A"
                ? "bg-red-500 text-white"
                : "border border-red-300 text-red-600 hover:bg-red-50 dark:border-red-500/50 dark:text-red-400 dark:hover:bg-red-500/10"
            }`}
          >
            序列 A（f → +1）
          </button>
          <button
            type="button"
            onClick={() => setSequence("B")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              sequence === "B"
                ? "bg-blue-500 text-white"
                : "border border-blue-300 text-blue-600 hover:bg-blue-50 dark:border-blue-500/50 dark:text-blue-400 dark:hover:bg-blue-500/10"
            }`}
          >
            序列 B（f → -1）
          </button>
        </div>

        {/* 滑动条：控制采样索引 n */}
        <div className="flex min-w-[240px] flex-1 items-center gap-3">
          <span className="whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">
            采样索引 n
          </span>
          <input
            type="range"
            min={1}
            max={20}
            step={1}
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            className="w-full accent-indigo-500"
          />
          <span className="w-7 text-right font-mono text-sm font-semibold">{n}</span>
        </div>
      </div>

      {/* 实时读数：同时展示两条序列，激活的那条高亮 */}
      <div className="grid gap-3 sm:grid-cols-2">
        {/* 序列 A */}
        <div
          className={`rounded-lg border p-3 font-mono text-sm transition-colors ${
            sequence === "A"
              ? "border-red-300 bg-red-50 dark:border-red-500/50 dark:bg-red-500/10"
              : "border-black/10 dark:border-white/10"
          }`}
        >
          <div className="mb-1 font-sans font-semibold text-red-600 dark:text-red-400">
            序列 A（→ +1）
          </div>
          <div>xₙ = 1/(π/2 + 2·{n}·π + 1/{n}) ≈ {fmt(xA)}</div>
          <div>f(xₙ) = sin(1/xₙ) ≈ {fmt(fA)}</div>
        </div>
        {/* 序列 B */}
        <div
          className={`rounded-lg border p-3 font-mono text-sm transition-colors ${
            sequence === "B"
              ? "border-blue-300 bg-blue-50 dark:border-blue-500/50 dark:bg-blue-500/10"
              : "border-black/10 dark:border-white/10"
          }`}
        >
          <div className="mb-1 font-sans font-semibold text-blue-600 dark:text-blue-400">
            序列 B（→ -1）
          </div>
          <div>xₙ = 1/(3π/2 + 2·{n}·π + 1/{n}) ≈ {fmt(xB)}</div>
          <div>f(xₙ) = sin(1/xₙ) ≈ {fmt(fB)}</div>
        </div>
      </div>

      {/* 图表 */}
      <div className="h-[380px] w-full rounded-xl border border-black/10 p-2 dark:border-white/10">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={curveData}
            margin={{ top: 12, right: 16, bottom: 4, left: -8 }}
          >
            <CartesianGrid stroke="#94a3b8" strokeOpacity={0.35} strokeDasharray="3 3" />

            {/* x 轴：范围 [-1, 1]，关键刻度含 0 */}
            <XAxis
              dataKey="x"
              type="number"
              domain={[-1, 1]}
              ticks={[-1, -0.5, 0, 0.5, 1]}
              stroke="#94a3b8"
              tick={{ fill: "#64748b", fontSize: 12 }}
            />

            {/* y 轴：范围略放宽到 [-1.5, 1.5]，给 ±1 的标记留出空间 */}
            <YAxis
              domain={[-1.5, 1.5]}
              ticks={[-1.5, -1, -0.5, 0, 0.5, 1, 1.5]}
              stroke="#94a3b8"
              tick={{ fill: "#64748b", fontSize: 12 }}
            />

            {/* x = 0 与 y = 0 两条坐标轴参考线 */}
            <ReferenceLine x={0} stroke="#94a3b8" />
            <ReferenceLine y={0} stroke="#94a3b8" />

            {/* 两条“极限值”参考线：y = +1（红）、y = -1（蓝），
                直观显示两条序列的函数值分别趋近于 +1 与 -1 */}
            <ReferenceLine y={1} stroke={COLOR_A} strokeDasharray="3 3" strokeOpacity={0.55} />
            <ReferenceLine y={-1} stroke={COLOR_B} strokeDasharray="3 3" strokeOpacity={0.55} />

            {/* 主曲线：f(x) = sin(1/x)。dot=false 避免画出 1000 个点 */}
            <Line
              dataKey="y"
              stroke="#6366f1"
              strokeWidth={1.2}
              dot={false}
              isAnimationActive={false}
              connectNulls={false}
            />

            {/* 序列 A 采样点：红点（在曲线上）+ 竖直虚线标出它在 x 轴上的位置 */}
            <ReferenceDot
              x={xA}
              y={fA}
              r={6}
              fill={COLOR_A}
              stroke="#ffffff"
              strokeWidth={1.5}
            />
            <ReferenceLine x={xA} stroke={COLOR_A} strokeDasharray="4 4" />

            {/* 序列 B 采样点：蓝点 + 竖直虚线 */}
            <ReferenceDot
              x={xB}
              y={fB}
              r={6}
              fill={COLOR_B}
              stroke="#ffffff"
              strokeWidth={1.5}
            />
            <ReferenceLine x={xB} stroke={COLOR_B} strokeDasharray="4 4" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
