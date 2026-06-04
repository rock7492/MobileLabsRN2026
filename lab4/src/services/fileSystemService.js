import * as FileSystem from "expo-file-system/legacy";

import { ROOT_DIR } from "../constants/paths";
import { ensureTrailingSlash, joinUri } from "../utils/fileUtils";

export async function ensureRootDirectory() {
  const rootInfo = await FileSystem.getInfoAsync(ROOT_DIR);

  if (!rootInfo.exists) {
    await FileSystem.makeDirectoryAsync(ROOT_DIR, {
      intermediates: true,
    });
  }
}

export async function readDirectoryEntries(directoryUri) {
  const normalizedDir = ensureTrailingSlash(directoryUri);
  const names = await FileSystem.readDirectoryAsync(normalizedDir);

  const entries = await Promise.all(
    names.map(async (name) => {
      const uri = joinUri(normalizedDir, name);
      const info = await FileSystem.getInfoAsync(uri);

      return {
        id: uri,
        name,
        uri,
        exists: info.exists,
        isDirectory: Boolean(info.isDirectory),
        size: info.size ?? 0,
        modificationTime: info.modificationTime ?? null,
      };
    })
  );

  return entries.sort((a, b) => {
    if (a.isDirectory && !b.isDirectory) return -1;
    if (!a.isDirectory && b.isDirectory) return 1;
    return a.name.localeCompare(b.name);
  });
}

export async function createFolder(directoryUri, folderName) {
  const targetUri = joinUri(directoryUri, folderName);
  await FileSystem.makeDirectoryAsync(targetUri, {
    intermediates: false,
  });
}

export async function createTextFile(directoryUri, fileName, content) {
  const targetUri = joinUri(directoryUri, fileName);
  await FileSystem.writeAsStringAsync(targetUri, content);
}

export async function objectExists(directoryUri, name) {
  const targetUri = joinUri(directoryUri, name);
  const info = await FileSystem.getInfoAsync(targetUri);
  return info.exists;
}

export async function readTextFile(uri) {
  return FileSystem.readAsStringAsync(uri);
}

export async function saveTextFile(uri, content) {
  await FileSystem.writeAsStringAsync(uri, content);
}

export async function deleteObject(uri) {
  await FileSystem.deleteAsync(uri, {
    idempotent: true,
  });
}

export async function getObjectInfo(item) {
  const info = await FileSystem.getInfoAsync(item.uri);

  return {
    ...item,
    exists: info.exists,
    isDirectory: Boolean(info.isDirectory),
    size: info.size ?? item.size ?? 0,
    modificationTime: info.modificationTime ?? item.modificationTime ?? null,
  };
}

export async function getMemoryInfo() {
  const total = await FileSystem.getTotalDiskCapacityAsync();
  const free = await FileSystem.getFreeDiskStorageAsync();

  return {
    total,
    free,
    used: total - free,
  };
}

export async function renameObject(oldUri, directoryUri, newName) {
  const newUri = joinUri(directoryUri, newName);

  await FileSystem.moveAsync({
    from: oldUri,
    to: newUri,
  });
}