/**
 * Eagle API Type Definitions
 */

// Eagle folder interface
export interface EagleFolder {
  id: string;
  name: string;
  description: string;
  children: EagleFolder[];
  modificationTime: number;
  tags: string[];
  imageCount: number;
  descendantImageCount: number;
  pinyin?: string;
  extendTags: string[];
}

// Eagle API response interface
export interface EagleApiResponse<T = unknown> {
  status: "success" | "error";
  data?: T;
  message?: string;
}

// Eagle application info interface
export interface EagleAppInfo {
  version: string;
  prereleaseVersion: string | null;
  buildVersion: string;
  execPath: string;
  platform: string;
}

// Upload screenshot options
export interface UploadScreenshotOptions {
  url: string; // Local file path or base64 data URL
  name: string;
  folderId?: string;
  tags?: string[];
  modificationTime?: number;
  annotation?: string;
  website?: string;
}

/**
 * Plugin Configuration Type Definitions
 */

// Screenshot mode enum
export enum ScreenshotMode {
  SELECTION = "selection", // Interactive area selection
  WINDOW = "window", // Window screenshot
  SCREEN = "screen", // Full screen screenshot
  TIMED = "timed", // Timed/delayed screenshot
}

// Plugin configuration interface
export interface PluginConfig {
  eagleApiUrl: string;
  eagleApiToken?: string;
  folderId?: string;
  defaultMode: ScreenshotMode;
  includeCursor: boolean;
  playSound: boolean;
  timedDelay: number;
}

// Screenshot options interface
export interface ScreenshotOptions {
  mode: ScreenshotMode;
  includeCursor?: boolean;
  playSound?: boolean;
  delay?: number;
  outputPath: string;
}

/**
 * Utility Function Type Definitions
 */

// Screenshot result interface
export interface ScreenshotResult {
  success: boolean;
  filePath?: string;
  error?: string;
  cancelled?: boolean;
}

// Eagle upload result interface
export interface UploadResult {
  success: boolean;
  message?: string;
  error?: string;
}
