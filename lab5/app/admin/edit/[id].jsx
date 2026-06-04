import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import ProductForm from "../../../components/ProductForm";
import Screen from "../../../components/Screen";
import { useProducts } from "../../../context/ProductsContext";

export default function EditProductScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { getProductById, updateProduct } = useProducts();

  const product = getProductById(id);

  function handleUpdateProduct(productData) {
    updateProduct(id, productData);
    router.replace("/admin");
  }

  if (!product) {
    return (
      <Screen>
        <Stack.Screen options={{ title: "Товар не знайдено" }} />

        <View style={styles.center}>
          <Text style={styles.title}>Товар не знайдено</Text>

          <Link href="/admin" asChild>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Повернутися в адмін-панель</Text>
            </Pressable>
          </Link>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <Stack.Screen options={{ title: "Редагувати товар" }} />

      <ProductForm
        initialProduct={product}
        submitTitle="Зберегти зміни"
        onSubmit={handleUpdateProduct}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },
  title: {
    color: "#111827",
    fontSize: 26,
    fontWeight: "900",
    textAlign: "center",
  },
  button: {
    minHeight: 50,
    borderRadius: 14,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
});
