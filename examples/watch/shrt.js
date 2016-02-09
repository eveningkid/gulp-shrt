var shrt = require("gulp-shrt")

shrt.task("watch", shrt.watch([
	["client/js/**/*.coffee", "!client/external/**/*.coffee"], "scripts"],
	["client/img/**/*", "images"]
]))

shrt.task("scripts", function () {
	// ...
})

shrt.task("images", function () {
	// ...
})