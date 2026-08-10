import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOWNLOAD_DIR = path.join(process.cwd(), 'downloads');

export class DownloadManager {
  constructor() {
    this.downloads = new Map();
    this.initDownloadDir();
  }

  async initDownloadDir() {
    try {
      await fs.mkdir(DOWNLOAD_DIR, { recursive: true });
    } catch (error) {
      console.error('建立下載目錄失敗:', error);
    }
  }

  async downloadMinecraftVersion(versionId) {
    const downloadId = uuidv4();
    
    try {
      // 這裡應該從官方 Minecraft Launcher 獲取下載 URL
      // 目前使用示例 URL
      const urls = this.getVersionDownloadUrls(versionId);
      
      for (const urlInfo of urls) {
        await this.downloadFile(downloadId, urlInfo.url, urlInfo.name);
      }

      return {
        downloadId,
        status: 'downloading',
        versionId
      };
    } catch (error) {
      this.removeDownload(downloadId);
      throw error;
    }
  }

  async downloadMods(modsData) {
    const downloadId = uuidv4();
    
    try {
      for (const mod of modsData) {
        await this.downloadFile(downloadId, mod.url, `mod-${Date.now()}.jar`);
      }

      return {
        downloadId,
        status: 'downloading',
        modsCount: modsData.length
      };
    } catch (error) {
      this.removeDownload(downloadId);
      throw error;
    }
  }

  async downloadFile(downloadId, url, filename) {
    const filepath = path.join(DOWNLOAD_DIR, filename);
    
    try {
      const response = await axios.get(url, {
        responseType: 'stream',
        timeout: 30000
      });

      const totalSize = parseInt(response.headers['content-length'], 10);
      let downloadedSize = 0;

      return new Promise((resolve, reject) => {
        response.data.on('data', (chunk) => {
          downloadedSize += chunk.length;
          const progress = Math.round((downloadedSize / totalSize) * 100);
          this.updateProgress(downloadId, progress);
        });

        response.data.pipe(fs.createWriteStream(filepath));
        response.data.on('error', reject);
        response.data.on('end', resolve);
      });
    } catch (error) {
      console.error(`下載 ${filename} 失敗:`, error);
      throw error;
    }
  }

  getVersionDownloadUrls(versionId) {
    // 示例 URL（實際應從官方獲取）
    return [
      {
        url: `https://launcher.mojang.com/v1/objects/example-${versionId}.jar`,
        name: `minecraft-${versionId}.jar`
      }
    ];
  }

  updateProgress(downloadId, progress) {
    if (!this.downloads.has(downloadId)) {
      this.downloads.set(downloadId, {
        id: downloadId,
        progress: 0,
        status: 'downloading'
      });
    }

    const download = this.downloads.get(downloadId);
    download.progress = progress;

    if (progress === 100) {
      download.status = 'completed';
    }
  }

  getProgress(downloadId) {
    return this.downloads.get(downloadId) || null;
  }

  removeDownload(downloadId) {
    this.downloads.delete(downloadId);
  }
}
