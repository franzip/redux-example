const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');

const bundler = browserify({
  entries: './client/src/main.jsx',
  extensions: ['.jsx'],
  debug: true
});

const babelifyOpts = { presets: ["es2015", "react"] };

gulp.task('build', () => {
  return bundler
    .transform(babelify, babelifyOpts)
    .bundle()
    .pipe(source('./main.js'))
    .pipe(gulp.dest('./client/dist'));
});

gulp.task('watch', ['build'], () => {
    gulp.watch('./client/src/**/*.jsx', ['build']);
});

gulp.task('default', ['build']);
