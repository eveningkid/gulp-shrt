# gulp-shrt
Make gulp syntax *shrt*er.

## Why?

You might sometimes want to quickly set up your tasks without using any generators.  

Considering you want to use `gulp-sass` on a `style.scss` file:

```javascript
var gulp = require("gulp")
var sass = require("gulp-sass")

gulp.task("sass", ["clean"], function () {
	return gulp.src("file.scss")
		.pipe(sass())
		.pipe(gulp.dest("."))
})

gulp.task("clean", function () {
	del("*.css")
})
```

Then make it `shrt`er:

```javascript
var task = require("gulp-shrt").task
var del = require("del")

task("sass{clean}", "file.scss", "sass", ".")

task("clean", function () {
	del("*.css")
})
```

> Disclaimer: using `gulp-shrt` will slow down a little your gulp tasks' execution.

## Get the module

```bash
$ npm install --save gulp-shrt
```

Don't forget that you need a `package.json` (initializable using `npm init`) file at the root of your project so then you can install `gulp-shrt`.

## How to use it?

You can either consult examples (available in /examples) or read the following API.

## API

### shrt(from, cmds[, to])

Create a `gulp` stream starting with `gulp.src(from)`, then `pipe()`'ing each command from `cmds` and -- if given -- ends with `gulp.dest(to)`.

#### Parameters

*String | Array* -- **from** : pattern(s) matching file(s).  
Examples: `"*.js"`, `["lib/**/*.*", "*.css"]`

*String | Object | Array* -- **cmds**: 
- String:  `"command"` (without brackets) refers to the `"gulp-command"` module and will call its constructor **without arguments**.  
Examples: `"sass"` will execute `.pipe(require("gulp-sass")())`.
- Object: 
	- **not using** module method: `{moduleName: args || [arg1,arg2,...]}`:  
        ```javascript
        {sass: {outputStyle: "compact"}}
        
        // will execute
        
        .pipe(require("gulp-sass")(
        	{outputStyle: "compact"}
        ))
        ```  
        ```javascript
        {module: [3, {foo: "bar"}]}
        
        // will execute
        
        .pipe(require("gulp-module")(
        	3, 
            {foo: "bar"}
        ))
        ```
	- **using** module method: `{pipe: [moduleInstance.method, args]}`:  
    	```javascript
        var sourcemaps = require("gulp-sourcemaps")
        
        // later
        
        {pipe: [sourcemaps.init]} // or {pipe: [sourcemaps.init, []}
        
        // will execute
        
        .pipe(sourcemaps.init())
    	```  
 
- Array: `[..., ..., ...]` will evaluate each command either as a *String* or as an *Object*.  

*String* -- **to** (optional): destination for stream output (using `.pipe(gulp.dest(to))`).  
Examples: `'.'`, `"build/css"`

#### Example

```javascript
shrt("f.js", "uglify", "build/js")
shrt("*.babel.js", [
	{babel: {presets: ["es2015"]}},
    "uglify"
], "build/js")
```
---

### shrt.task(name, from, [cmds[, to]])

Call `gulp.task()` named `name` using mentionned dependencies, then call `shrt(from, cmds, to)`.

#### Parameters

*String* -- **name**: Task name, eventually followed by task dependencies.  
Examples: `"hello"`, `"hello{clean}"`, `"hello{clean, check}"`

*String | Array | Function* -- **from**: pattern(s) matching file(s) **or** the function to execute (as with a `gulp.task("name", function () {})`.  
If `from` is a function, `cmds` and `to` are unecessary (they will be ignored).  
Examples: `"*.js"`, `["lib/**/*.*", "*.css"]`, `function () { ... }`

**cmds**, **to**: Please, refer to `short`'s `cmds`, and `to` arguments.

#### Example

```javascript
shrt.task("hello{clean}", "file.scss", "sass", "build")
shrt.task("world", function () { ... })
shrt.task("42", ["t.js", "lib/o.js"], ["babel", "uglify"], ".")
```
---

### shrt.watch(src, tasks), shrt.watch([ [src, tasks], ... ]

Call `gulp.watch()` for each *watching array* using `src` as glob, and `tasks` as tasks to call.

#### Parameters

*String | Array* --  **src**: pattern(s) matching file(s).  
Examples: `"*.js"`, `["lib/**/*.*", "*.css"]`  

*String | Array* -- **tasks**: task(s) to execute (follows array order).  
Examples: `"clean"`, `["clean", "check"]`

#### Example

```javascript
shrt.watch("*.js", "build")
shrt.watch(["*.scss", "tmp/*.scss"], ["clean", "sass"])
```

## License

MIT © [eveningkid](//github.com/eveningkid)
