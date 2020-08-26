const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssoWebpackPlugin = require('csso-webpack-plugin').default;

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  const config = {
    entry: path.resolve(__dirname, 'src', 'js', 'index.js'),
    output: {
      path: path.resolve(__dirname, '..', 'src', 'main', 'webapp'),
      filename: path.join('js', 'script.min.js'),
      chunkFilename: path.join('js', 'vendors.min.js'),
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        request: 'superagent',
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