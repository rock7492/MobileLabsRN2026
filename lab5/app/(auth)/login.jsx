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

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("demo@example.com");
  const [password, setPassword] = useState("123456");

  function handleLogin() {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Помилка", "Заповніть email і пароль.");
      return;
    }

    const result = login(email, password);

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
            <Text style={styles.title}>Вхід</Text>
            <Text style={styles.subtitle}>
              Увійдіть, щоб переглянути каталог офісної техніки.
            </Text>
          </View>

          <View style={styles.form}>
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

            <AppButton title="Увійти" onPress={handleLogin} />
          </View>

          <Link href="/register" style={styles.link}>
            Немає акаунту? Зареєструватися
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
    gap: 28,
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
    gap: 16,
  },
  link: {
    color: "#2563EB",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },
});