import { View, Text } from 'react-native';
import styles from '../styles/appStyles';

export default function AppFooter() {
    return (
        <View style={styles.footer}>
            <Text style={styles.footerText}>Некритий Володимир Юрійович, ЗІПЗ-22-1</Text>
        </View>
    );
}