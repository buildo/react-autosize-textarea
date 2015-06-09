var webpack = require('webpack');

module.exports = function (config) {
  config.set({

    browserNoActivityTimeout: 30000,

    browsers: [ process.env.CONTINUOUS_INTEGRATION ? 'Firefox' : 'Chrome'  ],

    singleRun: process.env.CONTINUOUS_INTEGRATION === 'true',

    frameworks: [ 'mocha' ],

    files: [
      'tests.webpack.js'
    ],

    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ],
      'lib/**/*.jsx': [ 'coverage' ]
    },

    reporters: [ (process.env.CONTINUOUS_INTEGRATION ? 'dots' : 'nyan'), 'coverage', 'coveralls' ],

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [{
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }]
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('test')
        })
      ]
    },

    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },

    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/'
    }
  });
};
