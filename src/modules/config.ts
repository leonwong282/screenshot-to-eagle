import { getPreferenceValues, LocalStorage } from "@raycast/api";
import { PluginConfig, ScreenshotMode } from "../types";

const FOLDER_ID_KEY = "eagle-folder-id";

/**
 * Get plugin configuration
 */
export async function getConfig(): Promise<PluginConfig> {
  const preferences = getPreferenceValues<{
    eagleApiUrl?: string;
    eagleApiToken?: string;
    folderId?: string;
    defaultMode?: string;
    includeCursor?: boolean;
    playSound?: boolean;
    timedDelay?: string;
  }>();

  // Prioritize folderId from LocalStorage (selected via UI)
  const savedFolderId = await LocalStorage.getItem<string>(FOLDER_ID_KEY);
  const folderId = savedFolderId || preferences.folderId;

  return {
    eagleApiUrl: preferences.eagleApiUrl || "http://localhost:41595",
    eagleApiToken: preferences.eagleApiToken,
    folderId: folderId,
    defaultMode: (preferences.defaultMode as ScreenshotMode) || ScreenshotMode.SELECTION,
    includeCursor: preferences.includeCursor ?? false,
    playSound: preferences.playSound ?? true,
    timedDelay: parseInt(preferences.timedDelay || "5", 10),
  };
}

/**
 * Validate configuration
 * @param config Plugin configuration
 * @returns Validation result object
 */
export function validateConfig(config: PluginConfig): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Validate Eagle API URL
  if (!config.eagleApiUrl) {
    errors.push("Eagle API URL is required");
  } else {
    try {
      new URL(config.eagleApiUrl);
    } catch {
      errors.push("Eagle API URL is invalid");
    }
  }

  // Validate timed delay
  if (config.timedDelay < 1 || config.timedDelay > 60) {
    errors.push("Timed delay must be between 1 and 60 seconds");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Get Eagle API full URL
 * @param endpoint API endpoint path
 */
export async function getEagleApiUrl(endpoint: string): Promise<string> {
  const config = await getConfig();
  const baseUrl = config.eagleApiUrl.replace(/\/$/, ""); // Remove trailing slash
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  // Add token to URL if configured
  if (config.eagleApiToken) {
    const url = new URL(`${baseUrl}${path}`);
    url.searchParams.set("token", config.eagleApiToken);
    return url.toString();
  }

  return `${baseUrl}${path}`;
}
