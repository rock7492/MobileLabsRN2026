import 'react-native-gesture-handler';

import { Text } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components/native';

import { GameProvider, useGame } from './src/context/GameContext';
import { lightTheme, darkTheme } from './src/styles/theme';

import HomeScreen from './src/screens/HomeScreen';
import ChallengesScreen from './src/screens/ChallengesScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

function getTabIcon(routeName) {
  if (routeName === 'Гра') return '🎮';
  if (routeName === 'Завдання') return '✅';
  return '⚙️';
}

function MainNavigator() {
  const { themeMode } = useGame();
  const activeTheme = themeMode === 'dark' ? darkTheme : lightTheme;

  const baseNavigationTheme = themeMode === 'dark' ? DarkTheme : DefaultTheme;

  const navigationTheme = {
    ...baseNavigationTheme,
    colors: {
      ...baseNavigationTheme.colors,
      primary: activeTheme.colors.primary,
      background: activeTheme.colors.background,
      card: activeTheme.colors.card,
      text: activeTheme.colors.text,
      border: activeTheme.colors.border,
    },
  };

  return (
    <ThemeProvider theme={activeTheme}>
      <NavigationContainer theme={navigationTheme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: activeTheme.colors.primary,
            tabBarInactiveTintColor: activeTheme.colors.muted,
            tabBarStyle: {
              height: 64,
              paddingTop: 6,
              paddingBottom: 8,
              backgroundColor: activeTheme.colors.card,
              borderTopColor: activeTheme.colors.border,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '700',
            },
            tabBarIcon: ({ color }) => (
              <Text style={{ color, fontSize: 20 }}>{getTabIcon(route.name)}</Text>
            ),
          })}
        >
          <Tab.Screen name="Гра" component={HomeScreen} />
          <Tab.Screen name="Завдання" component={ChallengesScreen} />
          <Tab.Screen name="Налаштування" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GameProvider>
        <MainNavigator />
      </GameProvider>
    </GestureHandlerRootView>
  );
}