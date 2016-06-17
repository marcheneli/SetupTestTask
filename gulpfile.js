var gulp         = require('gulp'),
		sass         = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		cleanCSS    = require('gulp-clean-css'),
		rename       = require('gulp-rename'),
		browserSync  = require('browser-sync').create(),
		concat       = require('gulp-concat'),
		uglify       = require('gulp-uglify');

var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');

gulp.task('browser-sync', ['styles', 'scripts'], function() {
		browserSync.init({
				server: {
						baseDir: "./"
				},
				notify: false
		});
});

gulp.task('styles', function () {
	return gulp.src('sass/*.sass')
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
	.pipe(cleanCSS())
	.pipe(gulp.dest('css/'))
	.pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  return gulp.src('src/app.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('js/'));
});

gulp.task('watch', function () {
	gulp.watch('sass/*.sass', ['styles']);
	gulp.watch('src/**/*.js', ['scripts']);
	gulp.watch('js/*.js').on("change", browserSync.reload);
	gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);