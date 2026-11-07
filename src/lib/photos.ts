export type Photo = {
  src: string;
  title: string;
  date?: string;
  description?: string;
};

// 照片数据：文件位于 public/photos/
// 备注：部分图片来自作者的朋友
export const photos: Photo[] = [
  { src: "/photos/0c6b9aab453192f8ebb9388b5057aeef.jpg", title: "光影 01" },
  { src: "/photos/0f6ed563120cf040442fb037908fcbf0.jpg", title: "光影 02" },
  { src: "/photos/392e9a0bf1b5ddf6762ec9c82c34bfeb.jpg", title: "光影 03" },
  { src: "/photos/7c57c597c55b1ec91050a130cd6ae75a.jpg", title: "光影 04" },
  { src: "/photos/810d63b1dea01609b92e5459aca51e8a.jpg", title: "光影 05" },
  { src: "/photos/aeb8082d1e95375052484d60297f3fe2.jpg", title: "光影 06" },
  { src: "/photos/c38a6d35afca791e9d4fdbc106b6477d.jpg", title: "光影 07" },
  { src: "/photos/c5870e4954085579a208a30a0f7135d6.jpg", title: "光影 08" },
  { src: "/photos/c5eb82f745594b1980143ab03f3be48f.jpg", title: "光影 09" },
  { src: "/photos/d10fc54024b6b4f002b6a4c9631ab361.jpg", title: "光影 10" },
  { src: "/photos/d47c015fbcdd6e85326796a1a07d6e3c.jpg", title: "光影 11" },
  { src: "/photos/f0596256aa7cc2ee4a61217e934ef4f2.jpg", title: "光影 12" },
  { src: "/photos/f88f7e335ce06cf0b2efc9dec07e3aaa.jpg", title: "光影 13" },
  { src: "/photos/fe4640ca7935ade75a306d2af1d57cb3.jpg", title: "光影 14" },
];
