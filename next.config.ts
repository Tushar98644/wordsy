import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@mastra/*"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "***",
      },
    ],
  },
};

export default nextConfig;
