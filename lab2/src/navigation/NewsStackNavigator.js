import { Pressable, Text } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from '../screens/MainScreen';
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createStackNavigator();

export default function NewsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1f2937',
        },
        headerTintColor: '#ffffff',
      }}
    >
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={({ navigation }) => ({
          title: 'Список новин',
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.getParent()?.dispatch(DrawerActions.openDrawer());
              }}
              style={{ paddingHorizontal: 16 }}
            >
              <Text style={{ color: '#ffffff', fontSize: 24 }}>☰</Text>
            </Pressable>
          ),
        })}
      />

      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={({ route }) => ({
          title: route.params?.title || 'Деталі новини',
        })}
      />
    </Stack.Navigator>
  );
}