'use strict';

import { app, protocol, BrowserWindow, ipcMain, dialog } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';

import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer';

const { findStudy } = require('./fetch.js');
const { writeImagesToDisk, saveCsv } = require('./mainHelpers');

const { pathObject } = require('./basePaths');
const { pathToCtFolder } = pathObject();

const isDevelopment = process.env.NODE_ENV !== 'production';
const path = require('path');
const fs = require('fs');

const {
  mainOptions,
  histogramOptions,
  downloadStudyOptions,
  tableOptions,
  intensityOptions,
} = require('./windowOptions');

const chartVisibility = {
  int: false,
  hist: false,
  table: true,
};

let currentData = null;
let saveState = {
  jpg: 'inactive',
  csv: 'inactive',
  int: 'inactive',
  hist: 'inactive',
};

// TODO: Python Packager

// TODO: move files to trash on overwrite dir
// BUG: Width and center need record button to change api object need to fix

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
]);

let mainWindow;
let tableWindow;
let downloadStudyWin;
let histogramWindow;
let intensityWindow;

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
  tableWindow.once('ready-to-show', () => {
    const mainBounds = mainWindow.getBounds();
    const tableBounds = tableWindow.getBounds();
    tableWindow.setPosition(mainBounds.x, mainBounds.y - tableBounds.height);
    if (chartVisibility.table) tableWindow.show();
  });
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
  histogramWindow.once('ready-to-show', () => {
    const mainBounds = mainWindow.getBounds();
    const histBounds = histogramWindow.getBounds();
    histogramWindow.setPosition(
      mainBounds.x + mainBounds.width - histBounds.width,
      mainBounds.y - histBounds.height
    );
    if (chartVisibility.hist) histogramWindow.show();
  });

  histogramWindow.on('close', (e) => {
    e.preventDefault();
    histogramWindow.hide();
  });

  intensityWindow = await createWindow(
    'intChart',
    'intChart.html',
    intensityOptions
  );

  intensityWindow.setParentWindow(mainWindow);
  intensityWindow.once('ready-to-show', () => {
    const mainBounds = mainWindow.getBounds();
    intensityWindow.setPosition(mainBounds.x + mainBounds.width, mainBounds.y);
    if (chartVisibility.int) histogramWindow.show();
  });
  intensityWindow.on('close', (e) => {
    e.preventDefault();
    intensityWindow.hide();
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
ipcMain.on('reset-state', () => {
  currentData = null;
});
// Downloading Studies Communications
ipcMain.on('open-studyNo-modal', () => {
  downloadStudyWin.show();
  mainWindow.webContents.send('open-studyNo-modal:reply', true);
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

ipcMain.on('close-studyNo-modal', () => {
  downloadStudyWin.hide();
  mainWindow.webContents.send('close-studyNo-modal:reply', false);
});
// Data Recording and deleting Communications
ipcMain.on('record-data-pressed', async () => {
  mainWindow.webContents.send('record-data-pressed:reply');
});

// send proper data back to when data is changed
ipcMain.on('image-data-change', (e, args) => {
  currentData = args;
  if (!currentData) return;

  if (histogramWindow.isVisible()) {
    histogramWindow.webContents.send('image-data-change:reply', args);
  }
  if (tableWindow.isVisible()) {
    tableWindow.webContents.send('image-data-change:reply', args);
  }
  if (intensityWindow.isVisible()) {
    intensityWindow.webContents.send('image-data-change:reply', args);
  }
});
// Send index to renderer from table delete row
ipcMain.on('delete-data-at', (e, arg) => {
  mainWindow.webContents.send('delete-data-at:reply', arg);
});

// Save Jpeg Images
ipcMain.on('save-button-pressed', () => {
  // console.log(currentData);
  if (currentData.width == currentData.center) {
    const mrs = dialog.showMessageBoxSync({
      type: 'warning',
      buttons: ['Ok', 'Cancel'],
      detail:
        'Width and Center are equal, is this is correct, press Ok to continue save, or press Cancel to chose correct windowing',
    });
    if (mrs === 0) {
      for (const key in saveState) {
        saveState[key] = 'pending';
      }
      if (histogramWindow.isVisible()) {
        histogramWindow.webContents.send('save-button-pressed:reply');
      }
      if (tableWindow.isVisible()) {
        tableWindow.webContents.send('save-button-pressed:reply');
      }
      if (intensityWindow.isVisible()) {
        intensityWindow.webContents.send('save-button-pressed:reply');
      }
      console.log(saveState);
    }
    return;
  } else {
    for (const key in saveState) {
      saveState[key] = 'pending';
    }
    if (histogramWindow.isVisible()) {
      histogramWindow.webContents.send('save-button-pressed:reply');
    }
    if (tableWindow.isVisible()) {
      tableWindow.webContents.send('save-button-pressed:reply');
    }
    if (intensityWindow.isVisible()) {
      intensityWindow.webContents.send('save-button-pressed:reply');
    }
    console.log(saveState);
  }
});
// Receive csv data from hist window
ipcMain.on('send-csv', (e, csvData) => {
  currentData['csv'] = csvData;

  writeImagesToDisk(currentData);
  saveCsv(currentData);
});
// Save chart
ipcMain.on('save-chart', (e, args) => {
  const data = args[0].substring(23);
  const buffer = Buffer.from(data, 'base64');
  fs.writeFile(
    `${pathToCtFolder}/${args[1]}/${args[2]}.jpeg`,
    buffer,
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${args[2]} success`);
      }
    }
  );
});
// History chart mounted
ipcMain.on('hist-mounted', () => {
  if (currentData) {
    histogramWindow.webContents.send('image-data-change:reply', currentData);
  }
});
ipcMain.on('int-mounted', () => {
  if (currentData) {
    intensityWindow.webContents.send('image-data-change:reply', currentData);
  }
});
ipcMain.on('table-mounted', () => {
  if (currentData) {
    tableWindow.webContents.send('image-data-change:reply', currentData);
  }

  // mainWindow.webContents.send('table-mounted:reply');
});
ipcMain.on('toggle-chart:int', (e, arg) => {
  const chart = arg.chart;
  const isVisible = arg.isVisible;
  chartVisibility[chart] = isVisible;

  if (chartVisibility.int) {
    const mainBounds = mainWindow.getBounds();
    intensityWindow.setPosition(mainBounds.x + mainBounds.width, mainBounds.y);
    if (currentData) {
      intensityWindow.webContents.send('image-data-change:reply', currentData);
    }

    intensityWindow.show();
  } else {
    intensityWindow.hide();
  }
});
ipcMain.on('toggle-chart:hist', (e, arg) => {
  const chart = arg.chart;
  const isVisible = arg.isVisible;
  chartVisibility[chart] = isVisible;

  if (chartVisibility.hist) {
    const mainBounds = mainWindow.getBounds();
    const histBounds = histogramWindow.getBounds();
    histogramWindow.setPosition(
      mainBounds.x + mainBounds.width - histBounds.width,
      mainBounds.y - histBounds.height
    );
    if (currentData) {
      histogramWindow.webContents.send('image-data-change:reply', currentData);
    }
    histogramWindow.show();
  } else {
    histogramWindow.hide();
  }
});
ipcMain.on('toggle-chart:table', (e, arg) => {
  const chart = arg.chart;
  const isVisible = arg.isVisible;
  chartVisibility[chart] = isVisible;

  if (chartVisibility.table) {
    const mainBounds = mainWindow.getBounds();
    const tableBounds = tableWindow.getBounds();
    tableWindow.setPosition(mainBounds.x, mainBounds.y - tableBounds.height);
    if (currentData) {
      tableWindow.webContents.send('image-data-change:reply', currentData);
    }
    tableWindow.show();
  } else {
    tableWindow.hide();
  }
});

// TESTING
ipcMain.on('from-test-button', () => {
  const mainBounds = mainWindow.getBounds();
  console.log(mainBounds);
});
// data:image/jpeg;base64,

// function checkCurrentData(old, newt) {
//   if (!old) return;
//   if (JSON.stringify(old) == JSON.stringify(newt)) return true;
//   return false;
// }
