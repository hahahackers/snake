/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/snake",
        permanent: true,
      },
    ];
  },
  output: "export",
  reactStrictMode: false,
};
