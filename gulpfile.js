/////////////////////////////////////////////////////
// Gulp Dependencies
/////////////////////////////////////////////////////

var gulp = require("gulp"),
		autoprefixer = require("gulp-autoprefixer"),
		concat = require("gulp-concat"),
		jade = require('gulp-jade'),
		sass = require("gulp-ruby-sass"),
		uglify = require("gulp-uglify");

/////////////////////////////////////////////////////
// SASS
/////////////////////////////////////////////////////

gulp.task('sass', function () {
	return sass('public/stylesheets/style.scss', { style: 'compact' })
	.on('error', function (err) {
		console.error('Error!', err.message);
	})
	// .pipe(autoprefixer("last 2 version", "> 1%"))
	.pipe(gulp.dest(function(file) {
		return file.base;
	 }));
});

/////////////////////////////////////////////////////
// Watch
/////////////////////////////////////////////////////

gulp.task("watch", function() {
	gulp.watch(['bower_components/barebones/dist/css/**/*.sass', 'bower_components/barebones/dist/css/**/*.scss', 'bower_components/barebones/assets/css/**/*.sass', 'bower_components/barebones/assets/css/**/*.scss'], ['sass']);
	gulp.watch(['dist/js/**/*.js'], ['uglify']);
});

gulp.task("default", ["watch"], function() {

});