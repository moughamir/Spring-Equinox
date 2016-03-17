'use strict';
var gulp = require('gulp'),
    changed = require('gulp-changed'),
    newer = require('gulp-newer'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    svgmin = require('gulp-svgmin'),
    del = require('del');

var paths = {
  sass: ['sass/**/*'],
  svg: 'assets/img/**/*.svg',
  css: 'assets/css/'
},
autoprefixerOptions = {
      browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

// Sass Builder
gulp.task('sass', function () {
  return gulp.src(paths.sass)
    .pipe(newer(paths.css))
    .pipe(changed(paths.css))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
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


// Rerun the task when a file changes
gulp.task('watch', function() {
  //gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.svg, ['svgmin']);
  gulp.watch(paths.sass, ['sass']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'sass','svgmin']);