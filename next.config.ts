import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Keep explicit known hosts and allow common image providers.
    // The final pattern with hostname: "**" allows https hosts when image domains are dynamic.
    remotePatterns: [
      { protocol: "https", hostname: "utfs.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "i.imgur.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "**" },
    ],
  },
  serverExternalPackages: ["@prisma/client", "prisma"],  
  outputFileTracingIncludes: {
    "/api/**/*": ["./app/generated/prisma/**/*"],
  },
};

export default nextConfig;
