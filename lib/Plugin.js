function Plugin (cmd) {

	this.name;
	this.args;
	this.events;
	this.pipe;

}

Plugin.prototype.init = function (cmd) {
	var name = cmd;
	var args, events;

	if (typeof(cmd) === "object") {
		// Retrieve plugin name and eventually "on" events
		for (var key in cmd) {
			if (key === "on") {
				// We are dealing with the events
				events = cmd[key];
			} else if (key === "pipe") {
				this.pipe = cmd[key];
			} else {
				name = key;
				args = cmd[key];
			}
		}

		if (!(args instanceof Array)) args = [args];
	}

	// If no module name was given, i.e. {} or {on:fn}
	if (typeof(name) !== "string" && !this.pipe) {
		throw new Error("No module name was given for that task. Try {moduleName: args, (on: {error: fn, ...})} or 'moduleName' instead");
	}

	this.name = "gulp-" + name;
	this.args = args || [];
	this.events = events;

	return this;
}

module.exports = Plugin;