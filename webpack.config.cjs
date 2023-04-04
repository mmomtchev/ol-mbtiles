const path = require('path');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');

module.exports = (env, argv) => ({
  entry: './examples/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'docs', 'examples'),
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'examples/index.html'
    }),
    new PreloadWebpackPlugin(),
    new webpack.DefinePlugin({
      OL_MBTILES_DEBUG: JSON.stringify(!!process.env.OL_MBTILES_DEBUG)
    }),
  ],
  devtool: argv.mode === 'production' ? 'source-map' : 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'examples'),
    },
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    },
    compress: true,
    port: 9000,
  }
});
