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
      'int-mounted',
      'table-mounted',
      'toggle-chart:int',
      'toggle-chart:hist',
      'toggle-chart:table',
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
      'delete-data-at:reply',
      'hist-mounted:reply',
      'int-mounted:reply',
      'table-mounted:reply',
      'save-jpeg-pressed:reply',
    ];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
});
