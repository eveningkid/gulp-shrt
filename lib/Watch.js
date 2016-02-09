var gulp = require("gulp");
var gutil = require("gulp-util");

function Watch (watch, optDo) {

	// Handling watch(src, do)
	if (optDo) {
		watch = [[watch, optDo]];
	}

	return function () {
		(function (list) {

			list.forEach(function (element) {
				var toDo = (element[1] instanceof Array) ? element[1] : [element[1]];
				gutil.log("Watching", element[0], toDo);
				gulp.watch(element[0], toDo);
			});

		})(watch)
	};
}

module.exports = Watch;