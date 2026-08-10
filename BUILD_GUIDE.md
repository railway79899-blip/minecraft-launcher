# Minecraft 啟動器 - 構建指南 🎮

本指南說明如何在不同操作系統上構建可執行文件。

## 📋 前置要求

```bash
# 1. 克隆項目
git clone https://github.com/railway79899-blip/minecraft-launcher.git
cd minecraft-launcher

# 2. 安裝依賴
npm install
```

---

## 🪟 Windows - 構建 EXE

### 步驟 1: 安裝 Node.js 和 Git
- 從 https://nodejs.org 下載 LTS 版本
- 從 https://git-scm.com 下載 Git

### 步驟 2: 克隆並安裝
```bash
git clone https://github.com/railway79899-blip/minecraft-launcher.git
cd minecraft-launcher
npm install
```

### 步驟 3: 構建 EXE
```bash
npm run build:win
```

### 步驟 4: 查找輸出文件
- **安裝程序**: `dist/Minecraft Launcher 1.0.0.exe`
- **便攜版**: `dist/Minecraft Launcher 1.0.0 Setup.exe`
- **ZIP 包**: `dist/Minecraft Launcher-1.0.0-win.zip`

---

## 🍎 macOS - 構建 DMG

### 步驟 1: 安裝必要工具
```bash
# 安裝 Homebrew（如果未安裝）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安裝 Node.js
brew install node
```

### 步驟 2: 克隆並安裝
```bash
git clone https://github.com/railway79899-blip/minecraft-launcher.git
cd minecraft-launcher
npm install
```

### 步驟 3: 構建 DMG
```bash
npm run build:mac
```

### 步驟 4: 查找輸出文件
- **DMG 安裝程序**: `dist/Minecraft Launcher-1.0.0.dmg`
- **ZIP 包**: `dist/Minecraft Launcher-1.0.0-mac.zip`
- **App 包**: `dist/mac/Minecraft Launcher.app`

---

## 🐧 Linux - 構建 AppImage 和 DEB

### 步驟 1: 安裝 Node.js
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install nodejs npm

# Fedora
sudo dnf install nodejs npm

# Arch
sudo pacman -S nodejs npm
```

### 步驟 2: 克隆並安裝
```bash
git clone https://github.com/railway79899-blip/minecraft-launcher.git
cd minecraft-launcher
npm install
```

### 步驟 3: 構建
```bash
npm run build:linux
```

### 步驟 4: 查找輸出文件
- **AppImage**: `dist/Minecraft Launcher-1.0.0.AppImage`
- **DEB 包**: `dist/minecraft-launcher_1.0.0_amd64.deb`

---

## 🚀 快速開發與測試

```bash
# 開發模式（帶開發工具）
npm run dev

# 測試啟動
npm start

# 快速打包預覽（不簽署）
npm run pack
```

---

## ⚙️ 自定義構建配置

編輯 `package.json` 中的 `"build"` 部分來自定義：
- 應用圖標
- 簽署證書
- 輸出目錄
- 安裝程序選項

---

## 🔗 相關資源

- [Electron 官方文檔](https://www.electronjs.org/docs)
- [Electron Builder 配置](https://www.electron.build/configuration/configuration)
- [GitHub 發布頁面](https://github.com/railway79899-blip/minecraft-launcher/releases)

---

## 📝 注意事項

- **代碼簽署**: 生產環境建議配置代碼簽署（需要證書）
- **更新機制**: 可配置自動更新功能
- **平台特定**: 每個平台需在對應系統上構建以確保最佳兼容性
- **文件大小**: 打包後文件約 100-150MB（包含 Electron 運行時）

---

祝構建順利！🎉
