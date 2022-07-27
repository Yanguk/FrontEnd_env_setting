const webpackConfig = require('./webpack.config');
const webpack = require('webpack');
const compiler = webpack(webpackConfig);
const webpackDevServer =require('webpack-dev-server');

const build = () => {
  compiler.run((err, stats) => {
    if (err || stats.hasErrors()) {
      console.log(err);
      return;
    }

    console.log(stats);
  })
};

const devServerOptions = {...webpackConfig.devServer};
const server = new webpackDevServer(devServerOptions, compiler);

const runServer = async () => {
  console.log('Starting server...')
  await server.start();
}

runServer();
