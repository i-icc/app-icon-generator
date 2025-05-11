/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/app-icon-generator', // ← リポジトリ名に変更
};

module.exports = nextConfig;
