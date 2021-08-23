const two = {
  width: 348,
  height: 160,
  parent: 'mainWindow',
  modal: true,
  show: false,
  frame: false,
};
console.log({
  ...two,
  webPreferences: {
    nodeIntegration: ' process.env.ELECTRON_NODE_INTEGRATION',
    preload: ' path.join(__dirname, ),',
  },
});
