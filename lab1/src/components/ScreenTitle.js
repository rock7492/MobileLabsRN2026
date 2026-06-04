import { Text } from 'react-native';
import styles from '../styles/appStyles';

export default function ScreenTitle({ children }) {
    return <Text style={styles.screenTitle}>{children}</Text>;
}