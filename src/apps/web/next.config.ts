import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "16mb", // or '10mb', '16mb' based on your needs
    },
  },
};

export default nextConfig;
