import { Action, ActionPanel, List, showToast, Toast, LocalStorage, Icon } from "@raycast/api";
import { useEffect, useState } from "react";
import { checkEagleStatus, getFolderList, getRecentFolders } from "./modules/eagle-api";
import { EagleFolder } from "./types";

const FOLDER_ID_KEY = "eagle-folder-id";

export default function Command() {
  const [folders, setFolders] = useState<EagleFolder[]>([]);
  const [recentFolders, setRecentFolders] = useState<EagleFolder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentFolderId, setCurrentFolderId] = useState<string>("");

  useEffect(() => {
    loadFolders();
  }, []);

  async function loadFolders() {
    try {
      setIsLoading(true);

      // Check if Eagle is running
      const eagleRunning = await checkEagleStatus();
      if (!eagleRunning) {
        await showToast({
          style: Toast.Style.Failure,
          title: "Eagle is not running",
          message: "Please start Eagle first.",
        });
        setIsLoading(false);
        return;
      }

      // Get currently configured folder ID
      const savedFolderId = await LocalStorage.getItem<string>(FOLDER_ID_KEY);
      if (savedFolderId) {
        setCurrentFolderId(savedFolderId);
      }

      // Get folder list
      const [allFolders, recent] = await Promise.all([getFolderList(), getRecentFolders()]);

      setFolders(allFolders);
      setRecentFolders(recent);
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to load folders",
        message: error instanceof Error ? error.message : String(error),
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function selectFolder(folder: EagleFolder) {
    try {
      // Save selected folder ID
      await LocalStorage.setItem(FOLDER_ID_KEY, folder.id);
      setCurrentFolderId(folder.id);

      await showToast({
        style: Toast.Style.Success,
        title: "Folder Selected",
        message: `Screenshots will be saved to "${folder.name}"`,
      });
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to save selection",
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }

  async function clearSelection() {
    try {
      await LocalStorage.removeItem(FOLDER_ID_KEY);
      setCurrentFolderId("");

      await showToast({
        style: Toast.Style.Success,
        title: "Selection Cleared",
        message: "Screenshots will be saved to Eagle root",
      });
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to clear selection",
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Search folders...">
      {currentFolderId && (
        <List.Section title="Current Selection">
          <List.Item
            title={folders.find((f) => f.id === currentFolderId)?.name || currentFolderId}
            subtitle={`ID: ${currentFolderId}`}
            icon={Icon.CheckCircle}
            accessories={[{ text: "Current" }]}
            actions={
              <ActionPanel>
                <Action title="Clear Selection" onAction={clearSelection} icon={Icon.XMarkCircle} />
              </ActionPanel>
            }
          />
        </List.Section>
      )}

      {recentFolders.length > 0 && (
        <List.Section title="Recent Folders">
          {recentFolders.map((folder) => (
            <List.Item
              key={folder.id}
              title={folder.name}
              subtitle={folder.description || `${folder.imageCount} items`}
              icon={Icon.Folder}
              accessories={[
                { text: `${folder.imageCount} items` },
                folder.id === currentFolderId ? { icon: Icon.CheckCircle } : {},
              ]}
              actions={
                <ActionPanel>
                  <Action title="Select Folder" onAction={() => selectFolder(folder)} icon={Icon.CheckCircle} />
                  <Action.CopyToClipboard title="Copy Folder ID" content={folder.id} />
                </ActionPanel>
              }
            />
          ))}
        </List.Section>
      )}

      <List.Section title="All Folders">
        {folders.map((folder) => (
          <List.Item
            key={folder.id}
            title={folder.name}
            subtitle={folder.description || `${folder.imageCount} items`}
            icon={Icon.Folder}
            accessories={[
              { text: `${folder.imageCount} items` },
              folder.id === currentFolderId ? { icon: Icon.CheckCircle } : {},
            ]}
            actions={
              <ActionPanel>
                <Action title="Select Folder" onAction={() => selectFolder(folder)} icon={Icon.CheckCircle} />
                <Action.CopyToClipboard title="Copy Folder ID" content={folder.id} />
              </ActionPanel>
            }
          />
        ))}
      </List.Section>
    </List>
  );
}
