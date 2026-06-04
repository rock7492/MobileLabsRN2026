import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff',
    },

    header: {
        height: 72,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e8e8e8',
    },

    logoBox: {
        width: 120,
        height: 36,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
    },

    logoTriangleGreen: {
        position: 'absolute',
        left: 0,
        top: 4,
        width: 0,
        height: 0,
        borderTopWidth: 12,
        borderBottomWidth: 12,
        borderRightWidth: 28,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: '#28a745',
        transform: [{ rotate: '180deg' }],
    },

    logoTriangleOrange: {
        position: 'absolute',
        left: 14,
        top: 9,
        width: 0,
        height: 0,
        borderTopWidth: 8,
        borderBottomWidth: 8,
        borderRightWidth: 20,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: '#f58220',
        transform: [{ rotate: '180deg' }],
    },

    logoTextWrap: {
        marginLeft: 36,
        justifyContent: 'center',
    },

    logoMainText: {
        fontSize: 8,
        fontWeight: '800',
        lineHeight: 9,
        color: '#2b5aa5',
    },

    logoSubText: {
        marginTop: 1,
        fontSize: 5.5,
        color: '#8a8a8a',
        lineHeight: 6,
    },

    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700',
        color: '#222222',
        marginRight: 24,
    },

    navigatorContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
    },

    screen: {
        flex: 1,
        backgroundColor: '#ffffff',
    },

    scrollContent: {
        paddingHorizontal: 14,
        paddingBottom: 18,
    },

    screenTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500',
        color: '#222222',
        marginTop: 14,
        marginBottom: 14,
    },

    newsItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 18,
    },

    newsImagePlaceholder: {
        width: 58,
        height: 58,
        backgroundColor: '#f3f3f3',
        borderWidth: 1,
        borderColor: '#ededed',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    newsTextBlock: {
        flex: 1,
        paddingTop: 2,
    },

    newsTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333333',
        marginBottom: 2,
    },

    newsDate: {
        fontSize: 12,
        color: '#b2b2b2',
        marginBottom: 2,
    },

    newsDescription: {
        fontSize: 13,
        color: '#444444',
    },

    galleryContent: {
        paddingHorizontal: 12,
        paddingBottom: 20,
    },

    galleryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },

    galleryCard: {
        width: '48%',
        height: 150,
        backgroundColor: '#ffffff',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#e9e9e9',
        marginBottom: 14,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },

    profileContent: {
        paddingHorizontal: 16,
        paddingBottom: 24,
    },

    formGroup: {
        marginBottom: 14,
    },

    label: {
        fontSize: 13,
        color: '#333333',
        marginBottom: 6,
    },

    input: {
        height: 42,
        borderWidth: 1,
        borderColor: '#dddddd',
        backgroundColor: '#ffffff',
        paddingHorizontal: 10,
        fontSize: 14,
        color: '#222222',
    },

    button: {
        marginTop: 10,
        height: 44,
        borderRadius: 4,
        backgroundColor: '#0d6efd',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '500',
    },

    footer: {
        height: 28,
        borderTopWidth: 1,
        borderTopColor: '#e8e8e8',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },

    footerText: {
        fontSize: 12,
        color: '#777777',
        fontStyle: 'italic',
    },
});

export default styles;