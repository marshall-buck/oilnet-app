const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { pathObject } = require('./basePaths.js');
const { findStudy } = require('./fetch.js');
const { spawn } = require('child_process');
const { pathToCtFolder, url, baseUrl } = pathObject();

let mainWindow, studyIdModal, histogramChart;

function createWindows() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile('./dist/index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Study ID Modal

  studyIdModal = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    show: false,
    frame: false,
    width: 348,
    height: 160,

    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  studyIdModal.loadFile('./dist/study-id-modal.html');

  // Histogram Chart

  histogramChart = new BrowserWindow({
    parent: mainWindow,
    show: false,
    frame: true,
    width: 550,
    height: 250,

    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  histogramChart.loadFile('./dist/hist.html');
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindows();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('open-studyId-modal', () => {
  studyIdModal.show();
});
// this is what triggers python rgs is object study id width and center
ipcMain.on('saveJpg', (e, arg) => {
  const paths = async () => {
    const list = await dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
    });
    return list;
  };
  paths()
    .then((e) => {
      if (e.canceled === true) return;
      const regex = /\d{5}/;
      const path = e.filePaths[0];
      const id = path.match(regex)[0];
      arg.studyId = id;
      arg.filePaths = e.filePaths;
      arg.ct = pathToCtFolder;

      const str = JSON.stringify(arg);
      const childPython = spawn('./venv/bin/python3', [
        './pyt/helpers.py',
        str,
      ]);
      childPython.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });
      childPython.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
      });
      childPython.on('close', (code) => {
        console.log(`process exited with code: ${code}`);
      });
      // console.log(arg);
    })
    .catch((err) => {
      console.log(err);
      return;
    });
});
ipcMain.on('study-id-entered', (e, arg) => {
  // if (!arg) return;
  const regex = /^\d{5}$/;
  if (!arg.match(regex) || !arg) {
    const mrs = dialog.showMessageBoxSync({
      type: 'warning',
      buttons: ['OK'],
      detail: 'Error, Study Numbers are 5 Digits',
    });
    return;
  }
  findStudy(arg)
    .then()
    .catch((err) => console.log(err));
});

ipcMain.on('close-studyId-modal', (e, arg) => {
  studyIdModal.hide();
});

ipcMain.on('from-render-test', (e, arg) => {
  histogramChart.show();
  console.log('from render test', arg);
  e.reply('from-main', 'pong');
});
