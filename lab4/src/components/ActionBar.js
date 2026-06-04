import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ActionBar({ onCreateFolder, onCreateFile, onRefresh }) {
  return (
    <View style={styles.actionsRow}>
      <Pressable style={styles.primaryButton} onPress={onCreateFolder}>
        <Text style={styles.primaryButtonText}>Нова папка</Text>
      </Pressable>

      <Pressable style={styles.primaryButton} onPress={onCreateFile}>
        <Text style={styles.primaryButtonText}>Новий .txt</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={onRefresh}>
        <Text style={styles.secondaryButtonText}>Оновити</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  actionsRow: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: "#2563EB",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 13,
  },
  secondaryButton: {
    backgroundColor: "#E5E7EB",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#111827",
    fontWeight: "800",
    fontSize: 13,
  },
});