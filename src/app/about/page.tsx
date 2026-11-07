import Image from "next/image";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import CollapsibleSection from "@/components/CollapsibleSection";

// 原文正文（标题由外层折叠面板承担，这里去掉了一级标题）
const content = `矩阵是什么？一个极好的比喻是数表，一个描述空间几何的表格。一个 n 阶矩阵通过增减行列，足够去描述 3D/4D 甚至更高维空间的变换。但从信息与物理方向去讲，三阶张量的"第三个维度"不是多出来的空间方向，而是"多引入了一个参与相互作用的子系统"。

- 例：一张彩色图片，它的长宽与每个像素点上的颜色相互关联共同构成了一张彩色图片，而一个立体网格可以描述每个像素点的特征。在量子多系统里，三个粒子相互影响，一个三阶张量可以描述粒子本身状态的组合。

矩阵是"空间"，三阶张量是"时空"。

这是一个浪漫的类比。矩阵像是一张静态照片或是视频中的某一帧。而三阶张量多出来的那个维度（时间序列），让数据变成了"电影"。张量中每一个"截面"或许就存在着类似的关联性，方向性，因果性，而它们之间的"Bond（键）"就将整个截面串联起来了。

所以张量的美就在这一刻完美的体现了。现实的事物是多维的，因果关系是复杂的，而张量恰好可以完美描述它们。

- 打个比方：一个人受经济、身体、心情、学业、社会关系这五个变量高度影响，构成了一个五阶张量。物理上五个粒子相互纠缠同样构成了一个五阶张量，它与人的五个状态在数学结构上是高度相似的。

既然如此，那是不是一个维度足够高维的张量就可以容纳下整个宇宙？理论上应该可以。但这样庞大巨大的数据除了宇宙本身，没有任何东西可以存下来。但信息之间并不孤立，总会有关联性，比如身体与日常的生活状态高度相关，与学业的相关性很低。我们可以选择保留高相关去掉低相关，将它们分成多个小张量去逼近这个巨大的高维大张量，那这个大张量就相对可以去描述了。就好比现在极其火爆的量化交易与大模型。

为什么人很难预测股票下一秒的走势，而 AI 可以？这主要是因为人脑的算力与储存有限，一个人只能盯着三四张 K 线图，或是几个新发布的政策，但经济股票市场是一个极高维的张量。人连看都看不过来，谈什么发现关系并对它们降维呢？但 AI（机器）可以，把这个高维的张量塞进一个巨大的张量缩并算法里面，就可能找到某种隐蔽的关联从而预测走势。大语言模型可以说话也是因为词与词之间有一个相互纠缠的巨大张量。

所以回到开头的观点，为什么我说张量是人类逻辑之美？它就像是人类利用数学构架出的一个极其优雅的骨架，而我们把现实的信息填进去，就能构建模型去描述预测现实。当此刻正在阅读这篇文章的你抬起头去看一看这个世界，一阵风可能是某一次气流的扰动与你的一次交织，一滴雨也许是哪一个地方的一滴水蒸发到了天空之上，顺着风吹到你的头顶，然后恰巧落在了你的头上，成为了一个巨大张量的一个节点。它可能是一片落叶，一阵涟漪，一次落泪，一时喜乐，我们生活中的每一刻共同构成了社会这个巨大的张量，而更宏大的宇宙也不过如此。

所以，在理解这一切之后，我终于明白自己渴望什么，想做什么了。

曾经我会因父母的离异而伤心，因继父给了我优渥的生活而虚荣，又因他锒铛入狱，生活的坠落而崩溃。我无数次陷入了我要替家人背负责任，改变命运的漩涡，我努力但我也痛苦也累。但把这一切放进一个高维的张量里面，我 18 岁的人生无非是无数个标准交织组合成的张量，而它们在时空之中张成了我。未来我依然会苦恼也会困惑，依然为生活的琐碎烦恼，但抬头看看星空，这只是我人生张量中的一个节点。我为什么会对张量网络与量子计算有这么大的热情？或许依旧有一些庸俗的因素，但更多的是意识到它是一门探究文明边界知识边界的学科，而我会成为开拓队伍中的一员。那么尽管开拓就好，现实的路自然会在开拓的路上由我自己铺好。`;

export default function About() {
  return (
    <main className="flex-1">
      {/* ===== 全页固定背景 ===== */}
      <div className="fixed inset-0 -z-10 bg-[url('/mathblog/about-bg.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 dark:bg-black/40" />
      </div>

      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-black/10 bg-white/75 backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/65">
          {/* ===== 顶部横幅图（占位） ===== */}
          <div className="h-40 w-full bg-gradient-to-r from-indigo-400/40 via-purple-400/40 to-pink-400/40 dark:from-indigo-700/45 dark:via-purple-700/45 dark:to-pink-700/45" />

          <div className="px-6 pb-8 sm:px-10">
            {/* 头像（占位，叠在横幅上） */}
            <Image
              src="/mathblog/avatar.jpg"
              alt="吴明泽的头像"
              width={96}
              height={96}
              className="-mt-14 h-24 w-24 rounded-full border-4 border-white object-cover dark:border-zinc-900"
            />

            {/* 标题 */}
            <h1 className="mt-4 text-3xl font-bold">关于我</h1>
            <p className="mt-1 text-sm tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              HELLO WORLD, I&apos;M 吴明泽
            </p>

            {/* ===== 个人简介（框架占位） ===== */}
            <section className="mt-8 space-y-2">
              <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">个人简介</h2>
              <p className="text-zinc-600 dark:text-zinc-300">
                源于"我想要"的热爱，不断地去理解这个世界，认识这个世界，认识我的人生，认识我。
              </p>
            </section>

            {/* ===== 研究与计算方向（框架占位） ===== */}
            <section className="mt-8">
              <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">研究与计算方向</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-600 dark:text-zinc-300">
                <li>量子计算与人工智能</li>
                <li>量子张量网络压缩与机器学习</li>
                <li>方向占位 3</li>
              </ul>
            </section>

            {/* ===== 「关于我」文章（默认收起，点击展开） ===== */}
            <div className="mt-8">
              <CollapsibleSection
                title='从矩阵到张量，人类逻辑之美———以及"关于我"'
                subtitle="点击展开阅读全文"
              >
                <MarkdownRenderer content={content} />
              </CollapsibleSection>
            </div>

            {/* ===== 评论区（占位） ===== */}
            <div className="mt-10 border-t border-black/10 pt-4 text-sm text-zinc-500 dark:border-white/10">
              评论占位
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
