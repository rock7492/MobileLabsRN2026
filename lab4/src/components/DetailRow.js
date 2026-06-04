import { StyleSheet, Text, View } from "react-native";

export default function DetailRow({ label, value }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  detailRow: {
    paddingVertical: 10,
    borderBottomColor: "#E5E7EB",
    borderBottomWidth: 1,
  },
  detailLabel: {
    color: "#6B7280",
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 4,
  },
  detailValue: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "600",
  },
});