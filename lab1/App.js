import 'react-native-gesture-handler';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import AppHeader from './src/components/AppHeader';
import AppFooter from './src/components/AppFooter';
import TabNavigator from './src/navigation/TabNavigator';
import styles from './src/styles/appStyles';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
          <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
          <AppHeader />

          <View style={styles.navigatorContainer}>
            <NavigationContainer>
              <TabNavigator />
            </NavigationContainer>
          </View>

          <AppFooter />
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}