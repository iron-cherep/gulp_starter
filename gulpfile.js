
// ////////////////////////////////////////////////
// Required 
// ////////////////////////////////////////////////

var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	plumber = require('gulp-plumber'),	
	compass = require('gulp-compass'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	autoprefixer = require('gulp-autoprefixer'),
	del = require('del');

// ////////////////////////////////////////////////
// JS Script Task
// ////////////////////////////////////////////////

gulp.task('scripts', function() {
	gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js'])
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
	.pipe(reload({stream:true}));
});

// ////////////////////////////////////////////////
// Compass / Sass Tasks
// ////////////////////////////////////////////////

gulp.task('compass', function() {
	gulp.src('app/scss/style.scss')
		.pipe(plumber())
		.pipe(compass({
			config_file: './config.rb',
			css: 'app/css', 
			sass: 'app/scss',
			require: ['susy']
		}))
		.pipe(autoprefixer('last 2 versions'))
		.pipe(gulp.dest('app/css/'))
		.pipe(reload({stream:true}));		
});


// ////////////////////////////////////////////////
// HTML Tasks
// ////////////////////////////////////////////////

gulp.task('html', function() {
	gulp.src('app/**/*.html')
	.pipe(reload({stream:true}));
});


// ////////////////////////////////////////////////
// Browser-Synk Tasks
// ////////////////////////////////////////////////

gulp.task('browser-sync', function() {
	browserSync({
		server:{
			baseDir: "./app/"
		}
	});
});

// ////////////////////////////////////////////////
// Watch Tasks
// ////////////////////////////////////////////////

gulp.task('watch', function() {
	gulp.watch('app/scss/**/*.scss', ['compass']);
	gulp.watch('app/js/**/*.js', ['scripts']);
	gulp.watch('app/**/*.html', ['html']);
});


// ////////////////////////////////////////////////
// Build Task
// ////////////////////////////////////////////////

// clean out all files and folders from build folder
gulp.task('build:cleanfolder', function () {
	return del(['build/**']);
});

// task to create build directory of all files
gulp.task('build:copy', ['build:cleanfolder'], function() {
	return gulp.src('app/**/*/')
    		   .pipe(gulp.dest('build/'));
    			 
});

// task to removed unwanted build files
// list all files and directories here that you don't want included
gulp.task('build:remove', ['build:copy'], function() {
    del([
    	'build/scss/', 
		'build/js/!(*.min.js)',
		'build/bower.json',
		'build/bower_components/',
		'build/maps/'
	   ]);
});


gulp.task('build', ['build:remove']);
		
// ////////////////////////////////////////////////
// Default Task
// ////////////////////////////////////////////////

gulp.task('default', ['scripts', 'compass', 'html', 'browser-sync', 'watch']);