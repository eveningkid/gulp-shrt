var shrt = require("gulp-shrt")
var sourcemaps = require('gulp-sourcemaps')

var paths = {
	scripts: ['client/js/**/*.coffee', '!client/external/**/*.coffee'],
	images: 'client/img/**/*'
}

shrt.task("clean", function() {
	return del(['build'])
})

shrt.task("scripts{clean}", paths.scripts, [
	{pipe: [sourcemaps.init]},
	"coffee",
	"uglify",
	{concat: "all.min.js"},
	{pipe: [sourcemaps.write]}
], "build/js")

shrt.task("images{clean}", paths.images, {imagemin: {optimizationLevel: 5}}, "build/img")

shrt.task("watch", shrt.watch([
	[paths.scripts, "scripts"],
	[paths.images, "images"]
]))

shrt.task("default{watch, scripts, images}")