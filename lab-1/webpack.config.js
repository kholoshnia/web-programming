const path = require('path');
const webpack = require('webpack');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssoWebpackPlugin = require('csso-webpack-plugin').default;

module.exports = (env, argv) => {
  const config = {
    entry: path.resolve(__dirname, 'src', 'js', 'index.js'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: path.join('js', 'script.min.js'),
      chunkFilename: path.join('js', 'vendors.min.js'),
    },
    optimization: {
      splitChunks: {chunks: 'all'},
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'src'),
      stats: 'errors-only',
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
        filename: 'index.html',
        minify: argv.mode === 'production',
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        request: 'superagent',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src', 'php'),
            to: path.resolve(__dirname, 'dist', 'php'),
          },
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
          include: [
            path.resolve(__dirname, 'src', 'css'),
            path.resolve(__dirname, 'src', 'scss'),
          ],
          exclude: /node_modules/,
          use: [
            argv.mode === 'production'
                ? MiniCssExtractPlugin.loader
                : 'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
      ],
    },
  };

  if (argv.mode === 'development') {
    config.devtool = 'source-map';
  }

  if (argv.mode === 'production') {
    config.plugins.push(...[
      new MiniCssExtractPlugin({
        filename: path.join('css', 'style.min.css'),
        chunkFilename: path.join('css', 'vendors.min.css'),
      }),
      new CssoWebpackPlugin(),
    ]);
  }

  return config;
};