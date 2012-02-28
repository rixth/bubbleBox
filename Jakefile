//
// Jakefile for the pages branch of bubbleBox
// Essentially it grabs a few files and brings them in to
// this branch.
//

var exec = require('child_process').exec,
    path = require('path'),
    fs   = require('fs');

desc("Pulls in files from the master branch");
task('default', function () {
  var filesToCopy = [
        'src/jquery.bubbleBox.js',
        'src/bubbleBox.css',
        'test/bubbleBox.spec.js',
      ];
      
  (function copyFiles(err, stdout, stderr) {
    if (err) {
      console.log("error copying file!");
      console.log(stderr);
    } else if (filesToCopy.length) {
      exec('git checkout master ' + filesToCopy.shift(), copyFiles);
    }
  })();
});