const electron = require('electron');
const url = require('url');
const path = require('path');


const {app,BrowserWindow,ipcMain} = electron;

let mainWindow;

app.on('ready',()=>{
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });
    mainWindow.loadURL(
        url.format({
            pathname:path.join(__dirname,"src/index.html"),
            protocol:"file",
            slashes:true
        })
    );
    ipcMain.on("key:GoUserPage",() =>{
        createMainWindows();
    })
});


function createMainWindows(){
    addWindow = new BrowserWindow({
        title:"Ana Sayfa",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });
    addWindow.loadURL(url.format({
        pathname:path.join(__dirname,"user.html"),
        protocol:"file",
        slashes:true
    }));
}