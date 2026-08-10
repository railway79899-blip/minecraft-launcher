# Minecraft 啟動器

一個無需管理員權限即可使用的 Minecraft 桌面啟動器，支持 Java 和 Bedrock 版本。

## 功能

✨ **核心功能**
- 🎮 支持 **Java 版本** 下載與管理
- 🏘️ 支持 **Bedrock 版本** 下載與管理
- 📦 Mods 和資源包管理
- 💾 遊戲存檔管理
- 🚀 一鍵啟動遊戲（Java 和 Bedrock）
- 📥 無管理員權限下載支持
- 🔄 版本類型快速切換

## 版本差異

### Java 版本
- 🔧 支持 Mods 和模組加載器（Forge、Fabric 等）
- 📝 自定義伺服器支持
- 💻 跨平台（Windows/macOS/Linux）
- ⚙️ 可自定義 Java 參數

### Bedrock 版本
- 🎯 官方版本，穩定性高
- 📱 支持跨平台多人遊戲
- 🛍️ Marketplace 內容整合
- 🪟 Windows、macOS 原生支持

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
│       ├── downloader.js  # 下載管理（支持兩個版本）
│       ├── fileManager.js # 文件管理
│       └── minecraftManager.js  # Minecraft 管理
└── minecraft-data/        # 遊戲數據目錄
    ├── java/              # Java 版本
    │   ├── 1.20.1/
    │   ├── 1.19.2/
    │   └── ...
    ├── bedrock/           # Bedrock 版本
    │   ├── 1.20.1/
    │   ├── 1.19.0/
    │   └── ...
    ├── mods/              # Mods（Java 專用）
    ├── resourcepacks/     # 資源包
    └── saves/             # 遊戲存檔
```

## 使用說明

### 選擇版本類型
1. 點擊「☕ Java 版本」或「🏘️ Bedrock 版本」按鈕
2. 介面會自動更新顯示對應版本

### 下載版本
1. 在「可用版本」區域找到要下載的版本
2. 點擊「下載」按鈕
3. 等待下載完成（下載進度顯示在下方）

### 啟動遊戲

**Java 版本**
1. 在「已安裝版本」區域找到版本
2. 點擊「啟動」按鈕
3. 遊戲將在新窗口中啟動
4. 確保已安裝 Java 8 或更新版本

**Bedrock 版本**
1. 在「已安裝版本」區域找到版本
2. 點擊「啟動」按鈕
3. 遊戲將使用官方 Minecraft 啟動器啟動

### 管理 Mods（Java 版本專用）
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

**Q: 如何在 Java 和 Bedrock 版本之間切換？**
A: 使用頂部的版本類型按鈕快速切換

**Q: Mods 在哪裡？**
A: 所有文件存儲在 `minecraft-data` 目錄中，Java Mods 在 `java/mods/` 中

**Q: 支持哪些平台？**
A: 
- Java: Windows、macOS、Linux
- Bedrock: Windows、macOS（Linux 不支持）

**Q: 需要管理員權限嗎？**
A: 不需要，所有下載都在用戶目錄進行

**Q: 如何選擇 Java 版本的內存？**
A: 編輯 `minecraftManager.js` 中的 `-Xmx` 和 `-Xms` 參數

**Q: Bedrock 版本可以使用 Mods 嗎？**
A: Bedrock 官方不支持 Mods，但支持 Marketplace 內容和行為包