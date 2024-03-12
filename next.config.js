/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/snake",
  //       permanent: true,
  //     },
  //   ];
  // },
  output: 'export',
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: 'canvas' }]; // required to make Konva & react-konva work
    return config;
  },
  // reactStrictMode: false,
};
