var gulp = require('gulp');
var babel = require('gulp-babel');
var clean = require('gulp-clean');

gulp.task('compile', ['clean'], function() {
  return gulp.src('lib/**/*.js')
        .pipe(babel({ stage: 0 }))
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
  return gulp.src('dist/')
         .pipe(clean());
});