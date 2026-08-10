import { spawn } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { FileManager } from './fileManager.js';

export class MinecraftManager {
  constructor() {
    this.fileManager = new FileManager();
    this.versions = new Map();
    this.initialize();
  }

  async initialize() {
    await this.fileManager.initializeDirectories();
    await this.loadInstalledVersions();
  }

  async getAvailableVersions() {
    // 這裡應該從官方 Minecraft API 獲取版本列表
    // 目前返回示例數據
    return [
      { id: '1.20.1', name: 'Minecraft 1.20.1', size: 524288000 },
      { id: '1.19.2', name: 'Minecraft 1.19.2', size: 512000000 },
      { id: '1.18.2', name: 'Minecraft 1.18.2', size: 500000000 }
    ];
  }

  async loadInstalledVersions() {
    try {
      const versionDir = this.fileManager.getVersionPath('');
      const versions = await this.fileManager.listFiles(versionDir.replace(/\/$/, ''));
      
      for (const version of versions) {
        const versionPath = this.fileManager.getVersionPath(version);
        const size = await this.getDirectorySize(versionPath);
        this.versions.set(version, {
          id: version,
          name: `Minecraft ${version}`,
          size: size,
          installedAt: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('載入已安裝版本失敗:', error);
    }
  }

  async getInstalledVersions() {
    return Array.from(this.versions.values());
  }

  async getDirectorySize(directory) {
    try {
      const files = await fs.readdir(directory, { recursive: true });
      let totalSize = 0;

      for (const file of files) {
        const stats = await fs.stat(path.join(directory, file));
        if (stats.isFile()) {
          totalSize += stats.size;
        }
      }

      return totalSize;
    } catch (error) {
      return 0;
    }
  }

  async launchGame(versionId) {
    try {
      const versionPath = this.fileManager.getVersionPath(versionId);
      const jarFile = path.join(versionPath, `minecraft-${versionId}.jar`);

      // 檢查 Java 是否可用
      const javaAvailable = await this.checkJavaAvailable();
      if (!javaAvailable) {
        throw new Error('未找到 Java，請確保已安裝 Java');
      }

      // 啟動遊戲
      return new Promise((resolve, reject) => {
        const process = spawn('java', [
          '-Xmx2G',
          '-Xms1G',
          '-jar',
          jarFile
        ], {
          detached: true,
          stdio: 'ignore'
        });

        process.unref();
        resolve({ status: 'launched', pid: process.pid });
      });
    } catch (error) {
      console.error('啟動遊戲失敗:', error);
      throw error;
    }
  }

  async checkJavaAvailable() {
    return new Promise((resolve) => {
      const process = spawn('java', ['-version']);
      process.on('close', (code) => {
        resolve(code === 0);
      });
      process.on('error', () => {
        resolve(false);
      });
    });
  }
}
