<a id="readme-top"></a>

<div align="center">

# 📸 Screenshot to Eagle

> 強大的 Raycast 擴充功能，無縫整合 macOS 截圖和 Eagle 資產管理

![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Platform](https://img.shields.io/badge/Platform-macOS-black?style=for-the-badge)
![Raycast](https://img.shields.io/badge/Raycast-Extension-red?style=for-the-badge)

[🌍 English](README.md) | [🇹🇼 繁體中文](README.zh-TW.md)

[功能特色](#-功能特色) • [安裝](#-安裝) • [使用方法](#-使用方法) • [配置](#-配置)

</div>

## ✨ 功能特色

- 🎯 **5 種截圖模式**
  - 互動式選區（拖曳選擇區域）
  - 視窗截圖（點擊選擇視窗）
  - 全螢幕截圖（擷取整個螢幕）
  - 延時截圖（預設 5 秒延遲）
  - 預設模式（可自訂）

- 🦅 **Eagle 整合**
  - 自動上傳至 Eagle 資料庫
  - 支援資料夾選擇
  - 直接儲存至指定資料夾
  - 最近使用資料夾快速存取
  - 記憶資料夾選擇

- ⚙️ **可自訂設定**
  - 選擇預設截圖模式
  - 包含/排除滑鼠游標
  - 啟用/停用相機音效
  - 調整延時時長
  - 可選 API token 驗證

- 🚀 **流暢工作流程**
  - 快速順暢的操作
  - 無視窗命令（背景執行）
  - 即時狀態回饋
  - 自動清理檔案
  - 支援 ESC 取消

## 📋 系統需求

- macOS 作業系統
- 已安裝並執行 [Eagle](https://eagle.cool/) 應用程式
- 已啟用 Eagle Web API（設定 → 實驗室 → API）
- 已安裝 Raycast

## 🛠️ 技術堆疊

- **平台**: Raycast API 1.103.6
- **語言**: TypeScript 5.8.2
- **執行環境**: Node.js 22.13.10
- **截圖**: macOS 原生 `screencapture` 命令
- **API**: Eagle Web API (REST)

<p align="right">(<a href="#readme-top">回到頂部</a>)</p>

## 📦 安裝

### 從 Raycast Store 安裝（推薦）

1. 開啟 Raycast
2. 搜尋 "Screenshot to Eagle"
3. 點擊「安裝擴充功能」

### 手動安裝

1. Clone 此儲存庫
   ```bash
   git clone https://github.com/leonwong282/screenshot-to-eagle.git
   cd screenshot-to-eagle
   ```

2. 安裝相依套件
   ```bash
   npm install
   ```

3. 建置擴充功能
   ```bash
   npm run build
   ```

4. 匯入至 Raycast
   - 開啟 Raycast 偏好設定
   - 前往 擴充功能 → 新增擴充功能
   - 選擇建置的擴充功能目錄

<p align="right">(<a href="#readme-top">回到頂部</a>)</p>

## 🚀 快速開始

### 第一步：啟用 Eagle Web API

1. 開啟 Eagle 應用程式
2. 前往 **設定** → **實驗室** → **API**
3. 啟用 **Web API**
4. 複製您的 **API Token**（如需要）
5. 記下 **API URL**（預設：`http://localhost:41595`）

### 第二步：配置擴充功能

1. 開啟 Raycast
2. 搜尋 "Screenshot to Eagle"
3. 按 `⌘ + ,` 開啟擴充功能設定
4. 配置以下選項：

**基礎配置**（可選）：
- Eagle API URL: `http://localhost:41595`（預設）
- Eagle API Token: 在 Eagle → 設定 → 實驗室 → API 中查找

**可選配置**：
- 預設截圖模式：選擇您偏好的截圖方式
- 包含滑鼠游標：是否在截圖中顯示滑鼠
- 截圖音效：是否播放快門聲音
- 延遲時間：延時截圖模式的等待秒數

### 第三步：選擇目標資料夾（推薦）

1. 在 Raycast 中搜尋 "Select Eagle Folder"
2. 瀏覽顯示的資料夾列表：
   - **Current Selection**：目前選中的資料夾
   - **Recent Folders**：最近使用的資料夾
   - **All Folders**：所有可用資料夾
3. 點擊選擇您想要儲存截圖的資料夾
4. 看到成功提示後，配置完成！

### 第四步：開始截圖

1. 在 Raycast 中搜尋 "Shot to Eagle"
2. 或者設定快捷鍵（推薦：`⌘ + ⇧ + 4`）
3. 螢幕進入截圖模式
4. 根據您的配置模式進行截圖：
   - **選區模式**：拖動選擇區域
   - **視窗模式**：點擊視窗
   - **全螢幕模式**：自動截取全螢幕
   - **延時模式**：等待倒數計時後選擇區域
5. 截圖完成後會自動上傳到 Eagle
6. 看到 "✓ Saved to Eagle" 提示表示成功

<p align="right">(<a href="#readme-top">回到頂部</a>)</p>

## 📖 使用方法

### 可用命令

- **Shot to Eagle** - 使用預設模式（可自訂）
- **Shot to Eagle: Selection** - 互動式區域選擇
- **Shot to Eagle: Window** - 點擊擷取視窗
- **Shot to Eagle: Full Screen** - 擷取全螢幕
- **Shot to Eagle: Timed** - 5 秒延遲 + 選擇
- **Select Eagle Folder** - 選擇目標 Eagle 資料夾

### 鍵盤快捷鍵

您可以在 Raycast 偏好設定中指定自訂鍵盤快捷鍵：

**建議的快捷鍵：**
- `⌘ + ⇧ + 4` - Shot to Eagle（預設模式）
- `⌘ + ⇧ + 5` - Select Eagle Folder

**截圖過程中：**
- `ESC` - 取消截圖
- `Space` - 在區域選擇和視窗選擇之間切換
- `Space`（拖動時）- 移動選擇區域
- `⇧`（拖動時）- 鎖定寬高比
- `⌥`（拖動時）- 從中心擴展

<p align="right">(<a href="#readme-top">回到頂部</a>)</p>

## ⚙️ 配置

### Eagle API 設定

- **Eagle API URL**（必填）
  - 預設：`http://localhost:41595`
  - Eagle Web API 的 URL 位址
  - 可在 Eagle 設定中找到

- **Eagle API Token**（選填）
  - 從 Eagle 設定 → 實驗室 → API 取得
  - 如果 Eagle 需要驗證則必填
  - 範例：`fcc1cccd-acc9-cxxx-bxxb-7xxxxxef5xx7`

- **目標資料夾 ID**（選填）
  - 截圖將儲存到的 Eagle 資料夾 ID
  - 留空以儲存至根目錄
  - 建議使用「Select Eagle Folder」命令來設定

### 截圖設定

- **預設截圖模式**
  - 選項：選區、視窗、全螢幕、延時
  - 預設：選區（互動式）
  - 決定「Shot to Eagle」命令的行為

- **包含游標**
  - 預設：關閉
  - 啟用後，截圖中會包含滑鼠游標

- **截圖音效**
  - 預設：開啟
  - 擷取截圖時播放相機音效

- **延時時長**
  - 預設：5 秒
  - 範圍：1-60 秒
  - 用於延時截圖模式

<p align="right">(<a href="#readme-top">回到頂部</a>)</p>

## 🏗️ 專案結構

```
screenshot-to-eagle/
├── src/
│   ├── modules/              # 核心功能模組
│   │   ├── config.ts         # 設定管理
│   │   ├── eagle-api.ts      # Eagle Web API 整合
│   │   ├── screenshot.ts     # macOS 截圖命令
│   │   └── shot-to-eagle-core.ts  # 主要工作流程邏輯
│   ├── types/                # TypeScript 型別定義
│   ├── utils/                # 工具函式
│   ├── shot-to-eagle*.ts     # 命令入口點（5 種模式）
│   └── select-folder.tsx     # 資料夾選擇 UI
├── assets/                   # 擴充功能資源
├── docs/                     # 文件
│   ├── Eagle Web API.md      # Eagle API 文件
└── package.json              # 擴充功能清單
```

<p align="right">(<a href="#readme-top">回到頂部</a>)</p>

## 🔧 開發

### 設定

```bash
# 安裝相依套件
npm install

# 開發模式（即時重新載入）
npm run dev

# 建置正式版本
npm run build

# 執行 linter
npm run lint

# 修正 linting 問題
npm run fix-lint
```

### 發布

```bash
# 發布到 Raycast Store
npm run publish
```

<p align="right">(<a href="#readme-top">回到頂部</a>)</p>

## 💡 使用技巧

### 技巧 1：使用鍵盤快捷鍵
在 Raycast 設定中為命令設定鍵盤快捷鍵以提升效率：
- 推薦：`⌘ + ⇧ + 4`（替代系統截圖）
- 或者：`⌘ + ⇧ + 5`

### 技巧 2：使用資料夾組織
在 Eagle 中建立資料夾結構：
```
Screenshots/
├── Work/
│   ├── Meetings
│   ├── Projects
│   └── References
├── Personal/
└── Archive/
```

### 技巧 3：延時截圖的使用場景
- 擷取選單或下拉選單
- 擷取滑鼠懸停效果
- 擷取彈出視窗
- 準備表情和姿勢 😄

<p align="right">(<a href="#readme-top">回到頂部</a>)</p>

## ❓ 常見問題

### Q：截圖後沒有反應？
**A**：檢查以下幾點：
- Eagle 是否正在執行？
- Eagle Web API 是否啟用？
- 網路連線是否正常？
- 查看 Raycast 是否顯示錯誤提示

### Q：如何找到 Eagle API Token？
**A**： 
1. 開啟 Eagle
2. Eagle → 設定（`⌘ + ,`）
3. 實驗室 → Web API
4. 複製 Token（格式：`f4f16c3d-a969-4060-b6db-773918ef5cc7`）

### Q：可以更改截圖檔案名稱嗎？
**A**：目前版本使用固定格式：`Screenshot_YYYY-MM-DD_HH-mm-ss`
未來版本會支援自訂檔案名稱模板。

### Q：截圖會佔用很多儲存空間嗎？
**A**： 
- PNG 格式，品質較高
- 建議定期清理不需要的截圖
- Eagle 支援壓縮功能

### Q：可以截取部分應用程式嗎？
**A**： 
- 使用選區模式可以截取任意區域
- 使用視窗模式可以截取整個視窗
- macOS 系統限制，某些安全應用程式可能無法截取

<p align="right">(<a href="#readme-top">回到頂部</a>)</p>

## 🐛 疑難排解

### 問題：Eagle 未執行
**症狀**：顯示 "Eagle is not running" 錯誤

**解決方法**：
1. 確認 Eagle 應用程式已開啟
2. 檢查 Eagle Web API 是否已啟用
3. 驗證 API URL 設定正確
4. 嘗試重新啟動 Eagle

### 問題：截圖未出現在 Eagle
**症狀**：截圖成功但在 Eagle 中找不到

**解決方法**：
1. 檢查 Eagle 中的「最近新增」
2. 驗證資料夾 ID 是否正確
3. 確認 Eagle 有足夠的儲存空間
4. 檢查 Eagle 是否有任何錯誤提示

### 問題：截圖介面未出現
**症狀**：命令執行後沒有截圖介面

**解決方法**：
1. 等待 Raycast 視窗完全關閉（約 0.5 秒）
2. 檢查是否有其他應用程式遮擋
3. 確認 macOS 系統權限設定正確
4. 嘗試重新啟動 Raycast

<p align="right">(<a href="#readme-top">回到頂部</a>)</p>

## 🤝 貢獻

歡迎貢獻！請隨時提交 Pull Request。

1. Fork 此儲存庫
2. 建立您的功能分支（`git checkout -b feature/AmazingFeature`）
3. 提交您的變更（`git commit -m 'Add some AmazingFeature'`）
4. 推送到分支（`git push origin feature/AmazingFeature`）
5. 開啟 Pull Request

<p align="right">(<a href="#readme-top">回到頂部</a>)</p>

## 📄 授權

此專案採用 MIT 授權 - 詳見 [LICENSE](LICENSE) 檔案。

<p align="right">(<a href="#readme-top">回到頂部</a>)</p>

## 👥 作者

- **Leon Wong** - *初始開發* - [leonwong282](https://github.com/leonwong282)

## 🙏 致謝

- [Raycast](https://raycast.com/) - macOS 上最棒的啟動器
- [Eagle](https://eagle.cool/) - 最佳資產管理工具
- macOS `screencapture` - 原生截圖工具
- TypeScript - 型別安全的 JavaScript

<p align="right">(<a href="#readme-top">回到頂部</a>)</p>

## 📞 支援

如果您遇到任何問題或需要協助：

- 🐛 [回報錯誤](https://github.com/leonwong282/screenshot-to-eagle/issues)
- 💡 [功能建議](https://github.com/leonwong282/screenshot-to-eagle/issues)
- 📖 [閱讀英文文件](README.md)
- 📧 電子郵件：leonwong282@gmail.com

## 🔗 相關連結

- **Eagle 官網**：[https://eagle.cool/](https://eagle.cool/)
- **Raycast 官網**：[https://raycast.com/](https://raycast.com/)
- **專案首頁**：[https://github.com/leonwong282/screenshot-to-eagle](https://github.com/leonwong282/screenshot-to-eagle)

---

<div align="center">

**⭐ 如果此專案對您有幫助，請給它一個星星！**

用 ❤️ 製作，作者 [Leon](https://github.com/leonwong282)

</div> 
