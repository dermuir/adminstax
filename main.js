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
    connection.connect(function(err) {
        if (err) {
            console.log('connect', err);
        }
    });
    ipcMain.on('query', function(e, sql) {
    console.log('query received', sql);
        connection.query(sql, function(err, rows, fields) {
            if(err){
                console.log('error executing', err);
                return false;
            }
            console.log('success', rows);
            console.log('fields',fields);
        });
    });

    let mainWindow

    function createWindow () {
      mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true
        }
      })

      mainWindow.loadURL(
        url.format({
          pathname: path.join(__dirname, `/dist/index.html`),
          protocol: "file:",
          slashes: true
        })
      );

      mainWindow.webContents.openDevTools();

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
