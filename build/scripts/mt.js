'use strict';

var ChildProcess = require('child_process');

var manifestPath = "../../assets/Edith_Path.exe.manifest";
var outputResourcePath = "../../release/Edith-path-win32-x64/Edith-path.exe";
var mtCommand = "mt.exe -manifest " + manifestPath + " -outputresource:" + outputResourcePath;


ChildProcess.exec("cd build/bin/" + process.arch + " & " + mtCommand, function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
		console.log('exec error: ' + error);
	}
});
