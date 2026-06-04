import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { ProductsProvider } from "../context/ProductsContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}
