import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/appStyles';

export default function NewsItem({ item }) {
    return (
        <View style={styles.newsItem}>
            <View style={styles.newsImagePlaceholder}>
                <Ionicons name="image-outline" size={28} color="#b9b9b9" />
            </View>

            <View style={styles.newsTextBlock}>
                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.newsDate}>{item.date}</Text>
                <Text style={styles.newsDescription}>{item.text}</Text>
            </View>
        </View>
    );
}