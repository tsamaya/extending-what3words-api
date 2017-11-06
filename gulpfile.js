var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');

/**
 * sources
 * @type {Array}
 */
var sources = ['server.js', 'lib/**/*.js', 'test/**/*.js'];
var testSources = ['test/environementSpec.js', 'test/**/*.js'];
/**
 * LINTER
 */
gulp.task('lint', function () {
  return gulp.src(sources).pipe(eslint())
    .pipe(eslint.format())
    // Brick on failure to be super strict
    .pipe(eslint.failOnError());
});

/**
 * TEST
 */
gulp.task('mocha', function () {
  return gulp
    .src(testSources, {
      read: false
    })
    .pipe(mocha({
      reporter: 'spec',
      timeout: 10000
    }))
    .on('error', gutil.log);
});
gulp.task('test', ['lint', 'mocha']);

/**
 * WATCH
 */
gulp.task('watch', function () {
  gulp.watch(sources, ['test']);
});

/**
 * DEFAULT TASK
 */
gulp.task('default', ['test', 'watch']);
