/**
 * Created by dima on 18/05/2017.
 */
import 'babel-polyfill';
import gulp from 'gulp';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import webserver from 'gulp-webserver';
import eslint from 'gulp-eslint';
import browserify from 'browserify';
import del from 'del';
import gutil from 'gulp-util';
import uglify from 'gulp-uglify';
import gulpif from 'gulp-if';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

const buildStrategy = (gutil.env.build === 'browser' ? gutil.env.build : 'console');
let defaultTasks;
let taskStrategy;

gutil.env.production = !!gutil.env.production;

if (buildStrategy === 'browser') {
  defaultTasks = ['lint', 'webserver'];
  taskStrategy = 'browserify';
} else {
  defaultTasks = ['lint', 'watch'];
  taskStrategy = 'compile';
}

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

// Task for clean building directory
gulp.task('clean', () => del('app/dist'));

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
gulp.task('compile', () => gulp.src(['src/classes/*.js', 'src/*.js'], { base: './src/' })
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['es2015'],
  }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('app/dist')));

gulp.task('browserify', () => {
  browserify({ debug: true })
    .transform(babelify)
    .require('src/test.js', { entry: true })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(gulpif(gutil.env.production, uglify()))
    .pipe(gulpif(!gutil.env.production, sourcemaps.write('.')))
    .pipe(gulp.dest('app/dist'));
});

// start webserver to test project
gulp.task('webserver', ['watch'], () => {
  gulp.src('app')
    .pipe(webserver({
      livereload: true,
      open: true,
    }));
});

// start watch task and recompile/lint on changes
gulp.task('watch', [taskStrategy], () => {
  gulp.watch(['src/**/*.js', 'app/*.html'], ['lint', taskStrategy]);
});

gulp.task('build', [taskStrategy]);

gulp.task('default', defaultTasks);
