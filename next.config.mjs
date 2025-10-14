/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['fakestoreapi.com']
  },
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true
}