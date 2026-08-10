class MinecraftLauncher {
  constructor() {
    this.downloads = new Map();
    this.mods = [];
    this.currentType = 'java'; // 預設選擇 Java
    this.init();
  }

  async init() {
    this.setupEventListeners();
    await this.loadVersions();
  }

  setupEventListeners() {
    // 版本類型切換
    document.querySelectorAll('.type-button').forEach(btn => {
      btn.addEventListener('click', (e) => this.switchVersionType(e.target.dataset.type));
    });

    // 模組管理
    document.getElementById('addModBtn')?.addEventListener('click', () => this.addMod());
    document.getElementById('modUrl')?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.addMod();
    });
  }

  switchVersionType(type) {
    this.currentType = type;
    
    // 更新按鈕樣式
    document.querySelectorAll('.type-button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.type === type);
    });

    // 重新載入版本
    this.loadVersions();
  }

  async loadVersions() {
    try {
      // 載入已安裝版本
      const installed = await window.minecraft.getInstalledVersions(this.currentType);
      this.displayInstalledVersions(installed);

      // 載入可用版本
      const available = await window.minecraft.getVersions(this.currentType);
      this.displayAvailableVersions(available);
    } catch (error) {
      console.error('載入版本失敗:', error);
      this.showError('載入版本失敗');
    }
  }

  displayInstalledVersions(versions) {
    const container = document.getElementById('installedVersions');
    if (!versions || versions.length === 0) {
      container.innerHTML = '<p class="empty">未安裝任何版本</p>';
      return;
    }

    container.innerHTML = versions.map(v => `
      <div class="version-item">
        <div class="version-info">
          <div class="version-name">${v.name}</div>
          <div class="version-meta">
            <span>大小: ${this.formatFileSize(v.size)}</span>
            <span> | 安裝時間: ${new Date(v.installedAt).toLocaleDateString('zh-TW')}</span>
          </div>
        </div>
        <button class="button" onclick="launcher.launchGame('${v.id}')">啟動</button>
      </div>
    `).join('');
  }

  displayAvailableVersions(versions) {
    const container = document.getElementById('availableVersions');
    if (!versions || versions.length === 0) {
      container.innerHTML = '<p class="empty">無可用版本</p>';
      return;
    }

    container.innerHTML = versions.map(v => `
      <div class="version-item">
        <div class="version-info">
          <div class="version-name">${v.name}</div>
          <div class="version-meta">
            大小: ${this.formatFileSize(v.size)} | 發布: ${v.releaseDate}
          </div>
        </div>
        <button class="button" onclick="launcher.downloadVersion('${v.id}')">下載</button>
      </div>
    `).join('');
  }

  async downloadVersion(versionId) {
    try {
      const result = await window.minecraft.downloadVersion(versionId, this.currentType);
      this.showSuccess(`正在下載版本...`);
      this.trackDownload(result.downloadId, `${this.currentType.toUpperCase()}: ${versionId}`);
    } catch (error) {
      this.showError(`下載失敗: ${error.message}`);
    }
  }

  async launchGame(versionId) {
    try {
      await window.minecraft.launchGame(versionId);
      this.showSuccess('遊戲啟動中...');
    } catch (error) {
      this.showError(`啟動失敗: ${error.message}`);
    }
  }

  addMod() {
    const url = document.getElementById('modUrl')?.value;
    if (!url) {
      this.showError('請輸入模組 URL');
      return;
    }

    this.mods.push({
      id: Date.now().toString(),
      url: url,
      status: '等待中'
    });

    document.getElementById('modUrl').value = '';
    this.displayMods();
  }

  displayMods() {
    const container = document.getElementById('modsList');
    if (this.mods.length === 0) {
      container.innerHTML = '<p class="empty">沒有新增模組</p>';
      return;
    }

    container.innerHTML = this.mods.map(m => `
      <div class="mod-item">
        <div class="version-info">
          <div class="version-name">模組</div>
          <div class="version-meta">${m.url}</div>
          <div class="version-meta">狀態: ${m.status}</div>
        </div>
        <button class="button" onclick="launcher.downloadMod('${m.id}')">下載</button>
      </div>
    `).join('');
  }

  async downloadMod(modId) {
    const mod = this.mods.find(m => m.id === modId);
    if (!mod) return;

    try {
      const result = await window.minecraft.downloadMods([mod]);
      mod.status = '下載中';
      this.trackDownload(result.downloadId, `模組: ${mod.url}`);
      this.displayMods();
    } catch (error) {
      this.showError(`下載模組失敗: ${error.message}`);
    }
  }

  trackDownload(downloadId, name) {
    this.downloads.set(downloadId, {
      id: downloadId,
      name: name,
      progress: 0,
      status: '下載中'
    });
    this.updateDownloadsList();
  }

  updateDownloadsList() {
    const container = document.getElementById('downloadsList');
    if (this.downloads.size === 0) {
      container.innerHTML = '<p class="empty">沒有正在進行的下載</p>';
      return;
    }

    container.innerHTML = Array.from(this.downloads.values()).map(d => `
      <div class="download-item">
        <div class="version-info">
          <div class="version-name">${d.name}</div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${d.progress}%"></div>
          </div>
          <div class="progress-text">${d.progress}% - ${d.status}</div>
        </div>
      </div>
    `).join('');
  }

  formatFileSize(bytes) {
    if (!bytes) return '未知';
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(2)} ${units[unitIndex]}`;
  }

  showSuccess(message) {
    console.log('✓', message);
    // 可以擴展為顯示通知
  }

  showError(message) {
    console.error('✗', message);
    // 可以擴展為顯示錯誤提示
  }
}

  async launchGame(versionId) {
    try {
      await window.minecraft.launchGame(versionId);
      this.showSuccess('遊戲啟動中...');
    } catch (error) {
      this.showError(`啟動失敗: ${error.message}`);
    }
  }

  addMod() {
    const url = document.getElementById('modUrl')?.value;
    if (!url) {
      this.showError('請輸入模組 URL');
      return;
    }

    this.mods.push({
      id: Date.now().toString(),
      url: url,
      status: '等待中'
    });

    document.getElementById('modUrl').value = '';
    this.displayMods();
  }

  displayMods() {
    const container = document.getElementById('modsList');
    if (this.mods.length === 0) {
      container.innerHTML = '<p class="empty">沒有新增模組</p>';
      return;
    }

    container.innerHTML = this.mods.map(m => `
      <div class="mod-item">
        <div class="version-info">
          <div class="version-name">模組</div>
          <div class="version-meta">${m.url}</div>
          <div class="version-meta">狀態: ${m.status}</div>
        </div>
        <button class="button" onclick="launcher.downloadMod('${m.id}')">下載</button>
      </div>
    `).join('');
  }

  async downloadMod(modId) {
    const mod = this.mods.find(m => m.id === modId);
    if (!mod) return;

    try {
      const result = await window.minecraft.downloadMods([mod]);
      mod.status = '下載中';
      this.trackDownload(result.downloadId, `模組: ${mod.url}`);
      this.displayMods();
    } catch (error) {
      this.showError(`下載模組失敗: ${error.message}`);
    }
  }

  trackDownload(downloadId, name) {
    this.downloads.set(downloadId, {
      id: downloadId,
      name: name,
      progress: 0,
      status: '下載中'
    });
    this.updateDownloadsList();
  }

  updateDownloadsList() {
    const container = document.getElementById('downloadsList');
    if (this.downloads.size === 0) {
      container.innerHTML = '<p class="empty">沒有正在進行的下載</p>';
      return;
    }

    container.innerHTML = Array.from(this.downloads.values()).map(d => `
      <div class="download-item">
        <div class="version-info">
          <div class="version-name">${d.name}</div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${d.progress}%"></div>
          </div>
          <div class="progress-text">${d.progress}% - ${d.status}</div>
        </div>
      </div>
    `).join('');
  }

  formatFileSize(bytes) {
    if (!bytes) return '未知';
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(2)} ${units[unitIndex]}`;
  }

  showSuccess(message) {
    console.log('✓', message);
    // 可以擴展為顯示通知
  }

  showError(message) {
    console.error('✗', message);
    // 可以擴展為顯示錯誤提示
  }
}

// 初始化應用
const launcher = new MinecraftLauncher();
