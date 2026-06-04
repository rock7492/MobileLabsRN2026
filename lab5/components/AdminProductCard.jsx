import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { getProductImageSource } from "../data/productImages";

export default function AdminProductCard({ product, onDelete }) {
  return (
    <View style={styles.card}>
      <View style={styles.main}>
        <Image
          source={getProductImageSource(product.imageKey)}
          style={styles.image}
        />

        <View style={styles.info}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>
            {product.price.toLocaleString("uk-UA")} грн
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Link href={`/admin/edit/${product.id}`} asChild>
          <Pressable style={[styles.actionButton, styles.editButton]}>
            <Text style={styles.editText}>Редагувати</Text>
          </Pressable>
        </Link>

        <Pressable
          onPress={() => onDelete(product)}
          style={[styles.actionButton, styles.deleteButton]}
        >
          <Text style={styles.deleteText}>Видалити</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 12,
    marginBottom: 12,
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 3,
  },
  main: {
    flexDirection: "row",
    gap: 14,
  },
  image: {
    width: 82,
    height: 82,
    borderRadius: 14,
    backgroundColor: "#E5E7EB",
  },
  info: {
    flex: 1,
    justifyContent: "center",
    gap: 8,
  },
  name: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "800",
  },
  price: {
    color: "#2563EB",
    fontSize: 16,
    fontWeight: "900",
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  actionButton: {
    flex: 1,
    minHeight: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  editButton: {
    backgroundColor: "#DBEAFE",
  },
  deleteButton: {
    backgroundColor: "#FEE2E2",
  },
  editText: {
    color: "#1D4ED8",
    fontWeight: "800",
  },
  deleteText: {
    color: "#DC2626",
    fontWeight: "800",
  },
});