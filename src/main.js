var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var ipc = require('ipc');

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
    mainWindow = new BrowserWindow({width: 500, height: 400, icon: 'img/icon.png'});

    var webContents = mainWindow.webContents;

    // and load the index.html of the app.
    mainWindow.loadUrl('file://' + __dirname + '/index.html');
    webContents.on('did-finish-load', function() {
        webContents.send('asynchronous-reply', 'whoooooooh!');
    });
    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
});
