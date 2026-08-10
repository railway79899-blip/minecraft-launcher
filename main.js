import { app, BrowserWindow, Menu, ipcMain } from 'electron';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { DownloadManager } from './src/modules/downloader.js';
import { FileManager } from './src/modules/fileManager.js';
import { MinecraftManager } from './src/modules/minecraftManager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let mainWindow;
const downloadManager = new DownloadManager();
const fileManager = new FileManager();
const minecraftManager = new MinecraftManager();

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false
    }
  });

  mainWindow.loadFile('src/index.html');

  if (process.argv.includes('--dev')) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// IPC 事件處理
ipcMain.handle('get-versions', async () => {
  return await minecraftManager.getAvailableVersions();
});

ipcMain.handle('download-version', async (event, versionId) => {
  try {
    return await downloadManager.downloadMinecraftVersion(versionId);
  } catch (error) {
    throw new Error(`下載失敗: ${error.message}`);
  }
});

ipcMain.handle('download-mods', async (event, modsData) => {
  try {
    return await downloadManager.downloadMods(modsData);
  } catch (error) {
    throw new Error(`下載模組失敗: ${error.message}`);
  }
});

ipcMain.handle('get-installed-versions', async () => {
  return await minecraftManager.getInstalledVersions();
});

ipcMain.handle('launch-game', async (event, versionId) => {
  return await minecraftManager.launchGame(versionId);
});

ipcMain.handle('get-download-progress', (event, downloadId) => {
  return downloadManager.getProgress(downloadId);
});
