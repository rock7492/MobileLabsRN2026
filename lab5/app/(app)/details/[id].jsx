import { Link, Stack, useLocalSearchParams } from "expo-router";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import AppButton from "../../../components/AppButton";
import Screen from "../../../components/Screen";
import { useCart } from "../../../context/CartContext";
import { useProducts } from "../../../context/ProductsContext";
import { getProductImageSource } from "../../../data/productImages";

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();

  const product = getProductById(id);

  function handleAddToCart() {
    addToCart(product);
    Alert.alert("Кошик", "Товар додано до кошика.");
  }

  if (!product) {
    return (
      <Screen>
        <Stack.Screen options={{ title: "Товар не знайдено" }} />

        <View style={styles.center}>
          <Text style={styles.errorTitle}>Товар не знайдено</Text>
          <Text style={styles.errorText}>
            Обраний товар відсутній у каталозі.
          </Text>

          <Link href="/" asChild>
            <Pressable style={styles.backButton}>
              <Text style={styles.backButtonText}>Повернутися в каталог</Text>
            </Pressable>
          </Link>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <Stack.Screen options={{ title: product.name }} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Image
          source={getProductImageSource(product.imageKey)}
          style={styles.image}
        />

        <View style={styles.card}>
          <Text style={styles.name}>{product.name}</Text>

          <Text style={styles.price}>
            {product.price.toLocaleString("uk-UA")} грн
          </Text>

          <Text style={styles.sectionTitle}>Опис</Text>

          <Text style={styles.description}>{product.description}</Text>
        </View>

        <View style={styles.actions}>
          <AppButton title="Додати в кошик" onPress={handleAddToCart} />

          <Link href="/cart" asChild>
            <AppButton title="Перейти в кошик" variant="secondary" />
          </Link>

          <Link href="/" asChild>
            <AppButton title="Назад до каталогу" variant="secondary" />
          </Link>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 28,
    gap: 14,
  },
  image: {
    width: "100%",
    height: 280,
    borderRadius: 20,
    backgroundColor: "#F4F4F5",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 18,
    gap: 12,
  },
  name: {
    color: "#111827",
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: -0.6,
  },
  price: {
    color: "#111827",
    fontSize: 24,
    fontWeight: "900",
  },
  sectionTitle: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "800",
    marginTop: 6,
  },
  description: {
    color: "#52525B",
    fontSize: 16,
    lineHeight: 24,
  },
  actions: {
    gap: 10,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },
  errorTitle: {
    color: "#111827",
    fontSize: 26,
    fontWeight: "900",
    textAlign: "center",
  },
  errorText: {
    color: "#71717A",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 23,
  },
  backButton: {
    minHeight: 50,
    borderRadius: 12,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
});
