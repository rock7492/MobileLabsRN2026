import {
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

import ScreenTitle from '../components/ScreenTitle';
import styles from '../styles/appStyles';

export default function ProfileScreen() {
    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView
                contentContainerStyle={styles.profileContent}
                showsVerticalScrollIndicator={false}
            >
                <ScreenTitle>Реєстрація</ScreenTitle>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Електронна пошта</Text>
                    <TextInput style={styles.input} keyboardType="email-address" autoCapitalize="none" />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Пароль</Text>
                    <TextInput style={styles.input} secureTextEntry />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Пароль (ще раз)</Text>
                    <TextInput style={styles.input} secureTextEntry />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Прізвище</Text>
                    <TextInput style={styles.input} />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Ім'я</Text>
                    <TextInput style={styles.input} />
                </View>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Зареєструватися</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}