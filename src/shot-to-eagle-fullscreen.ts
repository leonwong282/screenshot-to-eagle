import { shotToEagle } from "./modules/shot-to-eagle-core";
import { ScreenshotMode } from "./types";

export default async function main() {
  await shotToEagle(ScreenshotMode.SCREEN);
}
