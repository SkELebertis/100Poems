import type { NextConfig } from "next";

const basePath = process.env.NODE_ENV === 'production' ? '/100Poems' : '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
