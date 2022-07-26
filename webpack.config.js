const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const mode = process.env.NODE_ENV || 'development';
module.exports = {
  mode,
  entry: './src/app.tsx',
  output: {
    path: path.resolve('./build'),
    filename: 'main.js'
  },
  // 폴더의 별칭 및 컴파일 순서 지정
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  // Dev-sever
  devServer: {
    open: {
      app: {
        name: 'google-chrome',
      },
    },
  },
  // Loader
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /(node_modules|public)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-typescript',
                '@babel/preset-react',
              ]
            }
          },
          'ts-loader'
        ]
      }
    ],
  },
  // plugins
  plugins: [
    new webpack.DefinePlugin({}),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      templateParameters: {
        env: mode === 'development' ? '(개발용)' : '',
      }
    })
  ],
}