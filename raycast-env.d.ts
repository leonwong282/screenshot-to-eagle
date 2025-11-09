/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Eagle API URL - Eagle Web API URL (default: http://localhost:41595) */
  "eagleApiUrl": string,
  /** Eagle API Token - Your Eagle Web API token (optional, find in Eagle settings) */
  "eagleApiToken"?: string,
  /** Target Folder ID - Eagle folder ID where screenshots will be saved (optional, leave empty for root) */
  "folderId"?: string,
  /** Default Screenshot Mode - The default mode for taking screenshots */
  "defaultMode": "selection" | "window" | "screen" | "timed",
  /** Include Cursor - Whether to include the mouse cursor in screenshots */
  "includeCursor": boolean,
  /** Screenshot Sound - Whether to play the camera sound effect */
  "playSound": boolean,
  /** Timed Delay (seconds) - Delay in seconds for timed screenshot mode */
  "timedDelay": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `shot-to-eagle` command */
  export type ShotToEagle = ExtensionPreferences & {}
  /** Preferences accessible in the `shot-to-eagle-selection` command */
  export type ShotToEagleSelection = ExtensionPreferences & {}
  /** Preferences accessible in the `shot-to-eagle-window` command */
  export type ShotToEagleWindow = ExtensionPreferences & {}
  /** Preferences accessible in the `shot-to-eagle-fullscreen` command */
  export type ShotToEagleFullscreen = ExtensionPreferences & {}
  /** Preferences accessible in the `shot-to-eagle-timed` command */
  export type ShotToEagleTimed = ExtensionPreferences & {}
  /** Preferences accessible in the `select-folder` command */
  export type SelectFolder = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `shot-to-eagle` command */
  export type ShotToEagle = {}
  /** Arguments passed to the `shot-to-eagle-selection` command */
  export type ShotToEagleSelection = {}
  /** Arguments passed to the `shot-to-eagle-window` command */
  export type ShotToEagleWindow = {}
  /** Arguments passed to the `shot-to-eagle-fullscreen` command */
  export type ShotToEagleFullscreen = {}
  /** Arguments passed to the `shot-to-eagle-timed` command */
  export type ShotToEagleTimed = {}
  /** Arguments passed to the `select-folder` command */
  export type SelectFolder = {}
}

