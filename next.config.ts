import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  transpilePackages: ['mapbox-gl'],
};

export default nextConfig;
