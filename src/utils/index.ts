import * as fs from "fs";
import * as os from "os";
import * as path from "path";

/**
 * 生成截图文件名
 * 格式：Screenshot_YYYY-MM-DD_HH-mm-ss.png
 */
export function generateFileName(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `Screenshot_${year}-${month}-${day}_${hours}-${minutes}-${seconds}.png`;
}

/**
 * 获取临时文件路径
 * @param filename 文件名（可选）
 */
export function getTempFilePath(filename?: string): string {
    const tmpDir = os.tmpdir();
    const fileName = filename || generateFileName();
    return path.join(tmpDir, fileName);
}

/**
 * 将文件转换为 Base64 编码
 * @param filePath 文件路径
 * @returns Base64 编码的字符串（包含 data URI 前缀）
 */
export async function fileToBase64(filePath: string): Promise<string> {
    try {
        const fileBuffer = await fs.promises.readFile(filePath);
        const base64String = fileBuffer.toString("base64");
        // Eagle API 需要完整的 data URI 格式
        return `data:image/png;base64,${base64String}`;
    } catch (error) {
        throw new Error(`Failed to convert file to Base64: ${error}`);
    }
}

/**
 * 检查文件是否存在
 * @param filePath 文件路径
 */
export async function fileExists(filePath: string): Promise<boolean> {
    try {
        await fs.promises.access(filePath, fs.constants.F_OK);
        return true;
    } catch {
        return false;
    }
}

/**
 * 删除文件
 * @param filePath 文件路径
 */
export async function deleteFile(filePath: string): Promise<void> {
    try {
        await fs.promises.unlink(filePath);
    } catch (error) {
        console.error(`Failed to delete file: ${filePath}`, error);
    }
}

/**
 * 解析标签字符串为数组
 * @param tagsString 标签字符串（逗号分隔）
 * @returns 标签数组
 */
export function parseTags(tagsString: string): string[] {
    return tagsString
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);
}

/**
 * 格式化错误消息
 * @param error 错误对象
 */
export function formatError(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }
    return String(error);
}
