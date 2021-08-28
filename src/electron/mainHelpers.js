const ProgressBar = require('electron-progressbar');
const { spawn } = require('child_process');
const { pathObject } = require('./basePaths.js');
const { pathToCtFolder } = pathObject();
const { dialog } = require('electron');

exports.writeImagesToDisk = async (arg) => {
  const paths = async () => {
    const list = await dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
    });
    return list;
  };
  let progressBar;
  paths()
    .then((e) => {
      progressBar = new ProgressBar({
        text: 'Working...',

        title: 'Saving Images',
        abortOnError: true,
      });
      progressBar
        .on('completed', function () {
          progressBar.detail = 'Complete, Exiting...';
        })
        .on('aborted', function () {
          console.info(`aborted...`);
        });
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
    })
    .then(() => {
      setTimeout(function () {
        progressBar.setCompleted();
      }, 500);
      return;
    })
    .catch((err) => {
      progressBar.setCompleted();
      progressBar.close();
      console.log(err);
      return;
    });
};
