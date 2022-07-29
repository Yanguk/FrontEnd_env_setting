/* eslint-disable import/no-unresolved */
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const childProcess = require('child_process');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode,
  entry: './src/index.tsx',
  output: {
    path: path.resolve('./build'),
    filename: 'main.js',
    clean: true,
  },
  // 폴더의 별칭 및 컴파일 순서 지정
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  // Dev-sever
  devServer: {
    hot: true,
    static: {
      directory: path.join(__dirname, 'public'),
      publicPath: '/',
    },
    client: {
      overlay: true,
      // progress: true,
    },
    port: 8080,
    open: {
      app: {
        name: 'Google Chrome',
      },
    },
  },

  // Loader
  module: {
    rules: [
      {
        // 바벨 및 타입스크립트 로더
        test: /\.[jt]sx?$/,
        exclude: /(node_modules|public)/,
        include: path.resolve(__dirname, 'src'),
        use: [
          ...(mode === 'production'
            ? [
                {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      '@babel/preset-env',
                      '@babel/preset-react',
                      '@babel/preset-typescript',
                    ],
                  },
                },
              ]
            : []),
          ...(mode === 'development'
            ? [
                {
                  loader: 'ts-loader',
                  options: {
                    transpileOnly: true,
                    experimentalWatchApi: true,
                  },
                },
              ]
            : []),
        ],
      },
      {
        // css 압축 로더
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          'css-loader',
        ],
      },
      {
        // 이미지 압축 에셋 _ webpack4 의 url-loader, file-loader
        test: /\.(jpg|png|svg|gif)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10kb
          },
        },
        generator: {
          filename: '[name][ext]?[hash]',
        },
      },
    ],
  },
  // plugins
  plugins: [
    new webpack.BannerPlugin(`
      현재시간 : ${new Date().toLocaleString()}
      커밋넘버 : ${childProcess.execSync(`git rev-parse --short HEAD`)}
      ${childProcess.execSync(`git config user.name`)}
    `),
    new webpack.DefinePlugin({}),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      templateParameters: {
        env: mode === 'development' ? '(개발용)' : '',
      },
      minify:
        mode === 'production'
          ? {
              collapseWhitespace: true,
              removeComments: true,
            }
          : false,
    }),
    ...(mode === 'development' ? [new ForkTsCheckerWebpackPlugin()] : []),
  ],
};
