import { ROOT_DIR } from "../constants/paths";

export function ensureTrailingSlash(uri) {
  return uri.endsWith("/") ? uri : `${uri}/`;
}

export function joinUri(directoryUri, name) {
  return `${ensureTrailingSlash(directoryUri)}${name}`;
}

export function getParentUri(uri) {
  const normalized = uri.endsWith("/") ? uri.slice(0, -1) : uri;
  const lastSlashIndex = normalized.lastIndexOf("/");
  return normalized.slice(0, lastSlashIndex + 1);
}

export function getRelativePath(uri) {
  const cleanRoot = ensureTrailingSlash(ROOT_DIR);
  const cleanUri = ensureTrailingSlash(uri);

  if (cleanUri === cleanRoot) {
    return "Головна папка";
  }

  const relative = cleanUri.replace(cleanRoot, "").replace(/\/$/, "");
  return `Головна / ${relative.split("/").join(" / ")}`;
}

export function validateName(rawName) {
  const name = rawName.trim();

  if (name.length === 0) {
    return "Введіть назву.";
  }

  if (name === "." || name === "..") {
    return "Використайте іншу назву.";
  }

  if (/[\\/]/.test(name)) {
    return "Назва має бути без символів / та \\.";
  }

  return "";
}

export function normalizeTxtFileName(rawName) {
  const name = rawName.trim();
  return name.toLowerCase().endsWith(".txt") ? name : `${name}.txt`;
}

export function isTextFile(name) {
  return name.toLowerCase().endsWith(".txt");
}

export function getFileType(name, isDirectory) {
  if (isDirectory) {
    return "Папка";
  }

  const parts = name.split(".");

  if (parts.length < 2) {
    return "Файл без розширення";
  }

  return `.${parts.pop().toLowerCase()}`;
}

export function formatBytes(bytes) {
  if (typeof bytes !== "number" || Number.isNaN(bytes)) {
    return "—";
  }

  const units = ["Б", "КБ", "МБ", "ГБ", "ТБ"];
  let value = bytes;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  const digits = value >= 10 || unitIndex === 0 ? 0 : 1;
  return `${value.toFixed(digits)} ${units[unitIndex]}`;
}

export function formatDate(timestamp) {
  if (!timestamp) {
    return "—";
  }

  const milliseconds = timestamp < 10000000000 ? timestamp * 1000 : timestamp;
  return new Date(milliseconds).toLocaleString();
}