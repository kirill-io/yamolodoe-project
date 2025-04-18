const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInjectPreload = require('@principalstudio/html-webpack-inject-preload');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (env) => {
  const isDev = env.mode === 'development';
  const isProd = env.mode === 'production';

  const pages = [
    { chunks: ['index'], page: 'index.html', template: path.resolve(__dirname, 'src', 'pages', 'index.html') },
    { chunks: ['services'], page: 'services.html', template: path.resolve(__dirname, 'src', 'pages', 'services.html') },
    { chunks: ['contacts'], page: 'contacts.html', template: path.resolve(__dirname, 'src', 'pages', 'contacts.html') },
    { chunks: ['privacy-policy'], page: 'privacy-policy.html', template: path.resolve(__dirname, 'src', 'pages', 'privacy-policy.html') },
    { chunks: ['user-agreement'], page: 'user-agreement.html', template: path.resolve(__dirname, 'src', 'pages', 'user-agreement.html') },
  ];

  const htmlPlugins = pages.map((page) => new HtmlWebpackPlugin({
    inject: true,
    template: page.template,
    filename: page.page,
    chunks: [...page.chunks],
  }));

  const htmlLoader = {
    test: /\.html$/i,
    loader: 'html-loader',
    options: {
      sources: {
        list: [
          {
            tag: 'img',
            attribute: 'src',
            type: 'src',
          },
          {
            tag: 'source',
            attribute: 'srcset',
            type: 'srcset',
          },
          {
            tag: 'use',
            attribute: 'href',
            type: 'src',
          },
        ],
      },
    },
  };

  const postCssLoader = {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          [
            'postcss-preset-env',
            {
              browsers: 'last 3 versions',
            },
          ],
        ],
      },
    },
  };

  const cssLoader = {
    test: /\.css$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: { importLoaders: 1 },
      },
      isProd && postCssLoader,
    ],
  };

  const fontsLoader = {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'fonts/[name][ext]',
    },
  };

  const imagesLoader = {
    test: /\.(png|jpg|jpeg|webp|gif)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'images/[name].[contenthash:8][ext]',
    },
  };

  const svgLoader = {
    test: /\.svg$/i,
    type: 'asset/resource',
    generator: {
      filename: 'images/[name].[contenthash:8][ext]',
    },
  };

  const babelLoader = {
    test: /\.(?:js|mjs|cjs)$/i,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', { targets: 'defaults' }],
        ],
      },
    },
  };

  return {
    mode: env.mode ?? 'development',
    entry: {
      index: path.resolve(__dirname, 'src', 'js', 'pages', 'index.js'),
      services: path.resolve(__dirname, 'src', 'js', 'pages', 'services.js'),
      contacts: path.resolve(__dirname, 'src', 'js', 'pages', 'contacts.js'),
      'privacy-policy': path.resolve(__dirname, 'src', 'js', 'pages', 'privacy-policy.js'),
      'user-agreement': path.resolve(__dirname, 'src', 'js', 'pages', 'user-agreement.js'),
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].[contenthash].js',
      clean: true,
    },
    devServer: {
      static: path.resolve(__dirname, 'src'),
      port: env.port ?? 8080,
      open: true,
      hot: true,
    },
    devtool: isDev && 'inline-source-map',
    resolve: {
      alias: {
        css: path.resolve(__dirname, 'src', 'css'),
        js: path.resolve(__dirname, 'src', 'js'),
      },
      extensions: ['.js'],
    },
    optimization: {
      minimize: isProd,
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin(),
      ],
    },
    plugins: [
      ...htmlPlugins,
      new HtmlWebpackInjectPreload({
        files: [
          {
            match: /.*\.woff2$/,
            attributes: { as: 'font', type: 'font/woff2', crossorigin: true },
          },
          {
            match: /.*\.woff$/,
            attributes: { as: 'font', type: 'font/woff', crossorigin: true },
          },
        ],
      }),
      new CopyPlugin({
        patterns: [
          { from: 'public/images', to: 'images' },
          { from: 'public/favicon', to: '.' },
          { from: 'public/manifest', to: '.' },
        ],
      }),
      new webpack.HotModuleReplacementPlugin(),
      isProd && new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      }),
      isDev && new ESLintPlugin(),
    ].filter(Boolean),
    module: {
      rules: [
        isProd && htmlLoader,
        cssLoader,
        fontsLoader,
        imagesLoader,
        svgLoader,
        babelLoader,
      ],
    },
  };
};
