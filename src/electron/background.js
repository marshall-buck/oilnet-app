'use strict';

import { app, protocol, BrowserWindow, ipcMain } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer';
import { table } from 'console';

const isDevelopment = process.env.NODE_ENV !== 'production';
const path = require('path');

// TODO: Python Packager

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
]);

const mainOptions = {
  width: 1024,
  height: 768,
  webPreferences: {
    nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
    preload: path.join(__dirname, 'preload.js'),
  },
};

const tableOptions = {
  width: 600,
  height: 300,
  webPreferences: {
    nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
    preload: path.join(__dirname, 'preload.js'),
  },
};

let mainWindow;
let tables;

function createWindow(devPath, prodPath, options) {
  // Create the browser window.
  // Create the browser window.
  let window = new BrowserWindow(options);

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    window.loadURL(process.env.WEBPACK_DEV_SERVER_URL + devPath);
    if (!process.env.IS_TEST) window.webContents.openDevTools();
  } else {
    // Load the index.html when not in development
    window.loadURL(`app://./${prodPath}`);
  }

  window.on('closed', () => {
    window = null;
  });
  return window;
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.

  // With
  if (mainWindow === null) {
    mainWindow = createWindow('', 'index.html', mainOptions);
  }
  if (tables === null) {
    tables = createWindow('table', 'table.html', tableOptions);
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }

  // With
  if (!process.env.WEBPACK_DEV_SERVER_URL) {
    createProtocol('app');
  }
  mainWindow = createWindow('', 'index.html', mainOptions);
  tables = createWindow('table', 'table.html', tableOptions);
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}

ipcMain.on('open-studyId-modal', (e, args) => {
  tables.webContents.send('from-main', 'Test Button has been pressed ');
  console.log(args);
});
