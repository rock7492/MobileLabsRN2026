import { Link } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import AppButton from '../../src/components/AppButton';
import FormInput from '../../src/components/FormInput';
import Screen from '../../src/components/Screen';
import { colors } from '../../src/components/theme';
import { useAuth } from '../../src/context/AuthContext';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !password) {
      Alert.alert('Помилка', 'Заповніть email і пароль.');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
    } catch (error) {
      Alert.alert('Помилка входу', getAuthErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen centered>
      <Text style={styles.title}>Вхід до акаунта</Text>
      <Text style={styles.subtitle}>Авторизуйтесь, щоб перейти до свого профілю.</Text>

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

        <AppButton title="Увійти" onPress={handleLogin} loading={loading} />

        <Link href="/(auth)/forgot-password" style={styles.link}>
          Забули пароль?
        </Link>
        <Link href="/(auth)/register" style={styles.linkStrong}>
          Створити акаунт
        </Link>
      </View>
    </Screen>
  );
}

function getAuthErrorMessage(code) {
  switch (code) {
    case 'auth/invalid-email':
      return 'Некоректний формат email.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Невірний email або пароль.';
    case 'auth/too-many-requests':
      return 'Забагато спроб. Спробуйте пізніше.';
    default:
      return 'Не вдалося виконати вхід.';
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
  link: {
    color: colors.primary,
    textAlign: 'center',
    marginTop: 18,
    fontWeight: '700',
  },
  linkStrong: {
    color: colors.primaryDark,
    textAlign: 'center',
    marginTop: 14,
    fontWeight: '900',
  },
});
