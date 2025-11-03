const { app, BrowserWindow } = require('electron');
const path = require('path');

// const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.cjs')
    }
  });

  win.webContents.openDevTools();

  win.loadURL('http://192.168.1.23:5173/');
  // win.loadFile(path.join(__dirname, '../dist/index.html'));
}

app.whenReady().then(createWindow);
