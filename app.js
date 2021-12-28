const electron = require('electron');
const url = require('url');
const path = require('path');


const {app,BrowserWindow,ipcMain,net} = electron;

let mainWindow;

app.on('ready',()=>{
    mainWindow = new BrowserWindow({
        width: 940, height:600 ,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            frame:false
        }
    });
    mainWindow.setResizable(false);
    mainWindow.loadURL(
        url.format({
            pathname:path.join(__dirname,"src/index.html"),
            protocol:"file",
            slashes:true,
           
        })
    );
    ipcMain.on("Tutucu",() =>{
        trial();
        console.log(chunk_login);
    })
    ipcMain.on("Saklayıcı",() =>{
        createMainWindows();
        console.log(chunk_login);
        
    })
});



let chunk_login;
function createMainWindows(){
    const request = net.request({
        method: 'POST',
        url: 'http://192.168.1.104:8080/post/walletid-electro',
      })
    request.on('response', (response) => {
      console.log(`STATUS: ${response.statusCode}`)
      response.on('data', (chunk) => {
        chunk_login = chunk.toString();
        console.log(`BODY: ${chunk}`)
      })
      response.on('end', () => {
        console.log('No more data in response.')
      })
    })
    request.end()
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

function trial(){
    addWindow = new BrowserWindow({
        title:"User Page",
        width: 1120, height:680 ,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });
    addWindow.loadURL(url.format({
        pathname:path.join(__dirname,"src/users.html"),
        protocol:"file",
        slashes:true
    }));
}