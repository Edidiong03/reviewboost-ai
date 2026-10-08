/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.watchOptions = {
      ignored: ['**/data/**', '**/node_modules/**'],
    }
    return config
  },
}

export default nextConfig
