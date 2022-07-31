/* eslint-disable import/no-unresolved */
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const childProcess = require('child_process');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const apiMocker = require('connect-api-mocker');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');
const CleanTerminalPlugin = require('clean-terminal-webpack-plugin');

const HOST = 'localhost';
const PORT = 8080;

const colorize = (colorNum, output) => `\x1B[${colorNum}m${output}\x1B[0m`;
const mode = process.env.NODE_ENV || 'development';
const isDevelopment = mode === 'development';
const message = colorize(34, `Dev server running on http://${HOST}:${PORT}`);

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
      logging: 'error',
      // progress: true,
    },
    // historyApiFallback: true, // 404 페이지 발견시 홈으로 리다이렉트
    port: 8080,
    open: {
      app: {
        name: 'Google Chrome',
      },
    },
    // mock api 만들기
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('devServer error');
      }

      devServer.app.use(apiMocker('/api', '/mocks/api'));

      return middlewares;
    },
  },
  // Loader 빌드 하기전 처리과정
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
                      'react-refresh/babel',
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
                    getCustomTransformers: () => ({
                      before: [ReactRefreshTypeScript()],
                    }),
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
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
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
  // plugins 빌드후 처리과정
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
    ...(mode === 'development'
      ? [
          new ForkTsCheckerWebpackPlugin(),
          new ReactRefreshWebpackPlugin(),
          new CleanTerminalPlugin({
            message,
            onlyInWatchMode: false,
          }),
          new ReactRefreshWebpackPlugin(),
        ]
      : [new MiniCssExtractPlugin()]),
  ],
  // 커스텀 콘솔 및 제거 옵션
  // infrastructureLogging: { level: 'error' }, // wds 콘솔 제거 실쟁정보들
  stats: 'errors-only', // 에러만 출력 모듈 및 컴파일 정보 콘솔 제거 //  dev-server 에서는 logging
};
