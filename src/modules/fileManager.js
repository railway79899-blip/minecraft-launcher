import fs from 'fs/promises';
import path from 'path';

export class FileManager {
  constructor() {
    this.baseDir = path.join(process.cwd(), 'minecraft-data');
  }

  async initializeDirectories() {
    const dirs = [
      this.baseDir,
      path.join(this.baseDir, 'versions'),
      path.join(this.baseDir, 'mods'),
      path.join(this.baseDir, 'resourcepacks'),
      path.join(this.baseDir, 'saves')
    ];

    for (const dir of dirs) {
      try {
        await fs.mkdir(dir, { recursive: true });
      } catch (error) {
        console.error(`建立目錄 ${dir} 失敗:`, error);
      }
    }
  }

  async getFileSize(filepath) {
    try {
      const stats = await fs.stat(filepath);
      return stats.size;
    } catch (error) {
      return 0;
    }
  }

  async listFiles(directory) {
    try {
      return await fs.readdir(directory);
    } catch (error) {
      console.error(`讀取目錄 ${directory} 失敗:`, error);
      return [];
    }
  }

  async copyFile(source, destination) {
    try {
      await fs.mkdir(path.dirname(destination), { recursive: true });
      await fs.copyFile(source, destination);
      return true;
    } catch (error) {
      console.error(`複製檔案失敗:`, error);
      return false;
    }
  }

  async deleteFile(filepath) {
    try {
      await fs.unlink(filepath);
      return true;
    } catch (error) {
      console.error(`刪除檔案失敗:`, error);
      return false;
    }
  }

  getVersionPath(versionId) {
    return path.join(this.baseDir, 'versions', versionId);
  }

  getModsPath() {
    return path.join(this.baseDir, 'mods');
  }

  getResourcePacksPath() {
    return path.join(this.baseDir, 'resourcepacks');
  }

  getSavesPath() {
    return path.join(this.baseDir, 'saves');
  }
}
