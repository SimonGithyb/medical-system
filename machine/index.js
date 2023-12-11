const { app, BrowserWindow } = require('electron');
const path = require('node:path');
require('dotenv').config();
const io = require('socket.io-client');
const { URL } = process.env;

const socket = io.connect(URL, {reconnect: true});
        
socket.on('connect', (socket) => {
    console.log('Connected!');
});

socket.on('document', (data) => {
    console.log(data);
    alert(data);
});

// const socket = require('./socket');

const createWindow  = () => {
  const mainWindow = new BrowserWindow({
    // autoHideMenuBar: true,
    // focusable: true,
    // fullscreen: true,
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
    }
  })

  mainWindow.loadFile('index.html')

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

function tryGetDocument() {
  const code = document.getElementById('code').value;
  socket.emit('document', code);
}
