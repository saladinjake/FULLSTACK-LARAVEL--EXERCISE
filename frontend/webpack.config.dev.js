const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');
const Dotenv = require('dotenv-webpack');

const back =JSON.stringify('localhost:3000/api/v1')
const front = JSON.stringify('localhost:4001')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: `${__dirname}/dist`,
    historyApiFallback: true,
    port: 4000,
    hot: true
  },
  plugins: [
  new Dotenv(),
    new webpack.DefinePlugin({
      'process.env': {
        API_URL: JSON.stringify('localhost:4000/api/v1'),
        // DEPLOY_FRONT_URL: JSON.stringify('http://localhost:4000'),
        // DEPLOY_BACK_URL: JSON.stringify('http://localhost:12000/api/v1'),
        DEPLOY_FRONT_URL: front,
        DEPLOY_BACK_URL: back,
      }
    })
  ]
});
