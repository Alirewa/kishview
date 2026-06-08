/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  transpilePackages: ['mapbox-gl'],
};

export default nextConfig;
