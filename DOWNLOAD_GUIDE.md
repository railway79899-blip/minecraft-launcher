# 📥 Minecraft 啟動器 - 下載和安裝指南

## 🎮 快速選擇

選擇您的操作系統：

---

## 🪟 Windows - 獲取 EXE

### ⚡ 方式 1: 自己構建（推薦，最新版本）
```bash
git clone https://github.com/railway79899-blip/minecraft-launcher.git
cd minecraft-launcher
npm install
npm run build:win
```
✅ 生成文件在 `dist/` 文件夾

### 📦 方式 2: 從源代碼
1. 下載源代碼：[minecraft-launcher-complete.zip](https://github.com/railway79899-blip/minecraft-launcher/archive/refs/heads/main.zip)
2. 按上方"方式 1"步驟操作

### ⏳ 方式 3: 等待 GitHub Releases（未來）
- 進入 [Releases 頁面](https://github.com/railway79899-blip/minecraft-launcher/releases)
- 下載 `*.exe` 文件直接運行

---

## 🍎 macOS - 獲取 DMG

### ⚡ 方式 1: 自己構建（推薦，最新版本）
```bash
git clone https://github.com/railway79899-blip/minecraft-launcher.git
cd minecraft-launcher
npm install
npm run build:mac
```
✅ 生成文件在 `dist/` 文件夾

### 📦 方式 2: 從源代碼
1. 下載源代碼：[minecraft-launcher-complete.zip](https://github.com/railway79899-blip/minecraft-launcher/archive/refs/heads/main.zip)
2. 按上方"方式 1"步驟操作

### ⏳ 方式 3: 等待 GitHub Releases（未來）
- 進入 [Releases 頁面](https://github.com/railway79899-blip/minecraft-launcher/releases)
- 下載 `*.dmg` 文件直接運行

---

## 🐧 Linux - 獲取 AppImage 或 DEB

### ✅ 已預構建版本可用

#### 📥 AppImage（通用 Linux）
```bash
# 下載最新構建
wget https://github.com/railway79899-blip/minecraft-launcher/releases/download/latest/Minecraft\ Launcher-1.0.0.AppImage
chmod +x Minecraft\ Launcher-1.0.0.AppImage
./Minecraft\ Launcher-1.0.0.AppImage
```

#### 📦 DEB（Ubuntu/Debian）
```bash
# 下載最新構建
wget https://github.com/railway79899-blip/minecraft-launcher/releases/download/latest/minecraft-launcher_1.0.0_amd64.deb
sudo apt install ./minecraft-launcher_1.0.0_amd64.deb
minecraft-launcher  # 運行
```

#### 🔨 自己構建
```bash
git clone https://github.com/railway79899-blip/minecraft-launcher.git
cd minecraft-launcher
npm install
npm run build:linux
```

---

## 📋 完整構建指南

詳細的跨平台構建說明見：[BUILD_GUIDE.md](BUILD_GUIDE.md)

包含：
- 每個平台的詳細步驟
- 環境配置
- 自定義選項
- 常見問題解決

---

## 🚀 安裝後立即使用

### Windows
1. 運行 `Minecraft Launcher-1.0.0.exe`
2. 選擇 Java ☕ 或 Bedrock 🏘️
3. 下載版本或運行已安裝版本

### macOS
1. 打開 `Minecraft Launcher-1.0.0.dmg`
2. 將應用拖入 Applications 文件夾
3. 雙擊運行

### Linux
1. 雙擊 `.AppImage` 或運行 `./Minecraft\ Launcher-1.0.0.AppImage`
2. 或使用包管理器安裝 `.deb` 文件
3. 從應用菜單運行

---

## 🔗 重要鏈接

| 資源 | 鏈接 |
|------|------|
| 📌 GitHub 主頁 | [https://github.com/railway79899-blip/minecraft-launcher](https://github.com/railway79899-blip/minecraft-launcher) |
| 📦 Releases | [https://github.com/railway79899-blip/minecraft-launcher/releases](https://github.com/railway79899-blip/minecraft-launcher/releases) |
| 📥 源代碼 | [minecraft-launcher-main.zip](https://github.com/railway79899-blip/minecraft-launcher/archive/refs/heads/main.zip) |
| 📚 構建指南 | [BUILD_GUIDE.md](BUILD_GUIDE.md) |

---

## ❓ 常見問題

### Q: 為什麼沒有直接下載的 EXE/DMG？
A: 跨平台構建需要在對應系統上進行。建議在 Windows 上構建 EXE，在 macOS 上構建 DMG。我們已提供完整構建指南。

### Q: 我可以從哪裡下載預構建版本？
A: 
- **Linux**: 本倉庫 GitHub Releases 已有 AppImage 和 DEB
- **Windows/macOS**: 可自己按指南構建，或等待未來發布預構建版本

### Q: 構建需要多長時間？
A: 首次構建 5-10 分鐘（包括下載 Electron），之後 2-3 分鐘

### Q: 需要有 Minecraft 許可嗎？
A: 需要。啟動器只協助下載和管理遊戲，使用前需購買或使用合法帳號

### Q: 支持 Minecraft 的哪些版本？
A: 
- ☕ **Java 版**: 1.20.1, 1.19.2, 1.18.2（可擴展）
- 🏘️ **Bedrock**: 1.20.1, 1.19.0, 1.18.0（可擴展）

---

## 🆘 需要幫助？

- 📖 查看 [BUILD_GUIDE.md](BUILD_GUIDE.md)
- 🐛 提交 Issue：[GitHub Issues](https://github.com/railway79899-blip/minecraft-launcher/issues)
- 💬 討論：[GitHub Discussions](https://github.com/railway79899-blip/minecraft-launcher/discussions)

---

祝您玩得愉快！🎮✨
