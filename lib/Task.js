var gulp = require("gulp");
var Short = require("./Short");

function Task (name, from, cmds, to) {

	// Instructions to apply dependencies if mentionned
	// "task{dependencies}" or "task"
	name = name.replace(' ', '');

	var taskName;
	var dependencies = [];
	var depI = name.indexOf('{');

	if (depI !== -1) {
		var list = name.match(/{(.*?)}/).slice(1)[0].split(',');

		for (var dep of list) {
			if (dep) dependencies.push(dep.trim());
		}

		taskName = name.slice(0, depI);
	} else {
		taskName = name;
	}

	var handler;

	// Checking if it's a watching task or a simple function
	if (typeof(from) === "function") {
		handler = from;
	} else if (typeof(from) === "undefined") {
		handler = function () {
			// Empty call
		};
	} else {
		handler = function () {
			Short(from, cmds, to);
		};
	}

	// Create the gulp task
	gulp.task(taskName, dependencies, handler);

}

module.exports = Task;