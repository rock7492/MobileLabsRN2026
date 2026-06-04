import { Link, Stack } from "expo-router";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";

import AdminProductCard from "../../components/AdminProductCard";
import AppButton from "../../components/AppButton";
import Screen from "../../components/Screen";
import { useProducts } from "../../context/ProductsContext";

export default function AdminProductsScreen() {
  const { products, deleteProduct } = useProducts();

  function handleDelete(product) {
    Alert.alert("Видалення товару", `Видалити товар "${product.name}"?`, [
      {
        text: "Скасувати",
        style: "cancel",
      },
      {
        text: "Видалити",
        style: "destructive",
        onPress: () => deleteProduct(product.id),
      },
    ]);
  }

  return (
    <Screen>
      <Stack.Screen options={{ title: "Адмін-панель" }} />

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Керування товарами</Text>

            <Text style={styles.description}>
              Адміністратор може додавати нові комплектуючі, редагувати наявні
              товари та видаляти їх із каталогу.
            </Text>

            <Link href="/admin/add" asChild>
              <AppButton title="Додати товар" />
            </Link>
          </View>
        }
        renderItem={({ item }) => (
          <AdminProductCard product={item} onDelete={handleDelete} />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 28,
  },
  header: {
    gap: 14,
    marginBottom: 18,
  },
  title: {
    color: "#111827",
    fontSize: 28,
    fontWeight: "900",
  },
  description: {
    color: "#4B5563",
    fontSize: 15,
    lineHeight: 22,
  },
});
