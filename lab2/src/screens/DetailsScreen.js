import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function DetailsScreen({ route }) {
  const { id, title, description, image } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.badge}>ID новини: {id}</Text>

        <Text style={styles.title}>{title}</Text>

        <Text style={styles.description}>{description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  image: {
    width: '100%',
    height: 240,
    backgroundColor: '#d1d5db',
  },
  content: {
    padding: 18,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e5e7eb',
    color: '#374151',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontSize: 13,
    marginBottom: 14,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    marginBottom: 16,
  },
  fullText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#4b5563',
  },
});