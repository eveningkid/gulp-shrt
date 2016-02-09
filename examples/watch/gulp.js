var gulp = require("gulp")

gulp.task("watch", function () {
	gulp.watch(["client/js/**/*.coffee", "!client/external/**/*.coffee"], ["scripts"])
	gulp.watch("client/img/**/*", ["images"])
})

gulp.task("scripts", function () {
	// ...
})

gulp.task("images", function () {
	// ...
})
