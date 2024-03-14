import bundleAnalzer from '@next/bundle-analyzer';

const withBundleAnalzyer = bundleAnalzer({ enabled: process.env.ANALYZE === 'true' });

/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: () => [{ source: '/api/:path*', destination: `${process.env.BACKEND_URL}/api/:path*` }],
  output: 'standalone',
};

export default withBundleAnalzyer(nextConfig);
