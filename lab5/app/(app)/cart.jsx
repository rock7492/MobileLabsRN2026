import { Stack } from "expo-router";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import AppButton from "../../components/AppButton";
import Screen from "../../components/Screen";
import { useCart } from "../../context/CartContext";
import { getProductImageSource } from "../../data/productImages";

export default function CartScreen() {
  const {
    cartItems,
    totalCount,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  function handleCheckout() {
    if (cartItems.length === 0) {
      Alert.alert("Кошик порожній", "Додайте товари перед оформленням.");
      return;
    }

    clearCart();

    Alert.alert(
      "Замовлення оформлено",
      "Ваше замовлення успішно оформлене і буде опрацьоване найближчим часом.",
    );
  }

  return (
    <Screen>
      <Stack.Screen options={{ title: "Кошик" }} />

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Кошик</Text>

            <Text style={styles.description}>
              Товарів: {totalCount}. Сума: {totalPrice.toLocaleString("uk-UA")}{" "}
              грн
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image
              source={getProductImageSource(item.imageKey)}
              style={styles.image}
            />

            <View style={styles.itemContent}>
              <Text style={styles.name}>{item.name}</Text>

              <Text style={styles.price}>
                {(item.price * item.quantity).toLocaleString("uk-UA")} грн
              </Text>

              <Text style={styles.singlePrice}>
                {item.price.toLocaleString("uk-UA")} грн за одиницю
              </Text>

              <View style={styles.controls}>
                <Pressable
                  onPress={() => decreaseQuantity(item.id)}
                  style={styles.quantityButton}
                >
                  <Text style={styles.quantityButtonText}>−</Text>
                </Pressable>

                <Text style={styles.quantity}>{item.quantity}</Text>

                <Pressable
                  onPress={() => increaseQuantity(item.id)}
                  style={styles.quantityButton}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </Pressable>

                <Pressable
                  onPress={() => removeFromCart(item.id)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeText}>Видалити</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyBlock}>
            <Text style={styles.emptyTitle}>Кошик порожній</Text>
            <Text style={styles.emptyText}>
              Додайте товари з каталогу, щоб оформити замовлення.
            </Text>
          </View>
        }
        ListFooterComponent={
          <View style={styles.footer}>
            <View style={styles.totalBlock}>
              <Text style={styles.totalLabel}>До сплати</Text>
              <Text style={styles.totalPrice}>
                {totalPrice.toLocaleString("uk-UA")} грн
              </Text>
            </View>

            <AppButton title="Оформити замовлення" onPress={handleCheckout} />

            {cartItems.length > 0 && (
              <AppButton
                title="Очистити кошик"
                variant="danger"
                onPress={clearCart}
              />
            )}
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
    gap: 6,
    marginBottom: 18,
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
  item: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 12,
    marginBottom: 12,
  },
  image: {
    width: 86,
    height: 86,
    borderRadius: 14,
    backgroundColor: "#F4F4F5",
  },
  itemContent: {
    flex: 1,
    gap: 6,
  },
  name: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "800",
  },
  price: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "900",
  },
  singlePrice: {
    color: "#71717A",
    fontSize: 13,
    fontWeight: "600",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 6,
  },
  quantityButton: {
    width: 34,
    height: 34,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D4D4D8",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  quantityButtonText: {
    color: "#111827",
    fontSize: 20,
    fontWeight: "800",
  },
  quantity: {
    minWidth: 22,
    color: "#111827",
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
  },
  removeButton: {
    marginLeft: "auto",
    minHeight: 34,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEF2F2",
  },
  removeText: {
    color: "#DC2626",
    fontSize: 13,
    fontWeight: "800",
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
  footer: {
    gap: 10,
    marginTop: 10,
  },
  totalBlock: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
    gap: 6,
  },
  totalLabel: {
    color: "#71717A",
    fontSize: 14,
    fontWeight: "700",
  },
  totalPrice: {
    color: "#111827",
    fontSize: 24,
    fontWeight: "900",
  },
});
