import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";

import FileItem from "./FileItem";

export default function FileList({
  entries,
  loading,
  onRefresh,
  onOpen,
  onDetails,
  onRename,
  onDelete,
}) {
  return (
    <FlatList
      data={entries}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <FileItem
          item={item}
          onOpen={onOpen}
          onDetails={onDetails}
          onRename={onRename}
          onDelete={onDelete}
        />
      )}
      contentContainerStyle={styles.listContent}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Папка порожня</Text>
          <Text style={styles.emptyText}>Створіть папку або текстовий файл.</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    padding: 14,
    paddingBottom: 30,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
  },
  emptyTitle: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "800",
  },
  emptyText: {
    color: "#6B7280",
    marginTop: 6,
  },
});