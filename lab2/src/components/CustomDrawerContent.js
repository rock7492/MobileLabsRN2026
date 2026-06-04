import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function CustomDrawerContent({ navigation, state }) {
  const activeRouteName = state.routes[state.index].name;

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          source={{
            uri: 'https://picsum.photos/seed/avatar-lab2/200/200',
          }}
          style={styles.avatar}
        />

        <Text style={styles.name}>Некритий Володимир</Text>
        <Text style={styles.group}>Група: ЗІПЗ-22-1</Text>
      </View>

      <View style={styles.menu}>
        <Pressable
          style={[
            styles.menuItem,
            activeRouteName === 'News' && styles.activeMenuItem,
          ]}
          onPress={() => navigation.navigate('News')}
        >
          <Text
            style={[
              styles.menuText,
              activeRouteName === 'News' && styles.activeMenuText,
            ]}
          >
            Новини
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.menuItem,
            activeRouteName === 'Contacts' && styles.activeMenuItem,
          ]}
          onPress={() => navigation.navigate('Contacts')}
        >
          <Text
            style={[
              styles.menuText,
              activeRouteName === 'Contacts' && styles.activeMenuText,
            ]}
          >
            Контакти
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  profile: {
    paddingTop: 48,
    paddingHorizontal: 20,
    paddingBottom: 24,
    backgroundColor: '#1f2937',
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
    marginBottom: 14,
    backgroundColor: '#d1d5db',
  },
  name: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  group: {
    color: '#d1d5db',
    fontSize: 14,
  },
  menu: {
    paddingTop: 16,
  },
  menuItem: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  activeMenuItem: {
    backgroundColor: '#e5e7eb',
  },
  menuText: {
    fontSize: 16,
    color: '#111827',
  },
  activeMenuText: {
    fontWeight: '700',
  },
});