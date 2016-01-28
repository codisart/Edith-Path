'use strict';

var Application = require('app');  // Module to control application life.
var OperatingSystem = require('os');

if (OperatingSystem.platform() != 'win32') {
    Application.quit();
}

try {
	var CONF = require('./config/dev.js')
}
catch (e) {
	try {
		var CONF = require('./config/release.js')
	}
	catch (e) {
		var CONF = require('./config/setup.js')
	}
}

var ChildProcess = require('child_process');
var FileSystem = require('fs');
var Winreg = require('winreg');

var PathParser = require('./app/libs/path/parser');

if (process.argv.slice(2).length > 0) {
    Application.quit();
}

var regKey = new Winreg({
    hive: Winreg.HKLM,
    key:  '\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment'
});

var executableName = 'edith-path.exe';

if (process.argv[1] && process.argv[0].toLowerCase().substr(-executableName.length) === executableName) {
	FileSystem.stat(process.argv[1], function(err, stats) {
		if (err) {
			Application.quit();
		}
		if(stats.isDirectory()) {
			regKey.get('Path', function(err, item) {
				if (err) {
					Application.quit();
				}
				try {
					var newPathStringValue = '"' + item.value + ';' + process.argv[1] + '"';
					ChildProcess.exec("cd " + CONF.golang.path + " & edith-path.exe " + newPathStringValue, function (error, stdout, stderr) {
						Application.quit();
					});
				}
				catch (e) {
					Application.quit();
				}
			});
		}
	});
} else {
	var BrowserWindow = require('browser-window');  // Module to create native browser window.
	const IpcMain = require('electron').ipcMain;

	// Keep a global reference of the window object, if you don't, the window will
	// be closed automatically when the JavaScript object is garbage collected.
	var mainWindow = null;

	// Quit when all windows are closed.
	Application.on('window-all-closed', function() {
	    Application.quit();
	});

	// This method will be called when Electron has finished
	// initialization and is ready to create browser windows.
	Application.on('ready', function() {
	    // Create the browser window.
	    mainWindow = new BrowserWindow({
	        width: 750,
	        height: 650,
	        icon: 'img/icon.png',
	    });
	    // mainWindow.setResizable(false);

	    var webContents = mainWindow.webContents;

	    // and load the index.html of the app.
	    mainWindow.loadURL('file://' + __dirname + '/index.html');

	    webContents.on('did-finish-load', function() {
	        regKey.get('Path', function(err, item) {
	            if (!err) {
					buildHtmlData(PathParser.parseString(item.value)).then(
						function (values) {
	                		webContents.send('data-folders', values);
						}
					);
	            }
	        });
	    });

	    IpcMain.on('add-folders', function(event, arg) {
	        regKey.get('Path', function(err, item) {
	            if (!err) {
	                try {
	                    var pathArrayValue = PathParser.parseArray(arg);
						var newPathStringValue = '"' + item.value + ';' + pathArrayValue + '"';
						ChildProcess.exec("cd " + CONF.golang.path + " & edith-path.exe " + newPathStringValue, function (error, stdout, stderr) {
							if (error) {
								console.log('exec error: ' + error);
							} else {
								buildHtmlData(PathParser.parseString(item.value)).then(
									function (values) {
										console.log(values);
			                    		webContents.send('data-folders', values);
									}
								);
							}
						});
	                }
	                catch (e) {
	                    event.sender.send('error-paths', 'plop');
	                }
	            }
	        });
	    });

	    IpcMain.on('refresh-folders', function(event, arg) {
	        regKey.get('Path', function(err, item) {
	            if (!err) {
					buildHtmlData(PathParser.parseString(item.value)).then(
						function (values) {
	                		webContents.send('data-folders', values);
						}
					);
	            }
	        });
	    });

	    function buildHtmlData(pathArrayValue) {
	        var folders = [];

	        var arrayLength = pathArrayValue.length;
	        for (var i = 0; i < arrayLength; i++) {
	            var folder = {
					path: pathArrayValue[i],
					exists: false,
				};
				folders.push(folder);
			}

			var promises = folders.map(function(folder) {
				return new Promise(function (resolve, reject) {
					FileSystem.stat(folder.path, function(err, stats) {
						if(err) {
							ChildProcess.exec("echo " + folder.path, function(stderr, stdout, err) {
								if (!err && folder.path != stdout.trim()) {
									FileSystem.stat(stdout.trim(), function(err, stats) {
										if(err) {
											folder.exists = false;
										} else {
											folder.exists = stats.isDirectory();
										}
										resolve(folder);
									});
								}
								folder.exists = false;
								resolve(folder);
							});
						} else {
							folder.exists = stats.isDirectory();
							resolve(folder);
						}
					});
				}).then(
					function (folder) {
						return folder;
					}
				);
			});

			return Promise.all(promises);
	    }

	    // Emitted when the window is closed.
	    mainWindow.on('closed', function() {
	        // Dereference the window object, usually you would store windows
	        // in an array if your app supports multi windows, this is the time
	        // when you should delete the corresponding element.
	        mainWindow = null;
	    });
	});
}
