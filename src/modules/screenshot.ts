import { exec } from "child_process";
import { promisify } from "util";
import { ScreenshotMode, ScreenshotOptions, ScreenshotResult } from "../types";
import { fileExists } from "../utils";

const execAsync = promisify(exec);

/**
 * Execute screenshot command
 * @param options Screenshot options
 */
export async function takeScreenshot(options: ScreenshotOptions): Promise<ScreenshotResult> {
  const args: string[] = [];

  // Select arguments based on mode
  switch (options.mode) {
    case ScreenshotMode.SELECTION:
      args.push("-i"); // Interactive area selection
      break;
    case ScreenshotMode.WINDOW:
      args.push("-w"); // Window selection
      break;
    case ScreenshotMode.SCREEN:
      // Full screen screenshot doesn't need extra arguments
      break;
    case ScreenshotMode.TIMED:
      if (options.delay) {
        args.push("-T", options.delay.toString()); // Delayed screenshot
      }
      args.push("-i"); // Interactive selection after delay
      break;
  }

  // Include mouse cursor
  if (options.includeCursor) {
    args.push("-C");
  }

  // Play sound (enabled by default, -x disables it)
  if (!options.playSound) {
    args.push("-x");
  }

  // Output file path
  args.push(options.outputPath);

  // Build full command - use full path to ensure command is found
  const command = `/usr/sbin/screencapture ${args.join(" ")}`;

  console.log("Executing screenshot command:", command);
  console.log("Output path:", options.outputPath);

  try {
    // Execute screenshot command
    const result = await execAsync(command);
    console.log("Screenshot command completed:", result);

    // Check if file was successfully created
    const exists = await fileExists(options.outputPath);
    console.log("File exists after screenshot:", exists);

    if (exists) {
      return {
        success: true,
        filePath: options.outputPath,
      };
    } else {
      // File doesn't exist, user may have cancelled the screenshot
      console.log("Screenshot file not found, user may have cancelled");
      return {
        success: false,
        cancelled: true,
      };
    }
  } catch (error) {
    console.error("Screenshot command error:", error);
    // If user cancelled (ESC), screencapture returns non-zero exit code
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
 * Capture selection screenshot (shortcut method)
 */
export async function captureSelection(
  outputPath: string,
  includeCursor = false,
  playSound = true,
): Promise<ScreenshotResult> {
  return takeScreenshot({
    mode: ScreenshotMode.SELECTION,
    outputPath,
    includeCursor,
    playSound,
  });
}

/**
 * Capture window screenshot (shortcut method)
 */
export async function captureWindow(
  outputPath: string,
  includeCursor = false,
  playSound = true,
): Promise<ScreenshotResult> {
  return takeScreenshot({
    mode: ScreenshotMode.WINDOW,
    outputPath,
    includeCursor,
    playSound,
  });
}

/**
 * Capture full screen screenshot (shortcut method)
 */
export async function captureScreen(
  outputPath: string,
  includeCursor = false,
  playSound = true,
): Promise<ScreenshotResult> {
  return takeScreenshot({
    mode: ScreenshotMode.SCREEN,
    outputPath,
    includeCursor,
    playSound,
  });
}

/**
 * Capture screenshot with delay (shortcut method)
 */
export async function captureWithDelay(
  outputPath: string,
  delay: number,
  includeCursor = false,
  playSound = true,
): Promise<ScreenshotResult> {
  return takeScreenshot({
    mode: ScreenshotMode.TIMED,
    outputPath,
    delay,
    includeCursor,
    playSound,
  });
}
