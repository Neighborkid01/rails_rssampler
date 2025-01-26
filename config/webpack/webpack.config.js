const { generateWebpackConfig, merge } = require("shakapacker");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const webpackConfig = generateWebpackConfig();

module.exports = merge(
  webpackConfig, {
    plugins: [new ForkTsCheckerWebpackPlugin()],
  }
);
