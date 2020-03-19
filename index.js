const electron = require("electron");

const{app, BrowserWindow, Menu, ipcMain} = electron;

let todayWindow;
let createWindow;
let listWindow;

app.on("ready", ()=>{
    todayWindow = new BrowserWindow({
        webPreferences:{
            nodeIntegration: true
        },
        title: "my application"
    });
    todayWindow.loadURL(`file://${__dirname}/today.html`);
    todayWindow.on("closed", ()=>{
        app.quit();
        todayWindow = null;
    });

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

});

const createWindowCreator = ()=>{
    createWindow = new BrowserWindow({
        webPreferences : {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "all we need to create"
    });
    createWindow.setMenu(null);
    createWindow.loadURL(`file://${__dirname}/create.html`);
    createWindow.on("closed", ()=>(createWindow = null))
};

const listWindowCreator = ()=>{
    listWindow = new BrowserWindow({
        webPreferences : {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "all we need to list"
    });
    listWindow.setMenu(null);
    listWindow.loadURL(`file://${__dirname}/list.html`);
    listWindow.on("closed", ()=>(listWindow = null))
};

const AboutWindowCreator = ()=>{
    aboutWindow = new BrowserWindow({
        webPreferences : {
            nodeIntegration: true
        },
        width: 1000,
        height: 800,
        title: "all we need to list"
    });
    aboutWindow.setMenu(null);
    aboutWindow.loadURL(`file://${__dirname}/about.html`);
    aboutWindow.on("closed", ()=>(aboutWindow = null))
};

ipcMain.on("appointment:create", (event, appointment) => {
    console.log(appointment);
});

ipcMain.on("appointment:request:list", event =>{
    console.log("here");
});

ipcMain.on("appointment:request:today", event =>{
    console.log("here2");
})

ipcMain.on("appointment:done", (event, id) =>{
    console.log("here3")
})

const menuTemplate = [
    {
        label: "file",
        submenu: [
            {
                label: "new appointment",

                click(){
                    createWindowCreator();
                }
            },
            {
                label:"all appointment",
                click(){
                    listWindowCreator();
                }
            },
            {
                label:"About",
                click(){
                    AboutWindowCreator();
                }
            },
            {
                label: "Quit",
                accelerator: process.platform == "darwin" ? "Command + Q" : "Ctrl + Q",
                click(){
                    app.quit();
                }
            }
        ]
    },

    {
        label: "View",
        submenu: [{role: "reload"}, {role: "toggledevtools"}]
    }
]