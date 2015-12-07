'use strict';

var Application     = require('app');  // Module to control application life.
var OperatingSystem = require('os');

/* The app should not run on others platform *//*
if (OperatingSystem.platform() == 'win32') {
    Application.quit();
}
//*/

var FileSystem  = require('fs');
var Winreg      = require('winreg');

var PathParser  = require('./app/libs/path/parser');

if (process.argv.slice(2).length > 0) {
    Application.quit();
}

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

    if (OperatingSystem.platform() == 'win32') {
        var regKey = new Winreg({
            hive: Winreg.HKLM,
            key:  '\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment'
        });

        webContents.on('did-finish-load', function() {
            regKey.get('Path', function(err, item) {
                if (!err) {
                    webContents.send('data-folders', buildHtmlData(PathParser.parseString(item.value)));
                }
            });
        });

        IpcMain.on('add-folders', function(event, arg) {
            regKey.get('Path', function(err, item) {
                if (!err) {
                    try {
                        var pathArrayValue = PathParser.parseArray(arg);
                        var newPathStringValue = item.value + ';' + pathArrayValue;

                        regKey.set('Path', Winreg.REG_SZ, newPathStringValue, function(err) {
                            if (!err) {
                                event.sender.send('data-folders', buildHtmlData(PathParser.parseString(newPathStringValue)));
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
                    webContents.send('data-folders', buildHtmlData(PathParser.parseString(item.value)));
                }
            });
        });
    }

    function buildHtmlData(pathArrayValue) {
        var folders = [];

        var arrayLength = pathArrayValue.length;
        for (var i = 0; i < arrayLength; i++) {
            var folder = {path: pathArrayValue[i]};

            try {
                var stats = FileSystem.statSync(pathArrayValue[i]);
                if (stats.isDirectory()) {
                    folder.isValidDirectory = true;
                } else {
                    folder.isValidDirectory = false;
                }
            } catch (e) {
                folder.isValidDirectory = false;
            }

            folders.push(folder);
        }

        return folders;
    }

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
});
