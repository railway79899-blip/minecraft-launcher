import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('minecraft', {
  getVersions: () => ipcRenderer.invoke('get-versions'),
  downloadVersion: (versionId) => ipcRenderer.invoke('download-version', versionId),
  downloadMods: (modsData) => ipcRenderer.invoke('download-mods', modsData),
  getInstalledVersions: () => ipcRenderer.invoke('get-installed-versions'),
  launchGame: (versionId) => ipcRenderer.invoke('launch-game', versionId),
  getDownloadProgress: (downloadId) => ipcRenderer.invoke('get-download-progress', downloadId),
  onDownloadProgress: (callback) => {
    ipcRenderer.on('download-progress', (event, data) => callback(data));
  }
});
