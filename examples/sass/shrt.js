var shrt = require("gulp-shrt")
var del = require("del")

shrt.task("sass{clean}", "file.scss", [
	{sass: {outputStyle: "compact"}, on: {error: function (err) {}}},
	{autoprefixer: {browsers: ['last 2 versions'], cascade: false}}
], ".")

shrt.task("clean", function () {
	del("*.css")
})