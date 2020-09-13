const path = require('path');
const webpack = require('webpack');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssoWebpackPlugin = require('csso-webpack-plugin').default;

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  const config = {
    entry: path.resolve(__dirname, 'src', 'js', 'index.js'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: path.join('js', 'script.min.js'),
      chunkFilename: path.join('js', 'vendors.min.js'),
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'src'),
      port: 8081,
      stats: 'errors-only',
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
        filename: 'index.html',
        minify: isProduction,
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'error.html'),
        filename: 'error.html',
        minify: isProduction,
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'result.html'),
        filename: 'result.html',
        minify: isProduction,
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        request: 'superagent',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src', 'img', 'favicon'),
            to: path.resolve(__dirname, 'dist', 'img', 'favicon'),
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'src', 'js'),
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-private-methods',
              '@babel/plugin-proposal-class-properties',
            ],
          },
        },
        {
          test: /\.(jpe?g|png|svg)$/,
          include: path.resolve(__dirname, 'src', 'img'),
          exclude: /node_modules/,
          loader: 'file-loader',
          options: {
            name: path.join('img', '[name].[ext]'),
          },
        },
        {
          test: /\.(sa|sc|c)ss$/,
          include: path.resolve(__dirname, 'src', 'scss'),
          exclude: /node_modules/,
          use: [
            isProduction
                ? MiniCssExtractPlugin.loader
                : 'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
      ],
    },
  };

  if (!isProduction) {
    config.devtool = 'source-map';
  }

  if (isProduction) {
    config.plugins.push(
        new MiniCssExtractPlugin({
          filename: path.join('css', 'style.min.css'),
          chunkFilename: path.join('css', 'vendors.min.css'),
        }),
        new CssoWebpackPlugin(),
    );
  }

  return config;
};