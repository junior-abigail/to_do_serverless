const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


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
