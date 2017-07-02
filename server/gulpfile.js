'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');

const RELOAD_DELAY = 2000;

gulp.task('default', ['browser-sync'], function () {});


gulp.task('browser-sync', ['nodemon'], function() {

  browserSync.init(null, {
    proxy: "http://localhost:3000",
    browser: "google chrome",
    port: 7000,
    open: false
  });
});

gulp.task('nodemon', function (cb) {

  var started = false;

  var options = {
    script: 'bin/www',
    ext: 'js'
  };

  nodemon(options)
  .on('crash', function () {
    console.log('script crashed for some reason');
  })
  .on('start', function () {

    if (!started) {
      cb();
      started = true;
    }
  })
  .on('restart', function () {

    // setTimeout(function reload() {
    //     browserSync.reload({ stream: false });
    //     cb();
    // }, RELOAD_DELAY);

  });

});
