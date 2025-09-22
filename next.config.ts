/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co.com', // <-- your host
        pathname: '/**',           // allow all paths
      },
    ],
  },
};

module.exports = nextConfig;
