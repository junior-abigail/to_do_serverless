const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");


module.exports = {
  mode: "development",
  entry: {
    app: "./app/index.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: process.env["BUILD_DIR_UI"]
  },
  plugins: [
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(process.env.API_URL)
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "app/index.html")
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      }
    ]
  }
};
