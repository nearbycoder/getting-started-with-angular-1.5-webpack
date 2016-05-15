'use strict';

//require in webpack
var webpack = require('webpack');

//require in HtmlWebpackPlugin for index.html creation
var HtmlWebpackPlugin = require('html-webpack-plugin');

//require in CopyWebpackPlugin to copy all files over
var CopyWebpackPlugin = require('copy-webpack-plugin');

//require in node standard lib path to resolve directories
var path = require('path');

// declare env for checking build as production
var ENV = process.env.npm_lifecycle_event;

// set isProd to true if we are in the build environment lifecycle
var isProd = ENV === 'build';

/*
* Webpack requires a config objects to set all the defaults
* We are returning a self invoked function that returns the 
* config object below
*/

//basic self invoking function that gets sent to webpack during run.
module.exports = (function makeWebpackConfig () {

  // set initial empty object
  var config = {};

  // pass in the root app path entry
  config.entry = {
    app: './src/app/app.js'
  };

  config.output = {
    // pass the path to the output directory
    path: path.resolve(__dirname, './dist'),
    // set the public path which  specifies the public URL 
    // address of the output files when referenced in a browser.
    publicPath: isProd ? '/' : 'http://localhost:8080/',
    // set the filename
    filename: isProd ? '[name].[hash].js' : '[name].bundle.js',
    chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
  };

  if (isProd) {
    //A SourceMap is emitted
    config.devtool = 'source-map';
  } else {
    // Each module is executed with eval 
    // and a SourceMap is added as DataUrl to the eval.
    config.devtool = 'eval-source-map';
  }

  config.resolve = {
    // monkey patch resolve to include directory for views.
    // this will allow easier access to importing html files
    // within angular
    modulesDirectories: [
      'node_modules',
      'src/public/views'
    ]
  };

  config.module = {
    preLoaders: [],
    // setup all the loaders required
    loaders: [{
      test: /\.js$/,
      // add ng-annotate for ngInject, compile with babel
      loaders: ['ng-annotate', 'babel'],
      exclude: /node_modules/
    }, {
      // load all scss files using sass then css then style
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }, {
      // any images or font files grab for CopyWebpackPlugin
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
      loader: 'file'
    }, {
      test: /\.html$/,
      // Pre-loads the AngularJS template cache to remove initial load times of templates.
      loader: 'ngtemplate?relativeTo=' + (path.resolve(__dirname, './src')) + '/!html',
      exclude: /index\.html/
    }]
  };

  // setup empty array to push plugins to
  config.plugins = [];

  config.plugins.push(
    new HtmlWebpackPlugin({
      template: './src/public/views/index.html',
      inject: 'body'
    })
  );

  // run if build phase
  if (isProd) {
    config.plugins.push(
      // When there are errors while compiling this plugin skips the emitting phase 
      new webpack.NoErrorsPlugin(),
      // Search for equal or similar files and deduplicate them in the output.
      new webpack.optimize.DedupePlugin(),
      // Minimize all JavaScript output of chunks. Loaders are switched into minimizing mode. 
      new webpack.optimize.UglifyJsPlugin(),
      // copies individual files or entire directories to the build directory.
      new CopyWebpackPlugin([{
        from: path.resolve(__dirname, './src/public')
      }], { ignore: ['*.html'] })
    );
  }

  // set dev server for testing options
  config.devServer = {
    contentBase: './src/public',
    stats: 'minimal'
  };

  // return config object
  return config;
}());

