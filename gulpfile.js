
// ////////////////////////////////////////////////
// Required 
// ////////////////////////////////////////////////

var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	compass = require('gulp-compass');

// ////////////////////////////////////////////////
// Script Task
// ////////////////////////////////////////////////
gulp.task('scripts', function() {
	gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js'])
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});

// ////////////////////////////////////////////////
// Compass / Sass Tasks
// ////////////////////////////////////////////////
gulp.task('compass', function() {
	gulp.src('app/scss/style.scss')
		.pipe(compass({
			config_file: './config.rb',
			css: 'app/css', 
			sass: 'app/scss',
			require: ['susy']
		}));		
});

// ////////////////////////////////////////////////
// Watch Tasks
// ////////////////////////////////////////////////

gulp.task('watch', function() {
	gulp.watch('app/scss/**/*.scss', ['compass']);
	gulp.watch('app/js/**/*.js', ['scripts']);
});

// ////////////////////////////////////////////////
// Default Task
// ////////////////////////////////////////////////
gulp.task('default', ['scripts', 'compass', 'watch']);