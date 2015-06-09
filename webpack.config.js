'use strict';

var webpack = require('webpack');

var config = {

  entry: './lib/index',

  output: {
    path: './dist/',
    filename: 'react-textarea-autosize.min.js',
    library: 'ReactTextareaAutosize',
    libraryTarget: 'umd'
  },

  cache: false,
  debug: true,

  stats: {
    colors: true,
    reasons: true
  },

  plugins: [
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
  },

  externals: [{
    "react": {
      root: "react",
      commonjs2: "react",
      commonjs: "react",
      amd: "react"
    }
  }, {
    "react/addons": {
      root: "react/addons",
      commonjs2: "react/addons",
      commonjs: "react/addons",
      amd: "react/addons"
    }
  }],

  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader!'
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
};

module.exports = config;
