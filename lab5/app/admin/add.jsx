import { Stack, useRouter } from "expo-router";

import ProductForm from "../../components/ProductForm";
import Screen from "../../components/Screen";
import { useProducts } from "../../context/ProductsContext";

export default function AddProductScreen() {
  const router = useRouter();
  const { addProduct } = useProducts();

  function handleAddProduct(productData) {
    addProduct(productData);
    router.replace("/admin");
  }

  return (
    <Screen>
      <Stack.Screen options={{ title: "Додати товар" }} />

      <ProductForm submitTitle="Додати товар" onSubmit={handleAddProduct} />
    </Screen>
  );
}
