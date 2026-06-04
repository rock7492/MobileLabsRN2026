import { createDrawerNavigator } from '@react-navigation/drawer';

import NewsStackNavigator from './NewsStackNavigator';
import ContactsScreen from '../screens/ContactsScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: 'front',
        overlayColor: 'rgba(0, 0, 0, 0.45)',
        drawerStyle: {
          width: 280,
          backgroundColor: '#ffffff',
        },
        headerStyle: {
          backgroundColor: '#1f2937',
        },
        headerTintColor: '#ffffff',
      }}
    >
      <Drawer.Screen
        name="News"
        component={NewsStackNavigator}
        options={{
          title: 'Новини',
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{
          title: 'Контакти',
        }}
      />
    </Drawer.Navigator>
  );
}