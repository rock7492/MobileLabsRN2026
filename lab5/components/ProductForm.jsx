import { Alert, ScrollView, StyleSheet } from "react-native";
import AppButton from "./AppButton";
import FormInput from "./FormInput";
import ProductImagePicker from "./ProductImagePicker";
import { useState } from "react";

export default function ProductForm({
  initialProduct,
  submitTitle,
  onSubmit,
}) {
  const [name, setName] = useState(initialProduct?.name ?? "");
  const [price, setPrice] = useState(
    initialProduct?.price ? String(initialProduct.price) : ""
  );
  const [description, setDescription] = useState(
    initialProduct?.description ?? ""
  );
  const [imageKey, setImageKey] = useState(initialProduct?.imageKey ?? "cpu");

  function handleSubmit() {
    const normalizedName = name.trim();
    const normalizedDescription = description.trim();
    const normalizedPrice = Number(price.replace(",", "."));

    if (!normalizedName || !price.trim() || !normalizedDescription) {
      Alert.alert("Помилка", "Заповніть усі поля товару.");
      return;
    }

    if (Number.isNaN(normalizedPrice) || normalizedPrice <= 0) {
      Alert.alert("Помилка", "Введіть коректну ціну товару.");
      return;
    }

    onSubmit({
      name: normalizedName,
      price: normalizedPrice,
      description: normalizedDescription,
      imageKey,
    });
  }

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <FormInput
        label="Назва товару"
        value={name}
        onChangeText={setName}
        placeholder="Наприклад: AMD Ryzen 5 5600"
      />

      <FormInput
        label="Ціна"
        value={price}
        onChangeText={setPrice}
        placeholder="Наприклад: 4899"
        keyboardType="numeric"
      />

      <FormInput
        label="Опис"
        value={description}
        onChangeText={setDescription}
        placeholder="Опишіть характеристики товару"
        multiline
        numberOfLines={5}
      />

      <ProductImagePicker
        selectedImageKey={imageKey}
        onSelect={setImageKey}
      />

      <AppButton title={submitTitle} onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 16,
    paddingBottom: 28,
  },
});