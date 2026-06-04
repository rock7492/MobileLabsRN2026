import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import AppButton from "../../components/AppButton";
import FormInput from "../../components/FormInput";
import Screen from "../../components/Screen";
import { useAuth } from "../../context/AuthContext";

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  function handleRegister() {
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !passwordConfirm.trim()
    ) {
      Alert.alert("Помилка", "Заповніть усі поля.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Помилка", "Пароль має містити мінімум 6 символів.");
      return;
    }

    if (password !== passwordConfirm) {
      Alert.alert("Помилка", "Паролі мають співпадати.");
      return;
    }

    const result = register(email, password, name);

    if (!result.success) {
      Alert.alert("Помилка", result.message);
      return;
    }

    router.replace("/");
  }

  return (
    <Screen>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Реєстрація</Text>
            <Text style={styles.subtitle}>
              Створіть акаунт для доступу до каталогу товарів.
            </Text>
          </View>

          <View style={styles.form}>
            <FormInput
              label="Ім'я"
              value={name}
              onChangeText={setName}
              placeholder="Введіть ім'я"
            />

            <FormInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Введіть email"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <FormInput
              label="Пароль"
              value={password}
              onChangeText={setPassword}
              placeholder="Введіть пароль"
              secureTextEntry
            />

            <FormInput
              label="Підтвердження паролю"
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
              placeholder="Повторіть пароль"
              secureTextEntry
            />

            <AppButton title="Зареєструватися" onPress={handleRegister} />
          </View>

          <Link href="/login" style={styles.link}>
            Вже є акаунт? Увійти
          </Link>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    gap: 24,
    paddingBottom: 28,
  },
  header: {
    gap: 10,
  },
  title: {
    color: "#111827",
    fontSize: 34,
    fontWeight: "800",
  },
  subtitle: {
    color: "#6B7280",
    fontSize: 16,
    lineHeight: 23,
  },
  form: {
    gap: 14,
  },
  link: {
    color: "#2563EB",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },
});