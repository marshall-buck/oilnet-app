const ProgressBar = require('electron-progressbar');
const { spawn } = require('child_process');
const { pathObject } = require('./basePaths.js');
const { pathToCtFolder } = pathObject();

exports.writeImagesToDisk = async (arg) => {
  if (arg.paths.length === 0) return;

  const paths = async () => {
    const path = await arg.paths;
    return path;
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
      const path = e[0];
      const id = path.match(regex)[0];
      arg.studyId = id;
      arg.filePaths = e;
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
