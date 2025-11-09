/**
 * Eagle API 相关类型定义
 */

// Eagle 文件夹接口
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

// Eagle API 响应接口
export interface EagleApiResponse<T = unknown> {
    status: "success" | "error";
    data?: T;
    message?: string;
}

// Eagle 应用信息接口
export interface EagleAppInfo {
    version: string;
    prereleaseVersion: string | null;
    buildVersion: string;
    execPath: string;
    platform: string;
}

// 上传截图选项
export interface UploadScreenshotOptions {
    url: string; // 本地文件路径或 base64
    name: string;
    folderId?: string;
    tags?: string[];
    modificationTime?: number;
    annotation?: string;
    website?: string;
}

/**
 * 插件配置相关类型定义
 */

// 截图模式枚举
export enum ScreenshotMode {
    SELECTION = "selection", // 区域截图
    WINDOW = "window", // 窗口截图
    SCREEN = "screen", // 全屏截图
    TIMED = "timed", // 延迟截图
}

// 插件配置接口
export interface PluginConfig {
    eagleApiUrl: string;
    eagleApiToken?: string;
    folderId?: string;
    defaultMode: ScreenshotMode;
    autoTags: string;
    includeCursor: boolean;
    playSound: boolean;
    timedDelay: number;
}

// 截图选项接口
export interface ScreenshotOptions {
    mode: ScreenshotMode;
    includeCursor?: boolean;
    playSound?: boolean;
    delay?: number;
    outputPath: string;
}

/**
 * 工具函数相关类型定义
 */

// 截图结果接口
export interface ScreenshotResult {
    success: boolean;
    filePath?: string;
    error?: string;
    cancelled?: boolean;
}

// Eagle 上传结果接口
export interface UploadResult {
    success: boolean;
    message?: string;
    error?: string;
}
