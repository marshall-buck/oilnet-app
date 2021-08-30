'use strict';

import { app, protocol, BrowserWindow, ipcMain, dialog } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';

import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer';

const { findStudy } = require('./fetch.js');
const { writeImagesToDisk } = require('./mainHelpers');
const { pathObject } = require('./basePaths.js');
const { pathToCtFolder, url, baseUrl } = pathObject();
// TODO:position window correctly
// TODO:Save Jpegs

const isDevelopment = process.env.NODE_ENV !== 'production';
const path = require('path');
const fs = require('fs');

const {
  mainOptions,
  histogramOptions,
  downloadStudyOptions,
  tableOptions,
} = require('./windowOptions');

// TODO: Python Packager

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
]);

let mainWindow;
let tableWindow;
let downloadStudyWin;
let histogramWindow;

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
  if (window.getTitle() === 'Ct App') {
    window.on('closed', () => {
      window = null;
    });
  }

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
  tableWindow = await createWindow('table', 'table.html', tableOptions);
  tableWindow.setParentWindow(mainWindow);
  tableWindow.once('ready-to-show', () => tableWindow.show());
  tableWindow.on('close', (e) => {
    e.preventDefault();
    tableWindow.hide();
  });
  histogramWindow = await createWindow(
    'histChart',
    'histChart.html',
    histogramOptions
  );
  histogramWindow.setParentWindow(mainWindow);
  histogramWindow.once('ready-to-show', () => histogramWindow.show());
  histogramWindow.on('close', (e) => {
    e.preventDefault();
    histogramWindow.hide();
  });

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
// Downloading Studies Communications
ipcMain.on('open-studyId-modal', () => {
  downloadStudyWin.show();
  mainWindow.webContents.send('open-studyId-modal:reply', true);
});
ipcMain.on('study-id-entered', async (e, arg) => {
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
// Data Recording and deleting Communications
ipcMain.on('record-data-pressed', async () => {
  mainWindow.webContents.send('record-data-pressed:reply');
});

// send proper data back to when data is changed
ipcMain.on('image-data-change', (e, args) => {
  console.log('image-data-change');
  // TODO:send data to intensity

  if (histogramWindow.isVisible()) {
    histogramWindow.webContents.send('hist-data:reply', args);
  }
  if (tableWindow.isVisible()) {
    tableWindow.webContents.send('table-data:reply', args);
  }
});
// Send index to renderer from table delete row
ipcMain.on('delete-data-at', (e, arg) => {
  mainWindow.webContents.send('delete-data-at:reply', arg);
});

// Save Jpeg Images
ipcMain.on('save-jpeg-pressed', (e, arg) => {
  writeImagesToDisk(arg);
});
// Save chart
ipcMain.on('save-chart', (e, args) => {
  const data = args[0].substring(23);
  const buffer = Buffer.from(data, 'base64');
  fs.writeFileSync(`${pathToCtFolder}/${args[1]}/${args[2]}.jpeg`, buffer);
});

// TESTING
ipcMain.on('from-test-button', (e, args) => {
  console.log(args);
});
// data:image/jpeg;base64,
