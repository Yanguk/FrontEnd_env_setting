const path = require('path');
const mode = process.env.NODE_ENV || 'development';
module.exports = {
  mode,
  entry: './src/app.js',
  output: {
    path: path.resolve('./build'),
    filename: 'main.js'
  },
  // 폴더의 별칭 및 컴파일 순서 지정
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
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
}