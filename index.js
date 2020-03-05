const electron = require("electron");

const{app, BrowserWindow, Menu, ipcMain} = electron;
let todayWindow;
let createWindow;
let listWindow;
let data;


app.on("ready", () =>{
    todayWindow = new BrowserWindow({
        webPreferences:{
            nodeIntegration: true
        },
        title: "Aplikasi Dokter"
    });

    todayWindow.loadURL(`file://${__dirname}/today.html`);
    todayWindow.on("closed", ()=>{
        app.quit();
        todayWindow = null;
    });

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
    
});
