import { Modal, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import AppButton from './AppButton';
import FormInput from './FormInput';
import { colors } from './theme';

export default function DeleteAccountModal({ visible, onCancel, onConfirm, loading }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleConfirm() {
    if (password.length < 6) {
      setError('Введіть поточний пароль.');
      return;
    }

    setError('');
    await onConfirm(password);
    setPassword('');
  }

  function handleCancel() {
    setPassword('');
    setError('');
    onCancel();
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleCancel}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Видалення акаунта</Text>
          <Text style={styles.description}>
            Для підтвердження введіть поточний пароль.
          </Text>

          <FormInput
            label="Поточний пароль"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            error={error}
          />

          <AppButton title="Видалити акаунт" onPress={handleConfirm} loading={loading} variant="danger" />
          <AppButton title="Скасувати" onPress={handleCancel} variant="secondary" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(17, 24, 39, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modal: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.text,
  },
  description: {
    marginTop: 8,
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
});
