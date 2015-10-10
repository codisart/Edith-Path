var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var ipc = require('ipc');
var pathParser = require('codisart_path_parsing');
var Winreg = require('winreg')

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

    pathParser.parseString('Bonjour;bonjour');

    var regKey = new Winreg({
      hive: Winreg.HKLM,                                          // HKEY_CURRENT_USER
      key:  '\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment' // key containing autostart programs
    })

    regKey.get('Path', function(err, item) {
      if (!err)
        console.log('ITEM: '+item.name+'\t'+item.type+'\t'+item.value);
    });

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
