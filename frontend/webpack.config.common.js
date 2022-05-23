const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  entry: ['@babel/polyfill/noConflict',
   './src/js/app.js'],
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
        }]
      },
      {
        test: /\.s?css/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },

      {
         test: /\.(png|svg|jpg|gif)$/,
         use: [
           'file-loader',
         ],
       },
       {
         test: /\.(woff|woff2|eot|ttf|otf)$/,
         use: [
           'file-loader',
         ],
       },

      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
            },
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css', '.scss']
  },
  plugins: [
     new Dotenv(),
  //  path: './some.other.env', // load this now instead of the ones in '.env'
  //     safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
  //     systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
  //     silent: true, // hide any errors
  //     defaults: false // load '.env.defaults' as the default values if empty.
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),


     new CopyWebpackPlugin([
      {
        from: `${__dirname}/src/images`,
        to:`${__dirname}/dist/images`,
      },

      {
        from: `${__dirname}/src/css`,
        to:`${__dirname}/dist/css`,
      },
      
     
    ]),


  ],
};
