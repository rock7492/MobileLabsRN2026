import { SectionList, StyleSheet, Text, View } from 'react-native';

import { contactSections } from '../data/contacts';

export default function ContactsScreen() {
  function renderContact({ item }) {
    return (
      <View style={styles.contactItem}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactPhone}>{item.phone}</Text>
      </View>
    );
  }

  function renderSectionHeader({ section }) {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{section.title}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SectionList
        sections={contactSections}
        renderItem={renderContact}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Контакти</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#4b5563',
  },
  sectionHeader: {
    backgroundColor: '#e5e7eb',
    paddingVertical: 9,
    paddingHorizontal: 16,
  },
  sectionHeaderText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  contactItem: {
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  contactPhone: {
    fontSize: 14,
    color: '#4b5563',
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
  },
});