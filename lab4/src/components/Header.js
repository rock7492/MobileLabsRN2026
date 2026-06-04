import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Файловий менеджер</Text>
      <Text style={styles.subtitle}>Локальна файлова система застосунку</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#111827",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 16 : 56,
    paddingHorizontal: 18,
    paddingBottom: 18,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
  },
  subtitle: {
    color: "#CBD5E1",
    fontSize: 14,
    marginTop: 4,
  },
});