import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/appStyles';

export default function GalleryCard() {
    return (
        <View style={styles.galleryCard}>
            <Ionicons name="image-outline" size={34} color="#d0d0d0" />
        </View>
    );
}