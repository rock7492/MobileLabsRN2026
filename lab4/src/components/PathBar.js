import { Pressable, StyleSheet, Text, View } from "react-native";

import { getRelativePath } from "../utils/fileUtils";

export default function PathBar({ currentDir, canGoUp, onGoUp }) {
  return (
    <View style={styles.pathPanel}>
      <View style={styles.pathTextBlock}>
        <Text style={styles.pathLabel}>Поточний шлях</Text>
        <Text style={styles.pathValue}>{getRelativePath(currentDir)}</Text>
      </View>

      <Pressable
        style={[styles.upButton, !canGoUp && styles.disabledButton]}
        onPress={onGoUp}
        disabled={!canGoUp}
      >
        <Text style={[styles.upButtonText, !canGoUp && styles.disabledText]}>
          Вгору
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  pathPanel: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 14,
    borderRadius: 16,
    padding: 12,
    gap: 10,
    elevation: 2,
  },
  pathTextBlock: {
    flex: 1,
  },
  pathLabel: {
    color: "#6B7280",
    fontSize: 12,
    marginBottom: 3,
  },
  pathValue: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "700",
  },
  upButton: {
    backgroundColor: "#111827",
    borderRadius: 10,
    paddingVertical: 9,
    paddingHorizontal: 14,
  },
  upButtonText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
  disabledButton: {
    backgroundColor: "#E5E7EB",
  },
  disabledText: {
    color: "#9CA3AF",
  },
});