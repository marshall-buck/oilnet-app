const { pathObject } = require('./basePaths.js');
const { pathToCtFolder } = pathObject();

exports.writeImagesToDisk = async (arg) => {
  if (arg.paths.length === 0) return;

  const obj = {
    studyNo: arg.studyNo,
    width: arg.width,
    center: arg.center,
    filePaths: arg.paths,
    ct: pathToCtFolder,
  };

  return JSON.stringify(obj);
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
  return { csvContent: csvContent, id: arg.studyNo };
};

exports.writeCharts = async (args) => {
  const data = await args[0].substring(23);
  return Buffer.from(data, 'base64');
};
