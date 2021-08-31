// Preload (Isolated World)
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  send: (channel, data) => {
    // whitelist channels
    let validChannels = [
      'study-id-entered',
      'open-studyId-modal',
      'save-jpeg-pressed',
      'close-studyId-modal',
      'from-test-button',
      'record-data-pressed',
      'image-data-change',
      'delete-data-at',
      'save-chart',
      'hist-mounted',
    ];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    let validChannels = [
      'from-main',
      'open-studyId-modal:reply',
      'close-studyId-modal:reply',
      'record-data-pressed:reply',
      'image-data-change:reply',
      'hist-mounted:reply',
    ];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
});
