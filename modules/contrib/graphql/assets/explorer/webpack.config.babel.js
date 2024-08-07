import webpack from "webpack";
import path from "path";
import CopyWebpackPlugin from "copy-webpack-plugin";

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: "./index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.min.js",
  },
  resolve: {
    extensions: [".mjs", ".jsx", ".js", ".json"],
    modules: [path.resolve(__dirname, "node_modules"), "node_modules"],
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  performance: {
    hints: false,
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, "node_modules/graphiql/graphiql.css") },
        { from: path.resolve(__dirname, "node_modules/@graphiql/plugin-explorer/dist/style.css") },
        { from: path.resolve(__dirname, "src/container.css") },
      ],
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
  externals: {
    jquery: "jQuery",
    drupal: "Drupal",
  },
};
