import { EagleApiResponse, EagleAppInfo, EagleFolder, UploadScreenshotOptions, UploadResult } from "../types";
import { getEagleApiUrl } from "./config";

/**
 * Check if Eagle is running
 */
export async function checkEagleStatus(): Promise<boolean> {
  try {
    const url = await getEagleApiUrl("/api/application/info");

    // AbortSignal implement timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(url, {
      method: "GET",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return false;
    }

    const result = (await response.json()) as EagleApiResponse<EagleAppInfo>;
    return result.status === "success";
  } catch (error) {
    console.error("Failed to check Eagle status:", error);
    return false;
  }
}

/**
 * Get Eagle folder list
 */
export async function getFolderList(): Promise<EagleFolder[]> {
  try {
    const url = await getEagleApiUrl("/api/folder/list");
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch folder list: ${response.statusText}`);
    }

    const result = (await response.json()) as EagleApiResponse<EagleFolder[]>;

    if (result.status === "success" && result.data) {
      return result.data;
    }

    throw new Error("Failed to get folder list from Eagle");
  } catch (error) {
    console.error("Failed to get folder list:", error);
    throw error;
  }
}

/**
 * Get recently used Eagle folders list
 */
export async function getRecentFolders(): Promise<EagleFolder[]> {
  try {
    const url = await getEagleApiUrl("/api/folder/listRecent");
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch recent folders: ${response.statusText}`);
    }

    const result = (await response.json()) as EagleApiResponse<EagleFolder[]>;

    if (result.status === "success" && result.data) {
      return result.data;
    }

    throw new Error("Failed to get recent folders from Eagle");
  } catch (error) {
    console.error("Failed to get recent folders:", error);
    throw error;
  }
}

/**
 * Upload screenshot to Eagle
 * @param options Upload options
 */
export async function uploadScreenshot(options: UploadScreenshotOptions): Promise<UploadResult> {
  try {
    const url = await getEagleApiUrl("/api/item/addFromURL");

    const payload = {
      url: options.url,
      name: options.name,
      ...(options.folderId && { folderId: options.folderId }),
      ...(options.modificationTime && { modificationTime: options.modificationTime }),
      ...(options.annotation && { annotation: options.annotation }),
      ...(options.website && { website: options.website }),
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Upload failed: ${response.statusText}. ${errorText}`);
    }

    const result = (await response.json()) as EagleApiResponse;

    if (result.status === "success") {
      return {
        success: true,
        message: "Screenshot uploaded successfully",
      };
    }

    throw new Error(result.message || "Upload failed with unknown error");
  } catch (error) {
    console.error("Failed to upload screenshot:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Validate if folder ID exists
 * @param folderId Folder ID
 */
export async function validateFolderId(folderId: string): Promise<boolean> {
  try {
    const folders = await getFolderList();
    return folders.some((folder) => folder.id === folderId);
  } catch {
    return false;
  }
}

/**
 * Get folder name by ID
 * @param folderId Folder ID
 */
export async function getFolderName(folderId: string): Promise<string | null> {
  try {
    const folders = await getFolderList();
    const folder = folders.find((f) => f.id === folderId);
    return folder ? folder.name : null;
  } catch {
    return null;
  }
}
