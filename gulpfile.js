var shrt = require("./lib/gulp-shrt")
var task = shrt.task
var watch = shrt.watch

var del = require("del")
var paths = {
	build: "./lib/*.js"
}

task("clean", function () {
	del("./dist/**/*.*")
})

task("build{clean}", paths.build, [
	{babel: {presets: ["es2015"]}},
	"uglify"
], "dist")

task("default", watch(paths.build, "build"))
