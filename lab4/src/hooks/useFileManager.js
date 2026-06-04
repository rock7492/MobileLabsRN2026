import { useEffect, useState } from "react";
import { Alert } from "react-native";

import { ROOT_DIR } from "../constants/paths";
import {
  ensureTrailingSlash,
  getParentUri,
  isTextFile,
  normalizeTxtFileName,
  validateName,
} from "../utils/fileUtils";

import {
  createFolder,
  createTextFile,
  deleteObject,
  ensureRootDirectory,
  getMemoryInfo,
  getObjectInfo,
  objectExists,
  readDirectoryEntries,
  readTextFile,
  renameObject,
  saveTextFile,
} from "../services/fileSystemService";

export function useFileManager() {
  const [currentDir, setCurrentDir] = useState(ROOT_DIR);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  const [memory, setMemory] = useState({
    total: 0,
    free: 0,
    used: 0,
  });

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [createMode, setCreateMode] = useState("folder");
  const [newName, setNewName] = useState("");
  const [newFileContent, setNewFileContent] = useState("");

  const [renameModalVisible, setRenameModalVisible] = useState(false);
  const [renameItem, setRenameItem] = useState(null);
  const [renameName, setRenameName] = useState("");

  const [editorVisible, setEditorVisible] = useState(false);
  const [openedFile, setOpenedFile] = useState(null);
  const [editorContent, setEditorContent] = useState("");

  const [detailsVisible, setDetailsVisible] = useState(false);
  const [detailsItem, setDetailsItem] = useState(null);

  const canGoUp = ensureTrailingSlash(currentDir) !== ensureTrailingSlash(ROOT_DIR);

  async function loadDirectory(targetDir = currentDir) {
    try {
      setLoading(true);

      await ensureRootDirectory();

      const normalizedDir = ensureTrailingSlash(targetDir);
      const loadedEntries = await readDirectoryEntries(normalizedDir);
      const loadedMemory = await getMemoryInfo();

      setCurrentDir(normalizedDir);
      setEntries(loadedEntries);
      setMemory(loadedMemory);
    } catch (error) {
      Alert.alert("Помилка", error.message || "Не вдалося прочитати директорію.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDirectory(ROOT_DIR);
  }, []);

  function refreshCurrentDirectory() {
    loadDirectory(currentDir);
  }

  function openCreateModal(mode) {
    setCreateMode(mode);
    setNewName("");
    setNewFileContent("");
    setCreateModalVisible(true);
  }

  function closeCreateModal() {
    setCreateModalVisible(false);
  }

  async function createObject() {
    try {
      const validationMessage = validateName(newName);

      if (validationMessage) {
        Alert.alert("Некоректна назва", validationMessage);
        return;
      }

      const finalName =
        createMode === "file" ? normalizeTxtFileName(newName) : newName.trim();

      const exists = await objectExists(currentDir, finalName);

      if (exists) {
        Alert.alert("Обʼєкт уже існує", `Назва "${finalName}" вже використовується.`);
        return;
      }

      if (createMode === "folder") {
        await createFolder(currentDir, finalName);
      } else {
        await createTextFile(currentDir, finalName, newFileContent);
      }

      setCreateModalVisible(false);
      await loadDirectory(currentDir);
    } catch (error) {
      Alert.alert("Помилка створення", error.message || "Не вдалося створити обʼєкт.");
    }
  }

  function openRenameModal(item) {
    setRenameItem(item);
    setRenameName(item.name);
    setRenameModalVisible(true);
  }

  function closeRenameModal() {
    setRenameModalVisible(false);
    setRenameItem(null);
    setRenameName("");
  }

  function getFinalRenameName() {
    const trimmedName = renameName.trim();

    if (!renameItem) {
      return trimmedName;
    }

    if (renameItem.isDirectory) {
      return trimmedName;
    }

    if (isTextFile(renameItem.name) && !trimmedName.toLowerCase().endsWith(".txt")) {
      return `${trimmedName}.txt`;
    }

    return trimmedName;
  }

  async function renameSelectedObject() {
    try {
      if (!renameItem) {
        return;
      }

      const validationMessage = validateName(renameName);

      if (validationMessage) {
        Alert.alert("Некоректна назва", validationMessage);
        return;
      }

      const finalName = getFinalRenameName();

      if (finalName === renameItem.name) {
        closeRenameModal();
        return;
      }

      const exists = await objectExists(currentDir, finalName);

      if (exists) {
        Alert.alert("Обʼєкт уже існує", `Назва "${finalName}" вже використовується.`);
        return;
      }

      await renameObject(renameItem.uri, currentDir, finalName);

      closeRenameModal();
      await loadDirectory(currentDir);
    } catch (error) {
      Alert.alert("Помилка перейменування", error.message || "Не вдалося перейменувати.");
    }
  }

  async function openEntry(item) {
    if (item.isDirectory) {
      await loadDirectory(item.uri);
      return;
    }

    if (isTextFile(item.name)) {
      await openTextFile(item);
      return;
    }

    await openDetails(item);
  }

  async function openTextFile(item) {
    try {
      const content = await readTextFile(item.uri);

      setOpenedFile(item);
      setEditorContent(content);
      setEditorVisible(true);
    } catch (error) {
      Alert.alert("Помилка читання", error.message || "Не вдалося відкрити файл.");
    }
  }

  function closeEditor() {
    setEditorVisible(false);
  }

  async function saveOpenedFile() {
    if (!openedFile) {
      return;
    }

    try {
      await saveTextFile(openedFile.uri, editorContent);
      setEditorVisible(false);
      await loadDirectory(currentDir);
    } catch (error) {
      Alert.alert("Помилка збереження", error.message || "Не вдалося зберегти файл.");
    }
  }

  async function openDetails(item) {
    try {
      const info = await getObjectInfo(item);

      setDetailsItem(info);
      setDetailsVisible(true);
    } catch (error) {
      Alert.alert("Помилка", error.message || "Не вдалося отримати інформацію.");
    }
  }

  function closeDetails() {
    setDetailsVisible(false);
  }

  function confirmDelete(item) {
    Alert.alert(
      "Підтвердження видалення",
      `Видалити "${item.name}"?`,
      [
        {
          text: "Скасувати",
          style: "cancel",
        },
        {
          text: "Видалити",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteObject(item.uri);
              await loadDirectory(currentDir);
            } catch (error) {
              Alert.alert("Помилка видалення", error.message || "Не вдалося видалити.");
            }
          },
        },
      ]
    );
  }

  async function goUp() {
    if (!canGoUp) {
      return;
    }

    const parent = getParentUri(currentDir);
    await loadDirectory(parent);
  }

  return {
    currentDir,
    entries,
    loading,
    memory,

    createModalVisible,
    createMode,
    newName,
    newFileContent,
    setNewName,
    setNewFileContent,
    openCreateModal,
    closeCreateModal,
    createObject,

    renameModalVisible,
    renameItem,
    renameName,
    setRenameName,
    openRenameModal,
    closeRenameModal,
    renameSelectedObject,

    editorVisible,
    openedFile,
    editorContent,
    setEditorContent,
    closeEditor,
    saveOpenedFile,

    detailsVisible,
    detailsItem,
    openDetails,
    closeDetails,

    canGoUp,
    goUp,
    openEntry,
    confirmDelete,
    refreshCurrentDirectory,
  };
}