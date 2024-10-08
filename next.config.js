
/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
  eslint: {
    // Disabling on production builds because we're running checks on PRs via GitHub Actions.
    ignoreDuringBuilds: true
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: '@import "styles.scss";'
  },
  experimental: {
    webpackBuildWorker: true
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**'
      }
    ]
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback
    };
    return config;
  }
};
