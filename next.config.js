const webpack = require("webpack");

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async redirects() {
    return [
      {
        source: '/neon-party',
        destination: '/party/neon-party',
        permanent: true,
      },
    ]
  },
};

