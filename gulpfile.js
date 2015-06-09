'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var path = require('path');
var runSequence = require('run-sequence');
var webpack = require('webpack');
var argv = require('minimist')(process.argv.slice(2));

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

var PATHS = {
  dist: './dist',
  templates: './index.html',
  assets: 'lib/**/*.{png,jpg,jpeg,gif,svg,woff,ttf}',
  scss: './lib/**/*.scss',
  webpackConfig: './webpack.config.js'
};

gulp.task('default', ['build']);

gulp.task('clean', del.bind(
  null, ['.tmp', PATHS.dist + '/*', '!' + PATHS.dist + '/.git'], {dot: true}
));

gulp.task('assets', function() {
  return gulp.src(PATHS.assets)
    .pipe($.changed(PATHS.dist))
    .pipe(gulp.dest(PATHS.dist))
});

gulp.task('styles', function() {
  return gulp.src(PATHS.scss)
    .pipe($.plumber())
    .pipe($.sass())
    .on('error', console.error.bind(console))
    .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    .pipe($.csscomb())
    .pipe($.minifyCss())
    .pipe(gulp.dest(PATHS.dist))
});

gulp.task('bundle', function(cb) {
    var config = require(PATHS.webpackConfig);

    webpack(config, function(err, stats) {
        if(err) throw new $.util.PluginError("webpack:build", err);
        $.util.log("[webpack:build]", stats.toString({
            colors: true
        }));
        cb();
    });
});

gulp.task('build', ['clean'], function(cb) {
  runSequence(['assets', 'styles', 'bundle'], cb);
});
