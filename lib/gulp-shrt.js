var gulp = require("gulp");

var Plugin = require("./Plugin");
var Task = require("./Task");
var Watch = require("./Watch");
var Short = require("./Short");

module.exports = Short;
module.exports.task = Task;
module.exports.watch = Watch;