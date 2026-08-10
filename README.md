# Minecraft 啟動器

一個無需管理員權限即可使用的 Minecraft 桌面啟動器。

## 功能

✨ **核心功能**
- 🎮 Minecraft Java 版本下載與管理
- 📦 Mods 和資源包管理
- 💾 遊戲存檔管理
- 🚀 一鍵啟動遊戲
- 📥 無管理員權限下載支持

## 系統要求

- Node.js 14+
- Java 8+（用於運行遊戲）
- 500MB+ 可用磁盤空間

## 安裝

### 1. 安裝依賴
```bash
npm install
```

### 2. 啟動應用
```bash
npm start
```

### 開發模式（帶開發工具）
```bash
npm run dev
```

## 項目結構

```
minecraft-launcher/
├── main.js                 # Electron 主進程
├── preload.js             # 預加載腳本
├── package.json           # 項目配置
├── src/
│   ├── index.html         # 主窗口 HTML
│   ├── renderer.js        # 渲染進程邏輯
│   ├── styles.css         # 樣式表
│   └── modules/
│       ├── downloader.js  # 下載管理
│       ├── fileManager.js # 文件管理
│       └── minecraftManager.js  # Minecraft 管理
└── minecraft-data/        # 遊戲數據目錄
    ├── versions/          # 遊戲版本
    ├── mods/              # Mods
    ├── resourcepacks/     # 資源包
    └── saves/             # 遊戲存檔
```

## 使用說明

### 下載版本
1. 在「可用版本」區域找到要下載的版本
2. 點擊「下載」按鈕
3. 等待下載完成

### 啟動遊戲
1. 在「已安裝版本」區域找到版本
2. 點擊「啟動」按鈕
3. 遊戲將在新窗口中啟動

### 管理 Mods
1. 在「模組管理」區域輸入 Mod URL
2. 點擊「新增模組」
3. 點擊「下載」開始下載

## 技術棧

- **Electron**: 桌面應用框架
- **Node.js**: 後端運行時
- **axios**: HTTP 下載客戶端
- **uuid**: 唯一標識符生成

## 構建應用

```bash
npm run build
```

編譯後的應用將在 `dist` 目錄中

## 許可證

MIT

## 常見問題

**Q: 如何更新遊戲版本？**
A: 刪除舊版本後重新下載新版本

**Q: Mods 在哪裡？**
A: 所有文件存儲在 `minecraft-data` 目錄中

**Q: 支持哪些平台？**
A: Windows、macOS、Linux

## 貢獻

歡迎提交 Issue 和 Pull Request！