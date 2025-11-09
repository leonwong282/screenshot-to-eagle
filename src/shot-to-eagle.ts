import { showHUD, showToast, Toast } from "@raycast/api";
import { getConfig, validateConfig } from "./modules/config";
import { checkEagleStatus, uploadScreenshot } from "./modules/eagle-api";
import { takeScreenshot } from "./modules/screenshot";
import { deleteFile, fileToBase64, generateFileName, getTempFilePath, parseTags } from "./utils";

export default async function main() {
  try {
    // 1. 获取并验证配置
    const config = await getConfig();
    const validation = validateConfig(config);

    if (!validation.isValid) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Configuration Error",
        message: validation.errors[0],
      });
      return;
    }

    // 2. 检查 Eagle 是否运行
    await showToast({
      style: Toast.Style.Animated,
      title: "Checking Eagle...",
    });

    const eagleRunning = await checkEagleStatus();
    if (!eagleRunning) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Eagle is not running",
        message: "Please start Eagle first.",
      });
      return;
    }

    // 3. 执行截图
    // 关闭 Toast，准备截图（HUD 会自动关闭 Raycast）
    await showHUD("Taking Screenshot...");

    // 等待 Raycast 窗口关闭，确保截图界面能正常显示
    await new Promise((resolve) => setTimeout(resolve, 500));

    const fileName = generateFileName();
    const tempFilePath = getTempFilePath(fileName);

    const screenshotResult = await takeScreenshot({
      mode: config.defaultMode,
      outputPath: tempFilePath,
      includeCursor: config.includeCursor,
      playSound: config.playSound,
      delay: config.timedDelay,
    });

    // 4. 处理截图结果
    if (!screenshotResult.success) {
      if (screenshotResult.cancelled) {
        // 用户取消了截图，不显示任何提示
        return;
      }

      await showToast({
        style: Toast.Style.Failure,
        title: "Screenshot Failed",
        message: screenshotResult.error || "Unknown error",
      });
      return;
    }

    if (!screenshotResult.filePath) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Screenshot Failed",
        message: "No file path returned",
      });
      return;
    }

    // 5. 上传到 Eagle
    await showHUD("Uploading to Eagle...");

    // 将文件转换为 Base64
    const base64Data = await fileToBase64(screenshotResult.filePath);

    // 解析标签
    const tags = parseTags(config.autoTags);

    // 上传截图
    const uploadResult = await uploadScreenshot({
      url: base64Data,
      name: fileName.replace(".png", ""), // 移除扩展名
      folderId: config.folderId,
      tags,
      modificationTime: Date.now(),
    });

    // 6. 清理临时文件
    await deleteFile(screenshotResult.filePath);

    // 7. 显示结果
    if (uploadResult.success) {
      await showHUD("✓ Saved to Eagle");
    } else {
      await showToast({
        style: Toast.Style.Failure,
        title: "Upload Failed",
        message: uploadResult.error || "Unknown error",
      });
    }
  } catch (error) {
    console.error("Error in main:", error);
    await showToast({
      style: Toast.Style.Failure,
      title: "Unexpected Error",
      message: error instanceof Error ? error.message : String(error),
    });
  }
}
