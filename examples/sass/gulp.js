var gulp = require("gulp")
var sass = require("gulp-sass")
var autoprefixer = require("gulp-autoprefixer")
var del = require("del")

gulp.task("sass", ["clean"], function () {
	return gulp.src("file.scss")
		.pipe(sass({outputStyle: "compact"}).on("error", function (err) {}))
		.pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
		.pipe(gulp.dest("."))
})

gulp.task("clean", function () {
	del("*.css")
})
