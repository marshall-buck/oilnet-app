const os = require('os');

exports.pathObject = () => {
  let home;
  let ctFolder;
  let pathToCtFolder;
  const url = 'http://localhost:8042/tools/find/';
  const baseUrl = 'http://localhost:8042';
  if (process.platform === 'darwin') {
    home = os.homedir();
    ctFolder = 'test';
    pathToCtFolder = `${home}/Desktop/${ctFolder}`;
  } else {
    home = 'C:/';
    ctFolder = 'CT';
    pathToCtFolder = `${home}/${ctFolder}`;
  }
  return { pathToCtFolder, url, baseUrl };
};
