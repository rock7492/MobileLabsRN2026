import { ScrollView } from 'react-native';
import ScreenTitle from '../components/ScreenTitle';
import NewsItem from '../components/NewsItem';
import newsData from '../data/newsData';
import styles from '../styles/appStyles';

export default function HomeScreen() {
    return (
        <ScrollView
            style={styles.screen}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            <ScreenTitle>Новини</ScreenTitle>

            {newsData.map((item) => (
                <NewsItem key={item.id} item={item} />
            ))}
        </ScrollView>
    );
}