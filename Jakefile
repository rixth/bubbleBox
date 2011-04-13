//
// Jakefile for bubbleBox
//

var sys = require('sys'),
    exec  = require('child_process').exec;

desc("This builds the uglified version of bubbleBox JS");
task('default', [], function () {
  exec('/usr/local/bin/uglifyjs -nc -o src/jquery.bubbleBox.min.js src/jquery.bubbleBox.js', function (error, stdout, stderr) {
    if (error !== null) {
      console.log('Uglify error: ' + error);
    }
  });
});