import type { NextConfig } from "next";
import createMDX from "@next/mdx"

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  pageExtensions: ["md", "mdx", "ts", "tsx"]
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
