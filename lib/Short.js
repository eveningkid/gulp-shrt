var gulp = require("gulp");
var gutil = require("gulp-util");
var Plugin = require("./Plugin");

function Short (from, cmds, to) {

	this.cmds = (cmds instanceof Array) ? cmds : [cmds];

	var stream = gulp.src(from);
	var plugin;

	this.cmds.forEach(function (cmd) {
		plugin = new Plugin().init(cmd);

		// gutil.log("Task using", (plugin.pipe ? (plugin.pipe[0].name || "magic") : plugin.name));
		stream = stream.pipe((plugin.pipe ? plugin.pipe[0].apply(this, plugin.pipe.slice(1)) : require(plugin.name).apply(this, plugin.args)));

		// Events listeners
		if (plugin.events) {
			for (var event in plugin.events) {
				stream.on(event, plugin.events[event]);
			}
		}
	});

	if (to) {
		return stream.pipe(gulp.dest(to));
	}

}

module.exports = Short;