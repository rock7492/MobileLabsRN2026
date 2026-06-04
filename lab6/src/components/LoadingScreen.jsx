import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors } from './theme';

export default function LoadingScreen() {
  return (
    <View style={styles.root}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.text}>Завантаження...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  text: {
    marginTop: 12,
    color: colors.muted,
    fontSize: 15,
  },
});
