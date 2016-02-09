var gulp = require('gulp')
var coffee = require('gulp-coffee')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var imagemin = require('gulp-imagemin')
var sourcemaps = require('gulp-sourcemaps')
var del = require('del')

var paths = {
	scripts: ['client/js/**/*.coffee', '!client/external/**/*.coffee'],
	images: 'client/img/**/*'
}

gulp.task('clean', function() {
	return del(['build'])
})

gulp.task('scripts', ['clean'], function() {
	return gulp.src(paths.scripts)
		.pipe(sourcemaps.init())
			.pipe(coffee())
			.pipe(uglify())
			.pipe(concat('all.min.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('build/js'))
})

gulp.task('images', ['clean'], function() {
	return gulp.src(paths.images)
		.pipe(imagemin({optimizationLevel: 5}))
		.pipe(gulp.dest('build/img'))
})

gulp.task('watch', function() {
	gulp.watch(paths.scripts, ['scripts'])
	gulp.watch(paths.images, ['images'])
})

gulp.task('default', ['watch', 'scripts', 'images'])