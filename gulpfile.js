var gulp = require('gulp');
var rename = require('gulp-rename');

// Build Dependencies
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

// Style Dependencies
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

// Development Dependencies
var jshint = require('gulp-jshint');

// Linting (all settings are configured in .jshintrc)
gulp.task('lint', function() {
  return gulp.src('./app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Build all of the javascripts
gulp.task('browserify', ['lint'], function() {
  return gulp.src('app/app.js')
    .pipe(browserify({
      insertGlobals: true
    }))
    .pipe(gulp.dest('build'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('styles', function() {
  return gulp.src('app/sass/all.scss')
    .pipe(sass())
    .pipe(prefix({ cascade: true }))
    .pipe(gulp.dest('build'))
    .pipe(gulp.dest('public/css'));
});

gulp.task('minify', ['styles'], function() {
  return gulp.src('build/all.css')
    .pipe(minifyCSS())
    .pipe(rename('all.min.css'))
    .pipe(gulp.dest('public/css'));
});

gulp.task('uglify', ['browserify'], function() {
  return gulp.src('build/app.js')
    .pipe(uglify())
    .pipe(rename('all.app.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('build', ['uglify', 'minify']);

gulp.task('watch', function() {
  gulp.watch('app/**/*.js', ['browserify']);
});

// Run `gulp` to build & watch
gulp.task('default', ['build', 'watch']);
