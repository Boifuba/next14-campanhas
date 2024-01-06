// // next.config.js
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   basePath: "/rpg",
//   images: {
//     domains: ["firebasestorage.googleapis.com", "lh3.googleusercontent.com"],
//   },
// };

// module.exports = nextConfig;

const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/rpg",
  images: {
    domains: ["firebasestorage.googleapis.com", "lh3.googleusercontent.com"],
  },
  webpack: (config, { isServer }) => {
    // Only run the analyzer on the server bundle during a production build
    if (isServer && process.env.ANALYZE === "true") {
      config.plugins.push(new BundleAnalyzerPlugin());
    }

    return config;
  },
};

module.exports = nextConfig;
