// const ProgressBar = require('electron-progressbar');
const { spawn } = require('child_process');
const { pathObject } = require('./basePaths.js');
const { pathToCtFolder } = pathObject();

const fs = require('fs');
// TODO: separate file saving into async functions
// Save chart jpegs
// Save images from python
// Save Csv

exports.writeImagesToDisk = async (arg) => {
  if (arg.paths.length === 0) return;

  // let progressBar;
  // progressBar = new ProgressBar({
  //   text: 'Working...',

  //   title: 'Saving Images',
  //   abortOnError: true,
  // });
  // progressBar
  //   .on('completed', function () {
  //     progressBar.detail = 'Complete, Exiting...';
  //   })
  //   .on('aborted', function () {
  //     console.info(`aborted...`);
  //   });
  try {
    const paths = arg.paths;

    const regex = /\d{5}/;
    const path = paths[0];
    const id = path.match(regex)[0];
    arg.studyNo = id;
    arg.filePaths = paths;
    arg.ct = pathToCtFolder;
    // fs.writeFile(`${pathToCtFolder}/${id}/${id}.csv`, csv, 'utf8', (err) =>
    //   console.log(err || 'File written')
    // );
    const str = JSON.stringify(arg);
    const childPython = spawn('./venv/bin/python3', ['./pyt/helpers.py', str]);
    childPython.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    childPython.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });
    childPython.on('close', (code) => {
      console.log(`process exited with code: ${code}`);
    });
  } catch (error) {
    console.log(error);
  }
  // progressBar.setCompleted();
};

exports.saveCsv = async (arg) => {
  const table = await arg.table;

  const histogram = await arg.csv;

  const sliceInfo = await histogram.sliceArray;
  const yAxis = await histogram.yAxis;

  const header = [
    arg.studyNo,
    arg.sampleNo,

    ...Object.keys(table[0]),
    '',
    'CT Number',

    ...histogram.xAxis,
  ];

  let csvArr = [header];
  for (let i = 0; i < sliceInfo.length; i++) {
    const row = ['', '', ...Object.values(table[i]), '', '', ...sliceInfo[i]];
    csvArr.push(row);
  }
  csvArr.push(['', '', '', '', '', '', '', '', '', '', 'Total', ...yAxis]);

  let csvContent = csvArr.map((e) => e.join(',')).join('\n');
  const paths = arg.paths;
  const regex = /\d{5}/;
  const path = paths[0];
  const id = path.match(regex)[0];
  arg.studyNo = id;
  arg.filePaths = paths;
  arg.ct = pathToCtFolder;
  fs.writeFile(`${pathToCtFolder}/${id}/${id}.csv`, csvContent, 'utf8', (err) =>
    console.log(err || 'File written')
  );
};
