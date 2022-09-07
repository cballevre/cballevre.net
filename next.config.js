module.exports = {
  basePath: "/cballevre.net",
  assetPrefix: "/cballevre.net",
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },
};
