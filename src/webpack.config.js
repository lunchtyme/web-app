import { resolve as _resolve, join } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export const entry = "./src/main.jsx";
export const output = {
  path: _resolve(__dirname, "dist"), // Output directory
  filename: "bundle.js", // Name of the bundled file
};
export const module = {
  rules: [
    {
      test: /\.(js|jsx)$/, // To compile JS and JSX files
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
      },
    },
    {
      test: /\.css$/, // To load CSS files
      use: ["style-loader", "css-loader"],
    },
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/i, // To load images
      type: 'asset/resource',
    },
  ],
};
export const resolve = {
  extensions: [".js", ".jsx"],
};
export const plugins = [
  new HtmlWebpackPlugin({
    template: "./index.html", // Path to your HTML template
  }),
];
export const devServer = {
  static: {
    directory: join(__dirname, "dist"),
  },
  compress: true,
  port: 3000, // Dev server port
};
export const mode = "development";
