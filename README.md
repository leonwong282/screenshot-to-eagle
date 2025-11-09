<a id="readme-top"></a>

<div align="center">

# 📸 Screenshot to Eagle

> A powerful Raycast extension that seamlessly integrates macOS screenshot functionality with Eagle asset management

![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Platform](https://img.shields.io/badge/Platform-macOS-black?style=for-the-badge)
![Raycast](https://img.shields.io/badge/Raycast-Extension-red?style=for-the-badge)

[🌍 English](README.md) | [🇹🇼 繁體中文](README.zh-TW.md)

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Configuration](#-configuration)

</div>

## ✨ Features

- 🎯 **5 Screenshot Modes**
  - Interactive Selection (drag to select area)
  - Window Capture (click to select window)
  - Full Screen (capture entire screen)
  - Timed Capture (default 5-second delay)
  - Default Mode (customizable)

- � **Eagle Integration**
  - Auto-upload to Eagle library
  - Folder selection support
  - Direct save to specific folders
  - Recent folders quick access
  - Remember folder selection

- ⚙️ **Customizable Settings**
  - Choose default screenshot mode
  - Include/exclude mouse cursor
  - Enable/disable camera sound
  - Adjust timed delay duration
  - Optional API token authentication

- 🚀 **Seamless Workflow**
  - Fast and smooth operation
  - No-view commands (background execution)
  - Instant status feedback
  - Automatic file cleanup
  - ESC to cancel support

## � Requirements

- macOS operating system
- [Eagle](https://eagle.cool/) app installed and running
- Eagle Web API enabled (Settings → Lab → API)
- Raycast installed

## 🛠️ Tech Stack

- **Platform**: Raycast API 1.103.6
- **Language**: TypeScript 5.8.2
- **Runtime**: Node.js 22.13.10
- **Screenshot**: macOS native `screencapture` command
- **API**: Eagle Web API (REST)

- **API**: Eagle Web API (REST)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## � Installation

### From Raycast Store (Recommended)

1. Open Raycast
2. Search for "Screenshot to Eagle"
3. Click "Install Extension"

### Manual Installation

1. Clone this repository
   ```bash
   git clone https://github.com/leonwong282/screenshot-to-eagle.git
   cd screenshot-to-eagle
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Build the extension
   ```bash
   npm run build
   ```

4. Import into Raycast
   - Open Raycast preferences
   - Go to Extensions → Add Extension
   - Select the built extension directory

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🚀 Quick Start

### Step 1: Enable Eagle Web API

1. Open Eagle app
2. Go to **Settings** → **Lab** → **API**
3. Enable **Web API**
4. Copy your **API Token** (if required)
5. Note the **API URL** (default: `http://localhost:41595`)

### Step 2: Configure Extension

1. Open Raycast
2. Search for "Screenshot to Eagle"
3. Press `⌘ + ,` to open extension settings
4. Configure the following options:

**Basic Configuration** (optional):
- Eagle API URL: `http://localhost:41595` (default)
- Eagle API Token: Find in Eagle → Settings → Lab → API

**Optional Configuration**:
- Default Screenshot Mode: Choose your preferred method
- Include Cursor: Whether to show mouse cursor in screenshots
- Screenshot Sound: Play camera shutter sound
- Timed Delay: Delay duration in seconds for timed mode

### Step 3: Select Target Folder (Recommended)

1. Search for "Select Eagle Folder" in Raycast
2. Browse the displayed folder list:
   - **Current Selection**: Currently selected folder
   - **Recent Folders**: Recently used folders
   - **All Folders**: All available folders
3. Click to select your target folder
4. See success confirmation

### Step 4: Take Your First Screenshot

1. Search for "Shot to Eagle" in Raycast
2. Or set up a keyboard shortcut (recommended: `⌘ + ⇧ + 4`)
3. Screen enters screenshot mode
4. Take screenshot according to your configured mode:
   - **Selection Mode**: Drag to select area
   - **Window Mode**: Click window
   - **Full Screen Mode**: Auto-capture entire screen
   - **Timed Mode**: Wait for countdown, then select area
5. Screenshot automatically uploads to Eagle
6. See "✓ Saved to Eagle" confirmation

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 📖 Usage

### Available Commands

- **Shot to Eagle** - Use default mode (customizable)
- **Shot to Eagle: Selection** - Interactive area selection
- **Shot to Eagle: Window** - Click to capture window
- **Shot to Eagle: Full Screen** - Capture entire screen
- **Shot to Eagle: Timed** - 5-second delay + selection
- **Select Eagle Folder** - Choose target Eagle folder

### Keyboard Shortcuts

You can assign custom keyboard shortcuts in Raycast preferences:

**Suggested Shortcuts:**
- `⌘ + ⇧ + 4` - Shot to Eagle (default mode)
- `⌘ + ⇧ + 5` - Select Eagle Folder

**During Screenshot:**
- `ESC` - Cancel screenshot
- `Space` - Switch between area and window selection
- `Space` (while dragging) - Move selection area
- `⇧` (while dragging) - Lock aspect ratio
- `⌥` (while dragging) - Expand from center

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## ⚙️ Configuration

### Eagle API Settings

- **Eagle API URL** (required)
  - Default: `http://localhost:41595`
  - The URL of Eagle Web API
  - Can be found in Eagle settings

- **Eagle API Token** (optional)
  - Get from Eagle Settings → Lab → API
  - Required if Eagle requires authentication
  - Example: `f4f16c3d-a969-4060-b6db-773918ef5cc7`

- **Target Folder ID** (optional)
  - Eagle folder ID where screenshots will be saved
  - Leave empty to save to root
  - Recommended to use "Select Eagle Folder" command

### Screenshot Settings

- **Default Screenshot Mode**
  - Options: Selection, Window, Full Screen, Timed
  - Default: Selection (interactive)
  - Determines "Shot to Eagle" command behavior

- **Include Cursor**
  - Default: Off
  - When enabled, mouse cursor appears in screenshots

- **Screenshot Sound**
  - Default: On
  - Play camera shutter sound when capturing

- **Timed Delay**
  - Default: 5 seconds
  - Range: 1-60 seconds
  - Used for timed screenshot mode

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🏗️ Project Structure

```
screenshot-to-eagle/
├── src/
│   ├── modules/              # Core functionality modules
│   │   ├── config.ts         # Configuration management
│   │   ├── eagle-api.ts      # Eagle Web API integration
│   │   ├── screenshot.ts     # macOS screenshot commands
│   │   └── shot-to-eagle-core.ts  # Main workflow logic
│   ├── types/                # TypeScript type definitions
│   ├── utils/                # Utility functions
│   ├── shot-to-eagle*.ts     # Command entry points (5 modes)
│   └── select-folder.tsx     # Folder selection UI
├── assets/                   # Extension assets
├── docs/                     # Documentation
│   ├── Eagle Web API.md      # Eagle API documentation
└── package.json              # Extension manifest
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🔧 Development

### Setup

```bash
# Install dependencies
npm install

# Development mode (hot reload)
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Fix linting issues
npm run fix-lint
```

### Publishing

```bash
# Publish to Raycast Store
npm run publish
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 💡 Tips & Tricks

### Tip 1: Use Keyboard Shortcuts
Set up keyboard shortcuts in Raycast preferences for faster workflow:
- Recommended: `⌘ + ⇧ + 4` (replaces system screenshot)
- Or: `⌘ + ⇧ + 5`

### Tip 2: Organize with Folders
Create a folder structure in Eagle:
```
Screenshots/
├── Work/
│   ├── Meetings
│   ├── Projects
│   └── References
├── Personal/
└── Archive/
```

### Tip 3: Timed Mode Use Cases
- Capture menus or dropdowns
- Capture hover effects
- Capture pop-up windows
- Prepare expressions and poses 😄

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## ❓ FAQ

### Q: Screenshot not working?
**A**: Check the following:
- Is Eagle running?
- Is Eagle Web API enabled?
- Is network connection normal?
- Check Raycast for error messages

### Q: How to find Eagle API Token?
**A**: 
1. Open Eagle
2. Eagle → Settings (`⌘ + ,`)
3. Lab → Web API
4. Copy Token (format: `xxxc3d-axx9-4xx0-bxdb-7xxx918ef5cc7`)

### Q: Can I customize screenshot filename?
**A**: Current version uses fixed format: `Screenshot_YYYY-MM-DD_HH-mm-ss`
Future versions will support custom filename templates.

### Q: Will screenshots take up much storage?
**A**: 
- PNG format, high quality
- Recommend periodic cleanup of unwanted screenshots
- Eagle supports compression features

### Q: Can I capture specific applications?
**A**: 
- Use Selection mode to capture any area
- Use Window mode to capture entire window
- macOS restrictions may prevent capturing some security apps

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🐛 Troubleshooting

### Issue: Eagle Not Running
**Symptoms**: "Eagle is not running" error

**Solutions**:
1. Confirm Eagle app is open
2. Check if Eagle Web API is enabled
3. Verify API URL is correct
4. Try restarting Eagle

### Issue: Screenshot Not Appearing in Eagle
**Symptoms**: Screenshot succeeds but can't find in Eagle

**Solutions**:
1. Check "Recently Added" in Eagle
2. Verify folder ID is correct
3. Confirm Eagle has enough storage space
4. Check Eagle for any error messages

### Issue: Screenshot Interface Not Appearing
**Symptoms**: No screenshot interface after command execution

**Solutions**:
1. Wait for Raycast window to close (~0.5s)
2. Check for other apps blocking
3. Verify macOS system permissions are correct
4. Try restarting Raycast

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 👥 Author

- **Leon Wong** - *Initial work* - [leonwong282](https://github.com/leonwong282)

## 🙏 Acknowledgments

- [Raycast](https://raycast.com/) - The best macOS launcher
- [Eagle](https://eagle.cool/) - Excellent asset management tool
- macOS `screencapture` - Native screenshot utility
- TypeScript - Type-safe JavaScript

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 📞 Support

If you have any questions or need help:

- 🐛 [Report Bug](https://github.com/leonwong282/screenshot-to-eagle/issues)
- 💡 [Request Feature](https://github.com/leonwong282/screenshot-to-eagle/issues)
- 📧 Email: leonwong282@gmail.com

## 🔗 Links

- **Eagle Official**: [https://eagle.cool/](https://eagle.cool/)
- **Raycast Official**: [https://raycast.com/](https://raycast.com/)
- **Project Homepage**: [https://github.com/leonwong282/screenshot-to-eagle](https://github.com/leonwong282/screenshot-to-eagle)

---

<div align="center">

**⭐ Star this repository if it helped you!**

Made with ❤️ by [Leon](https://github.com/leonwong282)

</div>
