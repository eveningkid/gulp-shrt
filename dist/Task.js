"use strict";function Task(r,e,t,i){r=r.replace(" ","");var n,o=[],a=r.indexOf("{");if(-1!==a){var u=r.match(/{(.*?)}/).slice(1)[0].split(","),l=!0,f=!1,c=void 0;try{for(var s,p=u[Symbol.iterator]();!(l=(s=p.next()).done);l=!0){var v=s.value;v&&o.push(v)}}catch(h){f=!0,c=h}finally{try{!l&&p["return"]&&p["return"]()}finally{if(f)throw c}}n=r.slice(0,a)}else n=r;var y;y="function"==typeof e?e:"undefined"==typeof e?function(){}:function(){Short(e,t,i)},gulp.task(n,o,y)}var gulp=require("gulp"),Short=require("./Short");module.exports=Task;