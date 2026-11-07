export type Demo = {
  slug: string;
  title: string;
  description: string;
  tag: string;
};

export const demos: Demo[] = [
  {
    slug: "quadric-3d",
    title: "二次型 3D：椭球与降维",
    description:
      "对角矩阵二次型的 3D 可视化：单位球如何变椭球，参数为 0 时如何降维成椭圆与点。",
    tag: "线性代数 · 三维几何",
  },
  {
    slug: "matrix-geometry",
    title: "矩阵的几何意义：旋转与行列式",
    description:
      "旋转矩阵对基向量的作用，以及行列式作为面积/体积的几何解释。",
    tag: "线性代数 · 几何",
  },
  {
    slug: "heine-theorem",
    title: "海涅定理：路径依赖与极限不存在",
    description:
      "f(x) = sin(1/x) 可视化：两条序列 xₙ 都趋近于 0，函数值却分别趋向 +1 与 -1。",
    tag: "数学分析 · 极限",
  },
];
