// const ProgressBar = require('electron-progressbar');
const { spawn, execFile } = require('child_process');
const { pathObject } = require('./basePaths.js');
const { pathToCtFolder } = pathObject();

const fs = require('fs');

const isDevelopment = process.env.NODE_ENV !== 'production';

exports.writeImagesToDisk = async (arg) => {
  if (arg.paths.length === 0) return;

  const paths = arg.paths;

  const regex = /\d{5}/;
  const path = paths[0];
  const id = path.match(regex)[0];
  arg.studyNo = id;
  arg.filePaths = paths;
  arg.ct = pathToCtFolder;

  const str = JSON.stringify(arg);
  let childPython;
  if (isDevelopment) {
    childPython = spawn('./pyt/venv/bin/python3', ['./pyt/app.py', str]);
  } else {
    childPython = execFile('./venv/bin/python3', ['./pyt/app.py', str]);
  }
  // const childPython = spawn('./venv/bin/python3', ['./pyt/helpers.py', str]);
  childPython.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  childPython.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });
  childPython.on('close', (code) => {
    console.log(`process exited with code: ${code}`);
  });
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
  fs.writeFile(
    `${pathToCtFolder}/${id}/${id}.csv`,
    csvContent,
    'utf8',
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('File written');
      }
    }
  );
};

exports.writeCharts = async (args) => {
  const data = await args[0].substring(23);
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
};
