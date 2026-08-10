import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('minecraft', {
  getVersions: (type = 'java') => ipcRenderer.invoke('get-versions', type),
  getInstalledVersions: (type) => ipcRenderer.invoke('get-installed-versions', type),
  downloadVersion: (versionId, type = 'java') => ipcRenderer.invoke('download-version', versionId, type),
  downloadMods: (modsData) => ipcRenderer.invoke('download-mods', modsData),
  launchGame: (versionId) => ipcRenderer.invoke('launch-game', versionId),
  getDownloadProgress: (downloadId) => ipcRenderer.invoke('get-download-progress', downloadId),
  onDownloadProgress: (callback) => {
    ipcRenderer.on('download-progress', (event, data) => callback(data));
  }
});
