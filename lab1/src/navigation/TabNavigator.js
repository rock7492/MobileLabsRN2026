import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import GalleryScreen from '../screens/GalleryScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createMaterialTopTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="Головна"
            screenOptions={({ route }) => ({
                tabBarShowIcon: true,
                tabBarShowLabel: true,
                tabBarActiveTintColor: '#1e88e5',
                tabBarInactiveTintColor: '#9b9b9b',
                tabBarPressColor: 'transparent',
                tabBarIndicatorStyle: {
                    backgroundColor: '#1e88e5',
                    height: 3,
                },
                tabBarStyle: {
                    backgroundColor: '#f4f4f4',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 1,
                    borderBottomColor: '#e5e5e5',
                },
                tabBarLabelStyle: {
                    textTransform: 'none',
                    fontSize: 11,
                    fontWeight: '600',
                    marginTop: -2,
                },
                tabBarIcon: ({ color }) => {
                    let iconName = 'ellipse-outline';

                    if (route.name === 'Головна') iconName = 'home';
                    if (route.name === 'Фотогалерея') iconName = 'images';
                    if (route.name === 'Профіль') iconName = 'person';

                    return <Ionicons name={iconName} size={20} color={color} />;
                },
                swipeEnabled: true,
            })}
        >
            <Tab.Screen name="Головна" component={HomeScreen} />
            <Tab.Screen name="Фотогалерея" component={GalleryScreen} />
            <Tab.Screen name="Профіль" component={ProfileScreen} />
        </Tab.Navigator>
    );
}