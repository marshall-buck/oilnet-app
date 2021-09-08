const os = require('os');

exports.pathObject = () => {
  let home;
  let ctFolder;
  let pathToCtFolder;
  let pathToPython;
  let pathToApp;

  const url = 'http://localhost:8042/tools/find/';
  const baseUrl = 'http://localhost:8042';
  if (process.platform === 'darwin') {
    home = os.homedir();
    ctFolder = 'test';
    pathToCtFolder = `${home}/Desktop/${ctFolder}`;
    pathToPython = `${home}/Desktop/electronApp/pyt/venv/bin/python3`;
    pathToApp = `${home}/Desktop/electronApp/pyt/app.py`;
  } else {
    home = 'C:/';
    ctFolder = 'CT';
    pathToCtFolder = `${home}/${ctFolder}`;
    pathToPython = `${home}/Dev/electron/pyt/venv/Scripts/python.exe`;
    pathToApp = `${home}/Dev/electron/pyt/app.py`;
  }
  return { pathToCtFolder, url, baseUrl, pathToApp, pathToPython };
};
