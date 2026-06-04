import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { getProductImageSource } from "../data/productImages";
import AppButton from "./AppButton";

export default function ProductCard({ product, onAddToCart }) {
  return (
    <View style={styles.card}>
      <Image
        source={getProductImageSource(product.imageKey)}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>

        <Text style={styles.price}>
          {product.price.toLocaleString("uk-UA")} грн
        </Text>

        <View style={styles.actions}>
          <Link href={`/details/${product.id}`} asChild>
            <Pressable style={styles.detailsButton}>
              <Text style={styles.detailsText}>Деталі</Text>
            </Pressable>
          </Link>

          <AppButton
            title="У кошик"
            onPress={onAddToCart}
            style={styles.cartButton}
            textStyle={styles.cartButtonText}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 12,
    marginBottom: 12,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 14,
    backgroundColor: "#F4F4F5",
  },
  content: {
    marginTop: 12,
    gap: 10,
  },
  name: {
    color: "#111827",
    fontSize: 17,
    fontWeight: "800",
  },
  price: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "900",
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 4,
  },
  detailsButton: {
    flex: 1,
    minHeight: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D4D4D8",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  detailsText: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "700",
  },
  cartButton: {
    flex: 1,
    minHeight: 44,
  },
  cartButtonText: {
    fontSize: 15,
  },
});
