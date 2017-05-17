/**
 * Created by dima on 18/05/2017.
 */

import gulp  from 'gulp';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import webserver from 'gulp-webserver';

gulp.task('compile', () => {
    return gulp.src('src/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('app/dist'));
});

gulp.task('webserver', function() {
    gulp.src('app')
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});

gulp.task('watch', ['compile'], () => {
    return gulp.start(['webserver']);
});

gulp.task('default', ['watch']);
