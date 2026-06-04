import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { productImageOptions } from "../data/productImages";

export default function ProductImagePicker({ selectedImageKey, onSelect }) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Зображення товару</Text>

      <View style={styles.grid}>
        {productImageOptions.map((option) => {
          const isSelected = option.key === selectedImageKey;

          return (
            <Pressable
              key={option.key}
              onPress={() => onSelect(option.key)}
              style={[styles.item, isSelected && styles.selectedItem]}
            >
              <Image source={option.source} style={styles.image} />
              <Text style={[styles.text, isSelected && styles.selectedText]}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 10,
  },
  label: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "600",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  item: {
    width: "47%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 14,
    padding: 10,
    gap: 8,
    alignItems: "center",
  },
  selectedItem: {
    borderColor: "#2563EB",
    backgroundColor: "#EFF6FF",
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 10,
    backgroundColor: "#E5E7EB",
  },
  text: {
    color: "#4B5563",
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
  },
  selectedText: {
    color: "#2563EB",
  },
});