import { ScrollView, View } from 'react-native';
import ScreenTitle from '../components/ScreenTitle';
import GalleryCard from '../components/GalleryCard';
import galleryData from '../data/galleryData';
import styles from '../styles/appStyles';

export default function GalleryScreen() {
    return (
        <ScrollView
            style={styles.screen}
            contentContainerStyle={styles.galleryContent}
            showsVerticalScrollIndicator={false}
        >
            <ScreenTitle>Фотогалерея</ScreenTitle>

            <View style={styles.galleryGrid}>
                {galleryData.map((item) => (
                    <GalleryCard key={item.id} />
                ))}
            </View>
        </ScrollView>
    );
}