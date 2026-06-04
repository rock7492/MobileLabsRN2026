import { Pressable, StyleSheet, Text, View } from "react-native";

import { formatBytes, getFileType } from "../utils/fileUtils";

export default function FileItem({ item, onOpen, onDetails, onRename, onDelete }) {
  return (
    <View style={styles.entryCard}>
      <Pressable style={styles.entryMain} onPress={() => onOpen(item)}>
        <Text style={styles.entryIcon}>{item.isDirectory ? "📁" : "📄"}</Text>

        <View style={styles.entryTextBlock}>
          <Text style={styles.entryName}>{item.name}</Text>
          <Text style={styles.entryMeta}>
            {getFileType(item.name, item.isDirectory)} •{" "}
            {item.isDirectory ? "директорія" : formatBytes(item.size)}
          </Text>
        </View>
      </Pressable>

      <View style={styles.entryActions}>
        <Pressable style={styles.smallButton} onPress={() => onDetails(item)}>
          <Text style={styles.smallButtonText}>Деталі</Text>
        </Pressable>

        <Pressable style={styles.smallButton} onPress={() => onRename(item)}>
          <Text style={styles.smallButtonText}>Перейменувати</Text>
        </Pressable>

        <Pressable
          style={[styles.smallButton, styles.deleteButton]}
          onPress={() => onDelete(item)}
        >
          <Text style={styles.deleteButtonText}>Видалити</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  entryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
  },
  entryMain: {
    flexDirection: "row",
    alignItems: "center",
  },
  entryIcon: {
    fontSize: 30,
    marginRight: 12,
  },
  entryTextBlock: {
    flex: 1,
  },
  entryName: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "800",
  },
  entryMeta: {
    color: "#6B7280",
    fontSize: 13,
    marginTop: 3,
  },
  entryActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  smallButton: {
    flexGrow: 1,
    backgroundColor: "#EEF2FF",
    borderRadius: 10,
    paddingVertical: 9,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  smallButtonText: {
    color: "#3730A3",
    fontWeight: "800",
    fontSize: 12,
  },
  deleteButton: {
    backgroundColor: "#FEE2E2",
  },
  deleteButtonText: {
    color: "#B91C1C",
    fontWeight: "800",
    fontSize: 12,
  },
});