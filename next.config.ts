import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://juiceapi.spectralo.hackclub.app/:path*",
      },
    ];
  },
};

export default nextConfig;
