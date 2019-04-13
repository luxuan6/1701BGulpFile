const gulp = require("gulp");
const cssclen = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const css = require('gulp-sass');
const webserver = require("gulp-webserver");
gulp.task('Js', function() {
    return gulp.src('./src/js/*.js')
        .pipe(babel({
            presets: 'es2015'
        }))
        .pipe(concat('min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./bil/js'))
})

gulp.task("webserver", function() {
    return gulp.src('./src/')
        .pipe(webserver({
            open: true,
            port: 8787,
            livereload: true
        }))
})

gulp.task("cssMin", function() {
    return gulp.src("./src/css/*.css")
        .pipe(cssclen())
        .pipe(gulp.dest('./bil/css/'))
})

gulp.task("sass", function() {
    return gulp.src("./src/css/sass/*.scss")
        .pipe(css())
        .pipe(gulp.dest('./src/css/'))
})

gulp.task("watch", function() {
    gulp.watch('./src/css/sass/*.scss', gulp.series('sass'))
})

gulp.task("dev", gulp.series('sass', 'webserver', 'watch'));
gulp.task('build', gulp.parallel('cssMin', 'Js'))