import * as fs from "fs";
import * as os from "os";
import * as path from "path";

/**
 * Generate screenshot filename
 * Format: Screenshot_YYYY-MM-DD_HH-mm-ss.png
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
 * Get temporary file path
 * @param filename Filename (optional)
 */
export function getTempFilePath(filename?: string): string {
  const tmpDir = os.tmpdir();
  const fileName = filename || generateFileName();
  return path.join(tmpDir, fileName);
}

/**
 * Convert file to Base64 encoding
 * @param filePath File path
 * @returns Base64 encoded string (with data URI prefix)
 */
export async function fileToBase64(filePath: string): Promise<string> {
  try {
    const fileBuffer = await fs.promises.readFile(filePath);
    const base64String = fileBuffer.toString("base64");
    // Eagle API requires complete data URI format
    return `data:image/png;base64,${base64String}`;
  } catch (error) {
    throw new Error(`Failed to convert file to Base64: ${error}`);
  }
}

/**
 * Check if file exists
 * @param filePath File path
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
 * Delete file
 * @param filePath File path
 */
export async function deleteFile(filePath: string): Promise<void> {
  try {
    await fs.promises.unlink(filePath);
  } catch (error) {
    console.error(`Failed to delete file: ${filePath}`, error);
  }
}

/**
 * Parse tags string to array
 * @param tagsString Tags string (comma-separated)
 * @returns Tags array
 */
export function parseTags(tagsString: string): string[] {
  return tagsString
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
}

/**
 * Format error message
 * @param error Error object
 */
export function formatError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}
