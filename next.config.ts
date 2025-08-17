import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',   // 这行告诉 Next：“我要纯静态文件”
  distDir: 'out',     // 这行说：“把结果放到 out 目录”
};

export default nextConfig;
