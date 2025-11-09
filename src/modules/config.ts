import { getPreferenceValues, LocalStorage } from "@raycast/api";
import { PluginConfig, ScreenshotMode } from "../types";

const FOLDER_ID_KEY = "eagle-folder-id";

/**
 * 获取插件配置
 */
export async function getConfig(): Promise<PluginConfig> {
    const preferences = getPreferenceValues<{
        eagleApiUrl?: string;
        eagleApiToken?: string;
        folderId?: string;
        defaultMode?: string;
        autoTags?: string;
        includeCursor?: boolean;
        playSound?: boolean;
        timedDelay?: string;
    }>();

    // 优先使用 LocalStorage 中的 folderId（通过 UI 选择的）
    const savedFolderId = await LocalStorage.getItem<string>(FOLDER_ID_KEY);
    const folderId = savedFolderId || preferences.folderId;

    return {
        eagleApiUrl: preferences.eagleApiUrl || "http://localhost:41595",
        eagleApiToken: preferences.eagleApiToken,
        folderId: folderId,
        defaultMode: (preferences.defaultMode as ScreenshotMode) || ScreenshotMode.SELECTION,
        autoTags: preferences.autoTags || "screenshot, raycast",
        includeCursor: preferences.includeCursor ?? false,
        playSound: preferences.playSound ?? true,
        timedDelay: parseInt(preferences.timedDelay || "5", 10),
    };
}

/**
 * 验证配置
 * @param config 插件配置
 * @returns 验证结果对象
 */
export function validateConfig(config: PluginConfig): {
    isValid: boolean;
    errors: string[];
} {
    const errors: string[] = [];

    // 验证 Eagle API URL
    if (!config.eagleApiUrl) {
        errors.push("Eagle API URL is required");
    } else {
        try {
            new URL(config.eagleApiUrl);
        } catch {
            errors.push("Eagle API URL is invalid");
        }
    }

    // 验证延迟时间
    if (config.timedDelay < 1 || config.timedDelay > 60) {
        errors.push("Timed delay must be between 1 and 60 seconds");
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
}

/**
 * 获取 Eagle API 的完整 URL
 * @param endpoint API 端点路径
 */
export async function getEagleApiUrl(endpoint: string): Promise<string> {
    const config = await getConfig();
    const baseUrl = config.eagleApiUrl.replace(/\/$/, ""); // 移除末尾的斜杠
    const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

    // 如果配置了 token，添加到 URL
    if (config.eagleApiToken) {
        const url = new URL(`${baseUrl}${path}`);
        url.searchParams.set("token", config.eagleApiToken);
        return url.toString();
    }

    return `${baseUrl}${path}`;
}
