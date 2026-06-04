import { Link } from "expo-router";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";

import AppButton from "../../components/AppButton";
import ProductCard from "../../components/ProductCard";
import Screen from "../../components/Screen";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useProducts } from "../../context/ProductsContext";

export default function CatalogScreen() {
  const { currentUser, isAdmin, logout } = useAuth();
  const { products } = useProducts();
  const { addToCart, totalCount } = useCart();

  function handleAddToCart(product) {
    addToCart(product);
    Alert.alert("Кошик", "Товар додано до кошика.");
  }

  return (
    <Screen>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.topLine}>
              <View style={styles.userBlock}>
                <Text style={styles.smallText}>Вітаємо</Text>
                <Text style={styles.userName}>
                  {currentUser?.name ?? "користувачу"}
                </Text>
              </View>

              <AppButton
                title="Вийти"
                variant="secondary"
                onPress={logout}
                style={styles.logoutButton}
              />
            </View>

            <View style={styles.titleBlock}>
              <Text style={styles.title}>Комплектуючі</Text>
              <Text style={styles.description}>
                Мінімальний каталог товарів для збірки комп'ютера.
              </Text>
            </View>

            <View style={styles.navigation}>
              <Link href="/cart" asChild>
                <AppButton
                  title={`Кошик (${totalCount})`}
                  variant="secondary"
                  style={styles.navButton}
                />
              </Link>

              {isAdmin && (
                <Link href="/admin" asChild>
                  <AppButton
                    title="Адмін"
                    variant="secondary"
                    style={styles.navButton}
                  />
                </Link>
              )}
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onAddToCart={() => handleAddToCart(item)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyBlock}>
            <Text style={styles.emptyTitle}>Каталог порожній</Text>
            <Text style={styles.emptyText}>
              Адміністратор може додати товари через панель керування.
            </Text>
          </View>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 28,
  },
  header: {
    gap: 18,
    marginBottom: 18,
  },
  topLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  userBlock: {
    flex: 1,
  },
  smallText: {
    color: "#71717A",
    fontSize: 13,
    fontWeight: "600",
  },
  userName: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "800",
  },
  logoutButton: {
    minHeight: 42,
    paddingHorizontal: 14,
  },
  titleBlock: {
    gap: 6,
  },
  title: {
    color: "#111827",
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: -0.8,
  },
  description: {
    color: "#52525B",
    fontSize: 15,
    lineHeight: 22,
  },
  navigation: {
    flexDirection: "row",
    gap: 10,
  },
  navButton: {
    flex: 1,
  },
  emptyBlock: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 18,
    gap: 8,
  },
  emptyTitle: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "800",
  },
  emptyText: {
    color: "#71717A",
    fontSize: 15,
    lineHeight: 22,
  },
});
