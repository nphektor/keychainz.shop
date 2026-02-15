const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  readProducts: () => ipcRenderer.invoke('read-products'),
  writeProducts: (products) => ipcRenderer.invoke('write-products', products),
  exportProducts: (products) => ipcRenderer.invoke('export-products', products),
  importProducts: () => ipcRenderer.invoke('import-products')
});
