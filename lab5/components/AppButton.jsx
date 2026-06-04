import { forwardRef } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

const AppButton = forwardRef(function AppButton(
  { title, onPress, variant = "primary", style, textStyle, ...props },
  ref,
) {
  const buttonStyle =
    variant === "secondary"
      ? styles.secondaryButton
      : variant === "danger"
        ? styles.dangerButton
        : styles.primaryButton;

  const titleStyle =
    variant === "secondary"
      ? styles.secondaryText
      : variant === "danger"
        ? styles.dangerText
        : styles.primaryText;

  return (
    <Pressable
      ref={ref}
      onPress={onPress}
      {...props}
      style={({ pressed }) => [
        styles.button,
        buttonStyle,
        pressed && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.text, titleStyle, textStyle]}>{title}</Text>
    </Pressable>
  );
});

export default AppButton;

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  primaryButton: {
    backgroundColor: "#111827",
    borderColor: "#111827",
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    borderColor: "#D4D4D8",
  },
  dangerButton: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FCA5A5",
  },
  text: {
    fontSize: 15,
    fontWeight: "700",
  },
  primaryText: {
    color: "#FFFFFF",
  },
  secondaryText: {
    color: "#111827",
  },
  dangerText: {
    color: "#DC2626",
  },
  pressed: {
    opacity: 0.72,
  },
});
