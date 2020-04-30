const electron = require("electron");
const uuid = require("uuid");
const { v4 } = uuid;
const{app, BrowserWindow, Menu, ipcMain} = electron;

let todayWindow;
let createWindow;
let listWindow;
let data;

let allAppointment = [];

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
const MyBiodata = () =>{
    data = new BrowserWindow({
        webPreferences:{
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title:"Create Appointments"
    });
    data.setMenu(null);
    data.loadURL(`file://${__dirname}/biodata.html`);
    data.on("closed", ()=> (data = null));
};

ipcMain.on("appointment:creates", (event, appointment) =>{
    appointment["id"] = uuid.v1();
    appointment["done"] = 0;    
    allAppointment.push(appointment);
    sendTodayAppointments();
    createWindow.close();
    console.log(allAppointment);
});

ipcMain.on("appointment:request:list", event => {
    listWindow.webContents.send('appointment:response:list', allAppointment);
    // console.log("ini Halaman List");
});

ipcMain.on("appointment:request:today", event => {
    sendTodayAppointments();
    console.log("Here2");
});

ipcMain.on("appointment:done", (event, id) => {
    console.log("Here3");
});

const sendTodayAppointments = () => {
    const today = new Date().toISOString().slice(0,10);
    const filtered = allAppointment.filter(
        appoinment => appoinment.date === today
    );

    todayWindow.webContents.send("appointment:response:today", filtered);
}

const  menuTemplate = [{
    label: "File",
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

{
    label:"about me",
    click(){
        MyBiodata();
    }
},

]