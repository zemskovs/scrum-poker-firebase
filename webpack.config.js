const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ENV = {
  production: 'production',
  development: 'development',
};
const currentEnv = process.env.NODE_ENV;
const envBuffer = fs.readFileSync(`./.env.${currentEnv}`);
const envConfig = dotenv.parse(envBuffer);

const isProd = currentEnv === ENV.production;
const isDev = !isProd;

const config = {
  mode: currentEnv,
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: 'file-loader',
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
  },
  plugins: [
    // new CopyPlugin({
    //   patterns: [{ from: 'src/index.html' }],
    // }),
    new HtmlWebpackPlugin({
      appMountId: 'app',
      template: 'index.html',
    }),
    new LodashModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        FIREBASE_API_KEY: JSON.stringify(envConfig.FIREBASE_API_KEY),
      },
    }),
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  devServer: {
    contentBase: './dist',
  },
};

module.exports = config;
