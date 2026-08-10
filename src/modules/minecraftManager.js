import { spawn } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { FileManager } from './fileManager.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export class MinecraftManager {
  constructor() {
    this.fileManager = new FileManager();
    this.versions = new Map();
    this.platformType = null;
    this.initialize();
  }

  async initialize() {
    await this.fileManager.initializeDirectories();
    await this.loadInstalledVersions();
  }

  async getAvailableVersions(type = 'java') {
    // 根據版本類型返回可用版本
    if (type === 'java') {
      return [
        { id: 'java-1.20.1', name: 'Java 1.20.1', size: 524288000, type: 'java', releaseDate: '2023-12-07' },
        { id: 'java-1.19.2', name: 'Java 1.19.2', size: 512000000, type: 'java', releaseDate: '2022-08-05' },
        { id: 'java-1.18.2', name: 'Java 1.18.2', size: 500000000, type: 'java', releaseDate: '2022-02-28' }
      ];
    } else if (type === 'bedrock') {
      return [
        { id: 'bedrock-1.20.1', name: 'Bedrock 1.20.1', size: 1073741824, type: 'bedrock', releaseDate: '2023-12-07' },
        { id: 'bedrock-1.19.0', name: 'Bedrock 1.19.0', size: 1048576000, type: 'bedrock', releaseDate: '2023-06-06' },
        { id: 'bedrock-1.18.0', name: 'Bedrock 1.18.0', size: 1024000000, type: 'bedrock', releaseDate: '2022-09-28' }
      ];
    }
    return [];
  }

  async loadInstalledVersions() {
    try {
      const javaDir = this.fileManager.getVersionPath('java');
      const bedrockDir = this.fileManager.getVersionPath('bedrock');
      
      // 載入 Java 版本
      try {
        const javaVersions = await this.fileManager.listFiles(javaDir.replace(/\/$/, ''));
        for (const version of javaVersions) {
          const versionPath = path.join(javaDir, version);
          const size = await this.getDirectorySize(versionPath);
          this.versions.set(`java-${version}`, {
            id: `java-${version}`,
            name: `Java ${version}`,
            size: size,
            type: 'java',
            installedAt: new Date().toISOString()
          });
        }
      } catch (error) {
        console.log('Java 版本目錄不存在或為空');
      }
      
      // 載入 Bedrock 版本
      try {
        const bedrockVersions = await this.fileManager.listFiles(bedrockDir.replace(/\/$/, ''));
        for (const version of bedrockVersions) {
          const versionPath = path.join(bedrockDir, version);
          const size = await this.getDirectorySize(versionPath);
          this.versions.set(`bedrock-${version}`, {
            id: `bedrock-${version}`,
            name: `Bedrock ${version}`,
            size: size,
            type: 'bedrock',
            installedAt: new Date().toISOString()
          });
        }
      } catch (error) {
        console.log('Bedrock 版本目錄不存在或為空');
      }
    } catch (error) {
      console.error('載入已安裝版本失敗:', error);
    }
  }

  async getInstalledVersions() {
    return Array.from(this.versions.values());
  }

  async getInstalledVersionsByType(type) {
    return Array.from(this.versions.values()).filter(v => v.type === type);
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
