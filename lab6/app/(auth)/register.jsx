import { Link } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import AppButton from '../../src/components/AppButton';
import FormInput from '../../src/components/FormInput';
import Screen from '../../src/components/Screen';
import { colors } from '../../src/components/theme';
import { useAuth } from '../../src/context/AuthContext';

export default function RegisterScreen() {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!email.trim() || !password || !repeatPassword) {
      Alert.alert('Помилка', 'Заповніть усі поля.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Помилка', 'Пароль має містити мінімум 6 символів.');
      return;
    }

    if (password !== repeatPassword) {
      Alert.alert('Помилка', 'Паролі мають збігатися.');
      return;
    }

    try {
      setLoading(true);
      await register(email, password);
    } catch (error) {
      Alert.alert('Помилка реєстрації', getAuthErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen centered>
      <Text style={styles.title}>Реєстрація</Text>
      <Text style={styles.subtitle}>Створіть акаунт для збереження персональних даних.</Text>

      <View style={styles.card}>
        <FormInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="example@mail.com"
        />
        <FormInput
          label="Пароль"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Мінімум 6 символів"
        />
        <FormInput
          label="Повторіть пароль"
          value={repeatPassword}
          onChangeText={setRepeatPassword}
          secureTextEntry
          placeholder="Повторіть пароль"
        />

        <AppButton title="Зареєструватися" onPress={handleRegister} loading={loading} />

        <Link href="/(auth)/login" style={styles.linkStrong}>
          Уже є акаунт? Увійти
        </Link>
      </View>
    </Screen>
  );
}

function getAuthErrorMessage(code) {
  switch (code) {
    case 'auth/invalid-email':
      return 'Некоректний формат email.';
    case 'auth/email-already-in-use':
      return 'Такий email уже використовується.';
    case 'auth/weak-password':
      return 'Пароль занадто слабкий.';
    default:
      return 'Не вдалося створити акаунт.';
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.muted,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 14,
    fontSize: 15,
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
    textAlign: 'center',
    marginTop: 18,
    fontWeight: '900',
  },
});
