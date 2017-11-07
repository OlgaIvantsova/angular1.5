const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin       = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');


module.exports = {
  devtool: 'source-map',
  entry: {
    app: ['./client/app/app']
  },
  output: {
    path: './public',
    filename: 'bundle-[hash].js'
  },
  plugins: [
    new CleanPlugin(['./public/dist']),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin("[name]-[hash].css"),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './client/index.html',
      inject: 'body'
    }),
    new CopyWebpackPlugin([{
      from: './client/app/styles/common/img',
      to: './img'
    }])
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'ng-annotate!babel?presets[]=es2015,presets[]=stage-0',
        exclude: /node_modules/
      },
      { test: /\.html$/, loader: 'raw' },

      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!sass?sourceMap') },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css!less?sourceMap') },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css') },

      { test: /\.woff2?(.*)?$/, loader: 'file?name=fonts/[name].[ext]' },
      { test: /\.(ttf|eot|svg)(.*)?$/, loader: 'file?name=fonts/[name].[ext]' },
      { test: /\.(png|eot|ttf|svg|jpg)$/, loader: 'url-loader?limit=100000' },
      // { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /[\\\/]modernizr\.custom\.js$/,
        loader: "imports?this=>window,html5=>window.html5!exports?window.Modernizr" }
    ]
  }/*,
  resolve: {
    root: [
      path.resolve('./client/app'),
      path.resolve('./client/app/modules'),
      path.resolve('./client/app/shared')
    ]
  }*/
};
