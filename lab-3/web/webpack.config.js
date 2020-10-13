const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssoWebpackPlugin = require('csso-webpack-plugin').default;

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  const config = {
    entry: {
      index: path.resolve(__dirname, 'src', 'js', 'index.js'),
      main: path.resolve(__dirname, 'src', 'js', 'main.js'),
    },
    output: {
      path: path.resolve(__dirname, '..', 'src', 'main', 'webapp', 'resources'),
      filename: path.join('js', 'script.[name].min.js'),
      chunkFilename: path.join('js', 'vendors.[name].min.js'),
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'src'),
      stats: 'errors-only',
      port: 8081,
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        request: 'superagent',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src', 'img'),
            to: path.resolve(__dirname, '..', 'src', 'main', 'webapp',
                'resources', 'img'),
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
          filename: path.join('css', 'style.[name].min.css'),
          chunkFilename: path.join('css', 'vendors.[name].min.css'),
        }),
        new CssoWebpackPlugin(),
    );
  }

  return config;
};