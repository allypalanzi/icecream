var gulp          = require('gulp'),
    rename        = require('gulp-rename'),

    // JS Dependencies
    browserify    = require('gulp-browserify'),
    uglify        = require('gulp-uglify'),
    concat        = require('gulp-concat'),

    // Style Dependencies
    sass          = require('gulp-sass'),
    prefix        = require('gulp-autoprefixer'),
    minifyCSS     = require('gulp-minify-css'),

    // Development Dependencies
    jshint        = require('gulp-jshint'),
    browserSync   = require('browser-sync'),
    reload        = browserSync.reload;

// JavaScript linting (all settings are configured in .jshintrc)
gulp.task('lint', function() {
  return gulp.src('./app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Build all of the javascripts
gulp.task('browserify', ['lint'], function() {
  return gulp.src('app/js/app.js')
    .pipe(browserify({
      insertGlobals: true,
      debug: true
    }))
    // Bundle to a single file
    .pipe(concat('app.js'))
    // Minify
    // .pipe(uglify())
    .pipe(rename('app.min.js'))
    // Output it to our dist folder
    .pipe(gulp.dest('public/js'))
    .pipe(reload({stream:true}));
});

// Build all of the sass
gulp.task('styles', function() {
  return gulp.src('app/sass/all.scss')
    .pipe(sass())
    .pipe(prefix({ cascade: true }))
    .pipe(minifyCSS())
    .pipe(rename('all.min.css'))
    .pipe(gulp.dest('public/css'))
    .pipe(reload({stream:true}));
});

// Views task
gulp.task('views', function() {
  // Get our index.html
  gulp.src('app/index.html')
  // And put it in the dist folder
  .pipe(gulp.dest('public/'))
  .pipe(reload({stream:true}));

  // Any other view files from app/views
  gulp.src('./app/templates/**/*')
  // Will be put in the dist/views folder
  .pipe(gulp.dest('app/teplates/'))
  .pipe(reload({stream:true}));
});

// Static Server & auto reload
gulp.task('serve', function() {
  browserSync({
      port: 1337,
      server: {
          baseDir: "public/"
      }
  });
});

// Build files
gulp.task('build', ['browserify', 'styles', 'views']);

// Watch all of da things
gulp.task('watch', function() {
  gulp.watch('app/**/*.scss', ['styles']);
  gulp.watch('app/**/*.js', ['browserify']);
  gulp.watch('app/*.html', ['views']);
});

// Run `gulp` to serve and watch
gulp.task('default', ['serve', 'build', 'watch']);
