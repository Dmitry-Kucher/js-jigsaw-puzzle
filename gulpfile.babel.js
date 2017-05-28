/**
 * Created by dima on 18/05/2017.
 */

import gulp from 'gulp';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import webserver from 'gulp-webserver';
import eslint from 'gulp-eslint';
import concat from 'gulp-concat';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

const config = {
  paths: [
    '**/*.js',
    '**/*.jsx',
    '!node_modules/**/*.js',
    '!build/**/*.js',
    '!docs/**/*.js',
    '!example/**/*.js',
    '!lib/**/*.js',
    '!lib/**/*.jsx',
    '!**/bundle.js',
  ],
  rules: {
    extends: 'airbnb',
  },
};

// Task for linting all JavaScript code.
gulp.task('lint', () => gulp.src(config.paths)
    .pipe(eslint())
    .pipe(eslint.format()),
);

// Task for linting and fixing all JavaScript code.
gulp.task('lint:fix', () => {
  const fixRules = Object.assign({}, config.rules, { fix: true });
  return gulp.src(config.paths, { base: '.' })
        .pipe(eslint(fixRules))
        .pipe(gulp.dest('.'))
        .pipe(eslint.format());
});

// compile ES6 with babel
gulp.task('compile', () => gulp.src(['src/classes/*.js', 'src/*.js'])
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['es2015'],
  }))
  .pipe(concat('main.js'))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('app/dist')));

gulp.task('browserify', () => browserify('./app/dist/main.js')
  .bundle()
  .pipe(source('app/dist/bundle.js'))
  .pipe(buffer())
  .pipe(gulp.dest('app/dist')));

// start webserver to test project
gulp.task('webserver', () => {
  gulp.src('app')
        .pipe(webserver({
          livereload: true,
          open: true,
        }));
});

// start watch task and recompile/lint on changes
gulp.task('watch', () => {
  gulp.watch(['src/**/*.js', 'app/*.html'], ['lint', 'compile']);
});

gulp.task('default', ['lint', 'compile', 'browserify', 'webserver', 'watch']);
