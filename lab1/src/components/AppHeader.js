import { View, Text } from 'react-native';
import LogoBlock from './LogoBlock';
import styles from '../styles/appStyles';

export default function AppHeader() {
    return (
        <View style={styles.header}>
            <LogoBlock />
            <Text style={styles.headerTitle}>lab1</Text>
        </View>
    );
}