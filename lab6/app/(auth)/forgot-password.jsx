import { Link } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import AppButton from "../../src/components/AppButton";
import FormInput from "../../src/components/FormInput";
import Screen from "../../src/components/Screen";
import { colors } from "../../src/components/theme";
import { useAuth } from "../../src/context/AuthContext";

export default function ForgotPasswordScreen() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleResetPassword() {
    if (!email.trim()) {
      Alert.alert("Помилка", "Введіть email.");
      return;
    }

    try {
      setLoading(true);
      await resetPassword(email);
      Alert.alert("Готово", "Лист для зміни пароля відправлено на email.");
    } catch (error) {
      console.log("RESET PASSWORD ERROR:", error.code, error.message);
      Alert.alert("Помилка", getAuthErrorMessage(error.code || error.message));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen centered>
      <Text style={styles.title}>Відновлення пароля</Text>
      <Text style={styles.subtitle}>
        Введіть email для відновлення паролю.
      </Text>

      <View style={styles.card}>
        <FormInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="example@mail.com"
        />

        <AppButton
          title="Відправити лист"
          onPress={handleResetPassword}
          loading={loading}
        />

        <Link href="/(auth)/login" style={styles.linkStrong}>
          Повернутися до входу
        </Link>
      </View>
    </Screen>
  );
}

function getAuthErrorMessage(code) {
  switch (code) {
    case "auth/invalid-email":
      return "Некоректний формат email.";
    case "auth/user-not-found":
      return "Користувача з таким email не знайдено.";
    case "auth/missing-email":
      return "Введіть email.";
    case "auth/too-many-requests":
      return "Забагато спроб. Спробуйте пізніше.";
    case "auth/network-request-failed":
      return "Проблема з інтернет-з’єднанням.";
    default:
      return "Не вдалося відправити лист. Перевірте email і налаштування Firebase.";
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: colors.text,
    textAlign: "center",
  },
  subtitle: {
    color: colors.muted,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 14,
    fontSize: 15,
    lineHeight: 21,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  linkStrong: {
    color: colors.primaryDark,
    textAlign: "center",
    marginTop: 18,
    fontWeight: "900",
  },
});
