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

const ListWindowCreator = () =>{
    listWindow = new BrowserWindow({
        webPreferences:{
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title:"All Appointments"
    });
    listWindow.setMenu(null);
    listWindow.loadURL(`file://${__dirname}/list.html`);
    listWindow.on("closed", ()=> (listWindow = null));
};
const CreateWindowCreator = () =>{
    createWindow = new BrowserWindow({
        webPreferences:{
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title:"Create Appointments"
    });
    createWindow.setMenu(null);
    createWindow.loadURL(`file://${__dirname}/create.html`);
    createWindow.on("closed", ()=> (createWindow = null));
};


const  menuTemplate = [{
    label: "FIle",
    submenu : [{
            label : "New Appoinment",
            click(){
                CreateWindowCreator();
            }
        },
        {
            label : "All Appoinment",
            click(){
                ListWindowCreator();
            }
        },
        {
            label : "Quit",
            accelerato : process.platform == "darwin" ? "Command+Q" : "Ctrk + Q",
            click(){
                app.quit();
            }
        }
    

    ]
},

{
    label:"View",
    submenu : [{role:"reload"}, {role:"toggledevtools"}]
},
]