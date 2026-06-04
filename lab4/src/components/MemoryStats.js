import { StyleSheet, Text, View } from "react-native";

import { formatBytes } from "../utils/fileUtils";

export default function MemoryStats({ memory }) {
  return (
    <View style={styles.memoryPanel}>
      <MemoryItem label="Усього" value={formatBytes(memory.total)} />
      <MemoryItem label="Вільно" value={formatBytes(memory.free)} />
      <MemoryItem label="Зайнято" value={formatBytes(memory.used)} />
    </View>
  );
}

function MemoryItem({ label, value }) {
  return (
    <View style={styles.memoryItem}>
      <Text style={styles.memoryLabel}>{label}</Text>
      <Text style={styles.memoryValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  memoryPanel: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  memoryItem: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    elevation: 2,
  },
  memoryLabel: {
    color: "#6B7280",
    fontSize: 12,
    marginBottom: 4,
  },
  memoryValue: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "800",
  },
});