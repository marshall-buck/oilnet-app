// Preload (Isolated World)
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  send: (channel, data) => {
    // whitelist channels
    let validChannels = [
      'study-id-entered',
      'open-studyId-modal',
      'saveJpg',
      'close-studyId-modal',
      'from-test-button',
      'record-data-pressed',
      'image-data-recorded',
      'delete-data-at',
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
      'table-data:reply',
      'delete-data-at:reply',
      'hist-data:reply',
    ];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
});
