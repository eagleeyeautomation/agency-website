/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "eagleeyeautomation.com"
          }
        ],
        destination: "https://www.eagleeyeautomation.com/:path*",
        permanent: true
      }
    ];
  },
  turbopack: {
    root: process.cwd()
  }
};

export default nextConfig;
