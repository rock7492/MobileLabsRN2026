import { Redirect } from 'expo-router';
import LoadingScreen from '../src/components/LoadingScreen';
import { useAuth } from '../src/context/AuthContext';

export default function Index() {
  const { user, initializing } = useAuth();

  if (initializing) {
    return <LoadingScreen />;
  }

  return <Redirect href={user ? '/(app)/profile' : '/(auth)/login'} />;
}
