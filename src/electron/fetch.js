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

exports.findStudy = async (StudyID) => {
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

  const data = {
    Level: 'Study',
    Query: {
      StudyID: StudyID,
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
    const id = info[0].ID;
    // set progress bar

    // return info;
    _saveCompressedStudies(id, StudyID);
    _saveDicomDir(id, StudyID);

    if (checkFolder(`${pathToCtFolder}/${StudyID}`)) {
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
          if (StudyID === '') return;

          fs.rmSync(`${pathToCtFolder}/${StudyID}`);
          fs.mkdirSync(`${pathToCtFolder}/${StudyID}`);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      if (StudyID === '') return;
      fs.mkdirSync(`${pathToCtFolder}/${StudyID}`);
    }
  } catch (error) {
    progressBar.setCompleted();
    if (error.name === 'FetchError') {
      const mrs = dialog.showMessageBoxSync({
        type: 'warning',
        buttons: ['OK'],
        detail:
          'The Orthanc Server Is not responding, Please check that its running',
      });
      return;
    }
    if (error.name === 'TypeError') {
      const mrs = dialog.showMessageBoxSync({
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

function _saveDicomDir(id, StudyID) {
  const url = `${baseUrl}/studies/${id}/media`;
  try {
    http.get(url, (response) => {
      const file = fs.createWriteStream(
        `${pathToCtFolder}/${StudyID}/archive.zip`
      );
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        fs.createReadStream(`${pathToCtFolder}/${StudyID}/archive.zip`).pipe(
          unzipper.Extract({ path: `${pathToCtFolder}/${StudyID}` })
        );
        fs.unlink(`${pathToCtFolder}/${StudyID}/archive.zip`, (err) => {
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

function _saveCompressedStudies(id, studyId) {
  const url = `${baseUrl}/studies/${id}/archive`;
  try {
    http.get(url, (response) => {
      const file = fs.createWriteStream(
        `${pathToCtFolder}/${studyId}/${studyId}.zip`
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
