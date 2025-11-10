# Screenshot to Eagle - Raycast Extension Development Guide

## Project Overview

This is a **Raycast extension** (not a standalone app) that bridges macOS's native `screencapture` tool with Eagle's Web API. It allows users to take screenshots directly into Eagle folders via Raycast commands.

**Key Architecture Pattern**: Command → Core → Modules (Eagle API, Screenshot, Config)

## Essential Raycast Extension Concepts

### Command Entry Points
Each command file (e.g., `shot-to-eagle-selection.ts`) exports a **default async function** as the entry point:
```typescript
export default async function main() {
  await shotToEagle(ScreenshotMode.SELECTION);
}
```
- Commands are registered in `package.json` under `commands[]` array
- `mode: "no-view"` commands execute without UI (HUD only)
- `mode: "view"` commands render React components (like `select-folder.tsx`)

### Raycast API Usage Patterns
- **`showHUD()`** - Displays toast that auto-closes Raycast window (critical for screenshots)
- **`showToast()`** - Persistent toast notifications (blocks Raycast window)
- **`LocalStorage`** - Persists folder selection between sessions (key: `"eagle-folder-id"`)
- **`getPreferenceValues()`** - Reads user settings from extension preferences

### Configuration Priority
1. LocalStorage (UI-selected folder) → 2. Preferences (package.json defaults) → 3. Code defaults

## Core Workflow (`shot-to-eagle-core.ts`)

The 7-step workflow is strictly sequential:
1. **Get/validate config** - Merge LocalStorage + Preferences
2. **Check Eagle status** - Timeout after 3s (Eagle Web API must be running)
3. **Take screenshot** - Uses `showHUD()` + 500ms delay to close Raycast before `screencapture`
4. **Handle cancellation** - User pressing ESC returns `{success: false, cancelled: true}` (no error shown)
5. **Convert to Base64** - Eagle API requires `data:image/png;base64,...` format
6. **Upload to Eagle** - POST to `/api/item/addFromURL`
7. **Cleanup temp file** - Delete from `os.tmpdir()`

**Critical**: The 500ms delay in step 3 ensures Raycast UI is hidden before macOS screenshot UI appears.

## macOS Screenshot Integration

### Native `screencapture` Command
Located at `/usr/sbin/screencapture` (always use absolute path):
- `-i` - Interactive selection
- `-w` - Window mode
- `-C` - Include cursor
- `-x` - Disable sound
- `-T <seconds>` - Timed delay

**Cancellation Detection**: When user presses ESC, `screencapture` exits with non-zero code AND the output file isn't created. Always check file existence with `fileExists()`.

## Eagle Web API Integration

### Required Configuration
- **Default URL**: `http://localhost:41595`
- **Token**: Optional (appended as query param: `?token=...`)
- **Must be running**: Check with `/api/application/info` (3s timeout)

### Key Endpoints
- `GET /api/application/info` - Health check
- `GET /api/folder/list` - All folders (hierarchical)
- `GET /api/folder/listRecent` - Recently used folders
- `POST /api/item/addFromURL` - Upload (supports Base64 data URIs)

### Upload Payload Structure
```typescript
{
  url: "data:image/png;base64,...",  // Required
  name: "Screenshot_2024-01-01_12-00-00",  // Without .png
  folderId: "KBCB8BK86WIW1",  // Optional
  modificationTime: Date.now()  // Optional
}
```

## Development Workflows

### Build & Test
```bash
npm run dev       # Hot reload development (ray develop)
npm run build     # Production build (ray build)
npm run lint      # ESLint check
npm run fix-lint  # Auto-fix linting issues
```

### Testing Locally
1. `npm run dev` starts Raycast development mode
2. Open Raycast and search for commands
3. Changes hot-reload automatically
4. Check logs: Raycast → Extensions → Screenshot to Eagle → View Logs

### Publishing
```bash
npm run publish  # Uses @raycast/api publish (NOT npm publish)
```

## Code Organization Patterns

### Module Structure
- **`modules/`** - Business logic (stateless functions)
  - `config.ts` - Config management + validation
  - `eagle-api.ts` - HTTP client for Eagle Web API
  - `screenshot.ts` - Native screencapture wrapper
  - `shot-to-eagle-core.ts` - Main orchestration logic
- **`types/`** - All TypeScript interfaces (centralized)
- **`utils/`** - Pure functions (file I/O, formatters)

### Type Organization
All types live in `src/types/index.ts` and are grouped by domain:
- Eagle API types (`EagleFolder`, `EagleApiResponse`, etc.)
- Plugin configuration (`PluginConfig`, `ScreenshotMode`)
- Utility types (`ScreenshotResult`, `UploadResult`)

### Error Handling Pattern
```typescript
// Always return result objects, never throw for user errors
return {
  success: false,
  error: "User-friendly message",
  cancelled: true  // Special flag for user cancellations
};
```

## Common Pitfalls & Solutions

### ❌ Don't: Show toast for cancelled screenshots
Users expect pressing ESC to silently cancel. Check `cancelled` flag:
```typescript
if (screenshotResult.cancelled) return; // Silent exit
```

### ❌ Don't: Use `showToast()` before screenshots
Blocks Raycast window closure. Always use `showHUD()`.

### ❌ Don't: Forget the 500ms delay
macOS screenshot UI won't appear properly if Raycast is still visible.

### ✅ Do: Always use absolute path for screencapture
```typescript
const command = `/usr/sbin/screencapture ${args.join(" ")}`;
```

### ✅ Do: Validate config before operations
`validateConfig()` checks URL format and delay range (1-60 seconds).

## Testing Checklist

- [ ] Eagle app is running before testing
- [ ] Test all 4 screenshot modes (selection, window, fullscreen, timed)
- [ ] Test ESC cancellation (no error toast)
- [ ] Test folder selection persistence (LocalStorage)
- [ ] Verify temp file cleanup after upload
- [ ] Check with/without Eagle token
- [ ] Test invalid folder IDs gracefully fail

## References

- [Raycast API Docs](https://developers.raycast.com/api-reference)
- [Eagle Web API Docs](docs/Eagle%20Web%20API.md)
- macOS `screencapture` man page: `man screencapture`
