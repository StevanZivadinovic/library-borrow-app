import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
      }
    ]
  }
};

export default nextConfig;
