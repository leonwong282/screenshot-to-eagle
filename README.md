# Screenshot to Eagle

A Raycast extension that captures screenshots on macOS and automatically saves them to Eagle using the Eagle Web API.

## Features

- 📸 **Quick Screenshot**: Take screenshots directly from Raycast
- 🦅 **Auto Save to Eagle**: Automatically upload screenshots to your Eagle library
- 📁 **Folder Selection**: Choose which Eagle folder to save screenshots to
- 🎯 **Multiple Capture Modes**: Selection, Window, Full Screen, or Timed capture
- 🏷️ **Auto Tagging**: Automatically tag your screenshots
- ⚙️ **Customizable**: Configure default mode, tags, sound effects, and more

## Prerequisites

- macOS 12.0 or later
- [Eagle App](https://eagle.cool) 3.0 or later (must be running)
- [Raycast](https://raycast.com) 1.50 or later

## Installation

1. Install the extension from the [Raycast Store](https://raycast.com/store)
2. Make sure Eagle is running
3. Configure the extension preferences (see Configuration below)

## Commands

### Shot to Eagle

Take a screenshot and automatically save it to Eagle.

**Usage:**
1. Trigger the command from Raycast
2. Select the area/window to capture
3. Screenshot is automatically uploaded to Eagle
4. Success notification appears

### Select Eagle Folder

Choose the target folder in Eagle where screenshots will be saved.

**Usage:**
1. Open the command to see your Eagle folders
2. Browse recent and all folders
3. Select a folder to set it as the default
4. Future screenshots will be saved to this folder

## Configuration

Open Raycast Preferences → Extensions → Screenshot to Eagle to configure:

### Required Settings

- **Eagle API URL** (optional): Eagle Web API endpoint
  - Default: `http://localhost:41595`
  - Only change if you've modified Eagle's API port

### Optional Settings

- **Eagle API Token** (optional): Your Eagle Web API authentication token
  - Find in Eagle → Preferences → Plugin → Web API
  - Format: `f4f16c3d-a969-4060-b6db-773918ef5cc7`

- **Target Folder ID** (optional): Specific folder ID to save screenshots
  - Leave empty to save to Eagle root
  - Or use "Select Eagle Folder" command to choose visually

- **Default Screenshot Mode**: Choose your preferred capture method
  - Selection (Interactive) - Default
  - Window
  - Full Screen
  - Timed (Delayed)

- **Auto Tags**: Comma-separated tags to add automatically
  - Default: `screenshot, raycast`
  - Example: `screenshot, raycast, design, ui`

- **Include Cursor**: Whether to include mouse cursor in screenshots
  - Default: Off

- **Screenshot Sound**: Play camera sound when capturing
  - Default: On

- **Timed Delay**: Seconds to wait before timed screenshot
  - Default: 5 seconds
  - Range: 1-60 seconds

## How It Works

1. **Capture**: Uses macOS native `screencapture` command
2. **Convert**: Converts screenshot to Base64 format
3. **Upload**: Sends to Eagle via Web API
4. **Cleanup**: Removes temporary files
5. **Notify**: Shows success/failure message

## Troubleshooting

### "Eagle is not running"
- Make sure Eagle app is open and running
- Check that Eagle Web API is enabled in Eagle Preferences

### "Cannot connect to Eagle"
- Verify Eagle API URL in preferences
- Check if Eagle is listening on the correct port (default: 41595)
- Try restarting Eagle

### "Upload failed"
- Check your internet connection
- Verify the folder ID exists (use Select Eagle Folder command)
- Check Eagle's available storage space

### Screenshots not appearing
- Open Eagle and refresh the library
- Check if the screenshot was saved to the correct folder
- Verify tags and search filters in Eagle

## Development

Built with:
- TypeScript 5.8+
- Raycast API 1.103+
- Eagle Web API

### Project Structure

```
src/
├── shot-to-eagle.ts         # Main command
├── select-folder.tsx        # Folder selection UI
├── modules/
│   ├── screenshot.ts        # Screenshot capture logic
│   ├── eagle-api.ts         # Eagle API integration
│   └── config.ts            # Configuration management
├── utils/
│   └── index.ts             # Utility functions
└── types/
    └── index.ts             # TypeScript type definitions
```

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Credits

Created by [leonwong282](https://github.com/leonwong282)

Eagle is a trademark of Eagle App.

## Links

- [Eagle App](https://eagle.cool)
- [Eagle Web API Documentation](https://api.eagle.cool)
- [Raycast](https://raycast.com)
- [Report Issues](https://github.com/leonwong282/screenshot-to-eagle/issues)
