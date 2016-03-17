'use strict';
var gulp = require('gulp');
var changed = require('gulp-changed');
var newer = require('gulp-newer');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');;
var svgmin = require('gulp-svgmin');
var del = require('del');

var paths = {
  sass: ['sass/main.scss'],
  images: 'assets/img/**/*.png',
  svg: 'assets/img/**/*.svg',
  css: 'assets/css/'
};

// Sass Builder
gulp.task('sass', function () {
  return gulp.src(paths.sass)
    .pipe(newer(paths.css))
    .pipe(changed(paths.css))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(paths.css));
});
// Compress SVG
gulp.task('svgmin', function () {
    return gulp.src(paths.svg)
        .pipe(newer('build/svg'))
        .pipe(changed('build/svg'))
        .pipe(svgmin())
        .pipe(gulp.dest('build/svg'));
});
// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['build']);
});

// Copy all static images
gulp.task('images', function() {
  return gulp.src(paths.images)
    .pipe(newer('build/img'))
    .pipe(changed('build/img'))
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('build/img'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  //gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.svg, ['svgmin']);
  gulp.watch(paths.sass, ['sass']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'sass','images']);