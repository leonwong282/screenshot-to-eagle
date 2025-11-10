# Changelog

All notable changes to the Screenshot to Eagle extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2025-11-09

### ✨ Added
- 📸 **Core Screenshot Functionality**
  - Interactive area selection mode (`screencapture -i`)
  - Window capture mode (`screencapture -w`)
  - Full screen capture mode
  - Timed capture mode with configurable delay (1-60 seconds)
  - Default mode selection in preferences

- � **Eagle Integration**
  - Auto-upload screenshots to Eagle via Web API
  - Folder selection UI with search functionality
  - Support for recent folders quick access
  - Remember last selected folder using LocalStorage
  - Base64 image encoding for API upload
  - Automatic temporary file cleanup

- ⚙️ **Configuration System**
  - Eagle API URL configuration (default: `http://localhost:41595`)
  - Optional API token authentication
  - Target folder ID configuration
  - Include/exclude mouse cursor option
  - Enable/disable screenshot sound option
  - Customizable timed delay (1-60 seconds)

- 🎯 **User Experience**
  - 6 Raycast commands (5 screenshot modes + folder selection)
  - HUD notifications for non-blocking feedback
  - Toast notifications for status and errors
  - Silent cancellation on ESC press
  - Automatic Raycast window closure before screenshot
  - Real-time Eagle status checking (3-second timeout)

- 📁 **Folder Management**
  - Browse all Eagle folders
  - View recently used folders
  - Search folders by name
  - Copy folder ID to clipboard
  - Clear folder selection option

- 🛠️ **Technical Implementation**
  - Modular TypeScript architecture
  - Type-safe configuration management
  - Comprehensive error handling
  - Result-based return pattern (no throws for user errors)
  - Cancellation detection via file existence check
  - 500ms delay for proper UI closure

- 📚 **Documentation**
  - Complete English README with examples
  - Traditional Chinese README (README.zh-TW.md)
  - Detailed usage guide (docs/使用指南.md)
  - Eagle Web API documentation
  - AI coding agent instructions (.github/copilot-instructions.md)
  - Project summary and technical documentation

### 🏗️ Architecture
- **Modules Structure**
  - `config.ts`: Configuration management with LocalStorage + Preferences
  - `eagle-api.ts`: Eagle Web API client implementation
  - `screenshot.ts`: macOS screencapture command wrapper
  - `shot-to-eagle-core.ts`: Main workflow orchestration (7-step process)

- **Type Definitions**
  - Centralized type system in `types/index.ts`
  - Eagle API types (EagleFolder, EagleApiResponse, EagleAppInfo)
  - Plugin configuration types (PluginConfig, ScreenshotMode)
  - Utility types (ScreenshotResult, UploadResult)

- **Utility Functions**
  - Timestamp-based filename generation
  - File to Base64 conversion
  - File existence checking
  - Temporary file path management
  - Automatic file deletion

### 🔧 Development Tools
- TypeScript 5.8.2 with strict mode
- ESLint configuration for code quality
- Prettier integration for consistent formatting
- Raycast developer tools support
- Hot reload development mode

### � Commands
1. **Shot to Eagle** - Use default mode (configurable in preferences)
2. **Shot to Eagle: Selection** - Interactive area selection
3. **Shot to Eagle: Window** - Window capture
4. **Shot to Eagle: Full Screen** - Full screen capture
5. **Shot to Eagle: Timed** - Timed capture with 5-second delay
6. **Select Eagle Folder** - Folder selection UI

### 🎨 User Interface
- No-view commands for screenshot modes (seamless background execution)
- View command for folder selection (React-based list interface)
- Real-time folder search
- Current selection indicator
- Recent folders section
- Folder metadata display (image count, description)

### � Security & Privacy
- API token stored securely in Raycast preferences
- Temporary files automatically deleted after upload
- No persistent storage of screenshot data
- Optional token authentication support

### 📊 Performance
- 3-second timeout for Eagle API calls
- Instant screenshot execution
- Fast Base64 conversion
- Minimal memory footprint
- No blocking operations

---

## [Unreleased]

### 🔮 Planned Features (v1.1.0+)
- 📝 Screenshot history and management
- 🎨 Basic annotation tools (arrows, text, highlights)
- 📋 Copy to clipboard option
- 🔍 OCR text recognition
- 📦 Batch screenshot upload
- 🖼️ Screenshot preview before upload
- 📄 Custom filename templates
- 🌐 Multi-language UI support
- 📊 Usage statistics and analytics

### � Future Enhancements (v2.0.0+)
- ✏️ Full-featured screenshot editor
- 🎥 Screen recording support
- ☁️ Cloud sync integration
- 👥 Team collaboration features
- 🔗 Integration with other screenshot tools (CleanShot X, Xnip)
- 🎯 Smart folder recommendations
- 🔄 Duplicate screenshot detection
- 📱 iOS companion app

---

## Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

## Links

- **Repository**: [https://github.com/leonwong282/screenshot-to-eagle](https://github.com/leonwong282/screenshot-to-eagle)
- **Issues**: [https://github.com/leonwong282/screenshot-to-eagle/issues](https://github.com/leonwong282/screenshot-to-eagle/issues)
- **Raycast Store**: Coming soon

---

<div align="center">

**Made with ❤️ by [Leon Wong](https://github.com/leonwong282)**

[⬆ Back to Top](#changelog)

</div>
