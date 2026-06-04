import { Redirect, Stack } from 'expo-router';
import LoadingScreen from '../../src/components/LoadingScreen';
import { useAuth } from '../../src/context/AuthContext';

export default function AuthLayout() {
  const { user, initializing } = useAuth();

  if (initializing) {
    return <LoadingScreen />;
  }

  if (user) {
    return <Redirect href="/(app)/profile" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#F6F7FB' },
      }}
    />
  );
}
