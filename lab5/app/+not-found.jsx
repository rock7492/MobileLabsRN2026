import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Екран не знайдено</Text>

      <Text style={styles.description}>
        Сторінка, яку ви намагаєтеся відкрити, відсутня в застосунку.
      </Text>

      <Link href="/" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Повернутися на головну</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
    alignItems: "center",
    justifyContent: "center",
    padding: 22,
    gap: 16,
  },
  title: {
    color: "#111827",
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
  },
  description: {
    color: "#6B7280",
    fontSize: 16,
    lineHeight: 23,
    textAlign: "center",
  },
  button: {
    minHeight: 50,
    borderRadius: 14,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    marginTop: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
});