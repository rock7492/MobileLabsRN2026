import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import AppButton from '../../src/components/AppButton';
import DeleteAccountModal from '../../src/components/DeleteAccountModal';
import FormInput from '../../src/components/FormInput';
import InfoCard from '../../src/components/InfoCard';
import LoadingScreen from '../../src/components/LoadingScreen';
import Screen from '../../src/components/Screen';
import { colors } from '../../src/components/theme';
import { useAuth } from '../../src/context/AuthContext';
import { getUserProfile, saveUserProfile } from '../../src/services/userService';

export default function ProfileScreen() {
  const { user, logout, deleteAccount } = useAuth();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      try {
        const profile = await getUserProfile(user.uid);

        if (!mounted || !profile) {
          return;
        }

        setName(profile.name || '');
        setAge(profile.age ? String(profile.age) : '');
        setCity(profile.city || '');
      } catch (error) {
        Alert.alert('Помилка', error.message || 'Не вдалося завантажити профіль.');
      } finally {
        if (mounted) {
          setLoadingProfile(false);
        }
      }
    }

    loadProfile();

    return () => {
      mounted = false;
    };
  }, [user.uid]);

  async function handleSave() {
    try {
      setSaving(true);
      await saveUserProfile(user.uid, { name, age, city });
      Alert.alert('Готово', 'Профіль успішно збережено.');
    } catch (error) {
      Alert.alert('Помилка', error.message || 'Не вдалося зберегти профіль.');
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      Alert.alert('Помилка', 'Не вдалося вийти з акаунта.');
    }
  }

  async function handleDeleteAccount(password) {
    try {
      setDeleting(true);
      await deleteAccount(password);
      setDeleteModalVisible(false);
    } catch (error) {
      Alert.alert('Помилка видалення', getDeleteErrorMessage(error.code, error.message));
    } finally {
      setDeleting(false);
    }
  }

  if (loadingProfile) {
    return <LoadingScreen />;
  }

  return (
    <Screen>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Мій профіль</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>

      <InfoCard title="Персональні дані">
        <Text style={styles.description}>
          Заповніть або оновіть дані профілю.
        </Text>

        <FormInput
          label="Ім’я"
          value={name}
          onChangeText={setName}
          placeholder="Наприклад, Андрій"
        />
        <FormInput
          label="Вік"
          value={age}
          onChangeText={setAge}
          keyboardType="number-pad"
          placeholder="Наприклад, 20"
        />
        <FormInput
          label="Місто"
          value={city}
          onChangeText={setCity}
          placeholder="Наприклад, Житомир"
        />

        <AppButton title="Зберегти профіль" onPress={handleSave} loading={saving} />
      </InfoCard>

      <InfoCard title="Керування акаунтом">
        <Text style={styles.description}>
          Можна вийти з системи або повністю видалити акаунт після повторного введення пароля.
        </Text>

        <AppButton title="Вийти" onPress={handleLogout} variant="secondary" />
        <AppButton title="Видалити акаунт" onPress={() => setDeleteModalVisible(true)} variant="danger" />
      </InfoCard>

      <DeleteAccountModal
        visible={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        onConfirm={handleDeleteAccount}
        loading={deleting}
      />
    </Screen>
  );
}

function getDeleteErrorMessage(code, fallbackMessage) {
  switch (code) {
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Невірний пароль.';
    case 'auth/requires-recent-login':
      return 'Потрібна повторна автентифікація.';
    default:
      return fallbackMessage || 'Не вдалося видалити акаунт.';
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: 18,
    marginBottom: 4,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: colors.text,
  },
  email: {
    color: colors.muted,
    marginTop: 6,
    fontSize: 15,
  },
  description: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },
});
