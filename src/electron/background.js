'use strict';

import { app, protocol, BrowserWindow, ipcMain, dialog } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
// eslint-disable-next-line no-unused-vars
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer';

const { findStudy } = require('./fetch.js');

// const { spawn } = require('child_process');

const isDevelopment = process.env.NODE_ENV !== 'production';
const path = require('path');

const {
  mainOptions,
  measurementOptions,
  downloadStudyOptions,
} = require('./windowOptions');

// TODO: Python Packager

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
]);

let mainWindow;
let measurementWindow;
let downloadStudyWin;

async function createWindow(devPath, prodPath, options) {
  // Create the browser window.
  let window = new BrowserWindow({
    ...options,
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    window.loadURL(process.env.WEBPACK_DEV_SERVER_URL + devPath);
    if (!process.env.IS_TEST) {
      if (window.title === 'Ct App') window.webContents.openDevTools();
    }
  } else {
    // Load the index.html when not in development
    window.loadURL(`app://./${prodPath}`);
  }

  window.on('closed', () => {
    window = null;
  });
  return window;
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS);
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }

  if (!process.env.WEBPACK_DEV_SERVER_URL) {
    createProtocol('app');
  }
  mainWindow = await createWindow('', 'index.html', mainOptions);
  mainWindow.once('ready-to-show', () => mainWindow.show());
  mainWindow.on('closed', () => app.quit());

  // measurementWindow.hide();
  downloadStudyWin = await createWindow(
    'downloadStudy',
    'downloadStudy.html',
    downloadStudyOptions
  );
  downloadStudyWin.setParentWindow(mainWindow);
});

// app.on('activate', () => {
//   // On macOS it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (mainWindow === null) {
//     mainWindow = createWindow('', 'index.html', mainOptions);
//     mainWindow.once('ready-to-show', () => mainWindow.show());
//   }
// });

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
// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('open-studyId-modal', (e, arg) => {
  downloadStudyWin.show();
  mainWindow.webContents.send('open-studyId-modal:reply', true);

  console.log(arg);
});
ipcMain.on('study-id-entered', async (e, arg) => {
  console.log(arg);
  const regex = /^\d{5}$/;
  if (!arg.match(regex) || !arg) {
    // eslint-disable-next-line no-unused-vars
    const mrs = dialog.showMessageBoxSync({
      type: 'warning',
      buttons: ['OK'],
      detail: 'Error, Study Numbers are 5 Digits',
    });
    return;
  }
  await findStudy(arg);
});

ipcMain.on('close-studyId-modal', () => {
  downloadStudyWin.hide();
  mainWindow.webContents.send('close-studyId-modal:reply', false);
});
// eslint-disable-next-line no-unused-vars
ipcMain.on('record-data-pressed', async (e, arg) => {
  mainWindow.webContents.send('record-data-pressed:reply', { fake: 'data' });
  // if (!measurementWindow) {

  //   measurementWindow = await createWindow(
  //     'table',
  //     'table.html',
  //     measurementOptions
  //   );
  //   measurementWindow.setParentWindow(mainWindow);
  //   measurementWindow.show();
  // }
  // measurementWindow.webContents.reload();
  console.log(arg);
});

ipcMain.on('from-test-button', (e, args) => {
  console.log(e, args);
  // downloadStudyWin.show();
});
