const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const mode = process.env.NODE_ENV || "production";
const URL = {
  production: "http://localhost:3001/remoteEntry.js",
  develop: "http://localhost:3001/remoteEntry.js",
};

module.exports = {
  mode,
  entry: "./src/index",
  devtool: "source-map",
  optimization: {
    minimize: mode === "production",
  },
  resolve: {
    extensions: [".jsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: require.resolve("babel-loader"),
        options: {
          presets: [require.resolve("@babel/preset-react")],
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "application_b",
      filename: "remoteEntry.js",
      exposes: {
        "./app": "./src/app.jsx",
      },
      remotes: {
        application_a: `application_a@${URL[mode]}`,
      },
      shared: ["react", "react-dom"],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
