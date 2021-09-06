// import 'regenerator-runtime/runtime';
const fetch = require('node-fetch');
const http = require('http');
const fs = require('fs');
const unzipper = require('unzipper');
const { dialog } = require('electron');
const { pathObject } = require('./basePaths.js');
const ProgressBar = require('electron-progressbar');

const checkFolder = (folderPath) => {
  // Check folder exists in the path using `fs.existsSync`
  const isFolderExist = fs.existsSync(folderPath);
  return isFolderExist;
};
const { pathToCtFolder, url, baseUrl } = pathObject();

exports.findStudy = async (studyNo) => {
  const progressBar = new ProgressBar({
    text: 'Working...',

    title: 'Downloading Studies',
    abortOnError: true,
  });
  progressBar
    .on('completed', function () {
      progressBar.detail = 'Complete, Exiting...';
    })
    .on('aborted', function () {
      console.info(`aborted...`);
    });
  console.log(studyNo, typeof studyNo);

  const data = {
    Level: 'Study',
    Query: {
      studyNo: `${studyNo}`,
    },
    Expand: true,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const info = await response.json();

    const id = await info[0].ID;

    // return info;
    _saveCompressedStudies(id, studyNo);
    _saveDicomDir(id, studyNo);

    if (checkFolder(`${pathToCtFolder}/${studyNo}`)) {
      const mrs = dialog.showMessageBoxSync({
        type: 'warning',
        buttons: ['OK', 'CANCEL'],
        detail:
          'Study already exists,  Press ok to overwrite, or Cancel to exit',
      });
      if (mrs === 1) {
        progressBar.close();
        return;
      } else {
        try {
          if (studyNo === '') return;

          fs.rmSync(`${pathToCtFolder}/${studyNo}`);
          fs.mkdirSync(`${pathToCtFolder}/${studyNo}`);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      if (studyNo === '') return;
      fs.mkdirSync(`${pathToCtFolder}/${studyNo}`);
    }
  } catch (error) {
    progressBar.setCompleted();
    if (error.name === 'FetchError') {
      // eslint-disable-next-line no-unused-vars
      const mrs = dialog.showMessageBoxSync({
        type: 'warning',
        buttons: ['OK'],
        detail:
          'The Orthanc Server Is not responding, Please check that its running',
      });
      return;
    }
    if (error.name === 'TypeError') {
      console.log(error);
      dialog.showMessageBoxSync({
        type: 'warning',
        buttons: ['OK'],
        detail: "The Study Number doesn't exist on the server",
      });
      return;
    } else {
      console.log(error);
      return;
    }
  }
  setTimeout(function () {
    progressBar.setCompleted();
  }, 500);
  return;
};

function _saveDicomDir(id, studyNo) {
  const url = `${baseUrl}/studies/${id}/media`;
  try {
    http.get(url, (response) => {
      const file = fs.createWriteStream(
        `${pathToCtFolder}/${studyNo}/archive.zip`
      );
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        fs.createReadStream(`${pathToCtFolder}/${studyNo}/archive.zip`).pipe(
          unzipper.Extract({ path: `${pathToCtFolder}/${studyNo}` })
        );
        fs.unlink(`${pathToCtFolder}/${studyNo}/archive.zip`, (err) => {
          if (err) {
            throw err;
          }
        });
        console.log('unzipped file saved');
      });
    });
  } catch (error) {
    console.log(error);
  }
}

function _saveCompressedStudies(id, studyNo) {
  const url = `${baseUrl}/studies/${id}/archive`;
  try {
    http.get(url, (response) => {
      const file = fs.createWriteStream(
        `${pathToCtFolder}/${studyNo}/${studyNo}.zip`
      );
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log('zip file saved');
      });
    });
  } catch (error) {
    console.log(error);
  }
}
