'use strict';

var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var ipc = require('ipc');
var pathParser = require('codisart_path_parsing');
var Winreg = require('winreg');
var fs = require('fs');
var os = require('os');
var dialog = require('dialog');

if(process.argv.slice(2).length > 0) {
    app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    app.quit();
});
// ipc.send('asynchronous-reply', 'pong');


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 750,
        height: 650,
        icon: 'img/icon.png',
    });
    // mainWindow.setResizable(false);

    var webContents = mainWindow.webContents;

    // and load the index.html of the app.
    mainWindow.loadUrl('file://' + __dirname + '/index.html');

    // if(os.platform() == 'win32') {
        var regKey = new Winreg({
            hive: Winreg.HKLM,                                          // HKEY_CURRENT_USER
            key:  '\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment' // key containing autostart programs
        });

        webContents.on('did-finish-load', function() {
            regKey.get('Path', function(err, item) {
                if (!err) {
                    webContents.send('data-folders', buildHtmlData(pathParser.parseString(item.value)));
                }
            });
        });

        ipc.on('add-folders', function(event, arg) {
            regKey.get('Path', function(err, item) {
                if (!err) {
                    try {
                        var pathArrayValue = pathParser.parseArray(arg);
                        var newPathStringValue = item.value + ';' + pathArrayValue;

                        regKey.set('Path', Winreg.REG_EXPAND_SZ, newPathStringValue,  function(err) {
                            if (!err) {
                                event.sender.send('data-folders', buildHtmlData(pathParser.parseString(newPathStringValue)));
                            }
                        });
                    }
                    catch (e) {
                        event.sender.send('error-paths', 'plop');
                    }
                }
            });
        });

        ipc.on('refresh-folders', function(event, arg) {
            regKey.get('Path', function(err, item) {
                if (!err) {
                    webContents.send('data-folders', buildHtmlData(pathParser.parseString(item.value)));
                }
            });
        });
    // }

    function buildHtmlData(pathArrayValue) {
        var folders = [];

        var arrayLength = pathArrayValue.length;
        for (var i = 0; i < arrayLength; i++) {
            var folder = {path : pathArrayValue[i]};

            try {
                var stats = fs.statSync(pathArrayValue[i]);
                if (stats.isDirectory()) {
                    folder.isValidDirectory = true;
                } else {
                    folder.isValidDirectory = false;
                }
            }
            catch (e) {
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
