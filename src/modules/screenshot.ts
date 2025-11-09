import { exec } from "child_process";
import { promisify } from "util";
import { ScreenshotMode, ScreenshotOptions, ScreenshotResult } from "../types";
import { fileExists } from "../utils";

const execAsync = promisify(exec);

/**
 * 执行截图命令
 * @param options 截图选项
 */
export async function takeScreenshot(options: ScreenshotOptions): Promise<ScreenshotResult> {
    const args: string[] = [];

    // 根据模式选择参数
    switch (options.mode) {
        case ScreenshotMode.SELECTION:
            args.push("-i"); // 交互式选择区域
            break;
        case ScreenshotMode.WINDOW:
            args.push("-w"); // 选择窗口
            break;
        case ScreenshotMode.SCREEN:
            // 全屏截图不需要额外参数
            break;
        case ScreenshotMode.TIMED:
            if (options.delay) {
                args.push("-T", options.delay.toString()); // 延迟截图
            }
            args.push("-i"); // 延迟后交互式选择
            break;
    }

    // 是否包含鼠标指针
    if (options.includeCursor) {
        args.push("-C");
    }

    // 是否播放声音（默认播放，-x 禁用）
    if (!options.playSound) {
        args.push("-x");
    }

    // 输出文件路径
    args.push(options.outputPath);

    // 构建完整命令 - 使用完整路径以确保能找到命令
    const command = `/usr/sbin/screencapture ${args.join(" ")}`;

    console.log("Executing screenshot command:", command);
    console.log("Output path:", options.outputPath);

    try {
        // 执行截图命令
        const result = await execAsync(command);
        console.log("Screenshot command completed:", result);

        // 检查文件是否成功创建
        const exists = await fileExists(options.outputPath);
        console.log("File exists after screenshot:", exists);

        if (exists) {
            return {
                success: true,
                filePath: options.outputPath,
            };
        } else {
            // 文件不存在，可能是用户取消了截图
            console.log("Screenshot file not found, user may have cancelled");
            return {
                success: false,
                cancelled: true,
            };
        }
    } catch (error) {
        console.error("Screenshot command error:", error);
        // 如果是用户取消（ESC），screencapture 会返回非零退出码
        if (error instanceof Error && error.message.includes("Command failed")) {
            return {
                success: false,
                cancelled: true,
            };
        }

        return {
            success: false,
            error: error instanceof Error ? error.message : String(error),
        };
    }
}

/**
 * 区域截图（快捷方法）
 */
export async function captureSelection(outputPath: string, includeCursor = false, playSound = true): Promise<ScreenshotResult> {
    return takeScreenshot({
        mode: ScreenshotMode.SELECTION,
        outputPath,
        includeCursor,
        playSound,
    });
}

/**
 * 窗口截图（快捷方法）
 */
export async function captureWindow(outputPath: string, includeCursor = false, playSound = true): Promise<ScreenshotResult> {
    return takeScreenshot({
        mode: ScreenshotMode.WINDOW,
        outputPath,
        includeCursor,
        playSound,
    });
}

/**
 * 全屏截图（快捷方法）
 */
export async function captureScreen(outputPath: string, includeCursor = false, playSound = true): Promise<ScreenshotResult> {
    return takeScreenshot({
        mode: ScreenshotMode.SCREEN,
        outputPath,
        includeCursor,
        playSound,
    });
}

/**
 * 延迟截图（快捷方法）
 */
export async function captureWithDelay(
    outputPath: string,
    delay: number,
    includeCursor = false,
    playSound = true
): Promise<ScreenshotResult> {
    return takeScreenshot({
        mode: ScreenshotMode.TIMED,
        outputPath,
        delay,
        includeCursor,
        playSound,
    });
}
