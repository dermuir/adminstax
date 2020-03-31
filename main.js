const {app, BrowserWindow, ipcMain} = require('electron')
    const url = require("url");
    const path = require("path");

    const mysql = require('mysql')
    const connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'toor',
        password : 'toor',
        database: 'bancos'
    });
    const connection2 = mysql.createConnection({
        host     : 'localhost',
        user     : 'toor',
        password : 'toor',
        database: 'almacen'
    });
    connection.connect(function(err) {
        if (err) {
            console.log('connect', err);
        }
    });
    connection2.connect(function(err) {
        if (err) {
            console.log('connect', err);
        }
    });
    ipcMain.on('banco', (event, arg) => {
      console.log(arg);
      connection.query(arg, function(err, rows, fields) {
            if(err){
                console.log('error executing', err);
                return false;
            }
            event.returnValue = rows;
        });
    });

    ipcMain.on('almacen', (event, arg) => {
      console.log(arg);
      connection2.query(arg, function(err, rows, fields) {
            if(err){
                console.log('error executing', err);
                return false;
            }
            event.returnValue = rows;
        });
    });

    let mainWindow

    function createWindow () {
      mainWindow = new BrowserWindow({
        width: 2000,
        height: 2000,
        webPreferences: {
          nodeIntegration: true
        }
      })
      mainWindow.maximize();
      mainWindow.loadURL(
        url.format({
          pathname: path.join(__dirname, `/dist/index.html`),
          protocol: "file:",
          slashes: true
        })
      );

      //mainWindow.webContents.openDevTools();

      mainWindow.on('closed', function () {
        mainWindow = null
      })
    }

    app.on('ready', createWindow)

    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') app.quit()
    })

    app.on('activate', function () {
      if (mainWindow === null) createWindow()
    })
