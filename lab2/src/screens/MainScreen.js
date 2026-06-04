import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import NewsCard from '../components/NewsCard';
import { generateNews, initialNews } from '../data/news';

export default function MainScreen({ navigation }) {
  const [news, setNews] = useState(initialNews);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextId, setNextId] = useState(16);

  const isLoadingMoreRef = useRef(false);
  const canLoadMoreRef = useRef(false);

  function handleRefresh() {
    if (refreshing || isLoadingMoreRef.current) {
      return;
    }

    setRefreshing(true);

    setTimeout(() => {
      setNews(generateNews(1, 15));
      setNextId(16);
      setRefreshing(false);
    }, 1200);
  }

  function handleLoadMore() {
    if (!canLoadMoreRef.current) {
      return;
    }

    if (isLoadingMoreRef.current || refreshing) {
      return;
    }

    canLoadMoreRef.current = false;
    isLoadingMoreRef.current = true;
    setLoadingMore(true);

    setTimeout(() => {
      const moreNews = generateNews(nextId, 10);

      setNews((currentNews) => [...currentNews, ...moreNews]);
      setNextId((currentId) => currentId + 10);

      isLoadingMoreRef.current = false;
      setLoadingMore(false);
    }, 1200);
  }

  function renderNewsItem({ item }) {
    return (
      <NewsCard
        item={item}
        onPress={() =>
          navigation.navigate('DetailsScreen', {
            id: item.id,
            title: item.title,
            description: item.description,
            image: item.image,
          })
        }
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={news}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.2}
        onMomentumScrollBegin={() => {
          canLoadMoreRef.current = true;
        }}
        initialNumToRender={8}
        maxToRenderPerBatch={6}
        windowSize={7}
        removeClippedSubviews={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Новини університету</Text>
            <Text style={styles.headerSubtitle}>
              Список реалізовано через FlatList з віртуалізацією, оновленням та
              підвантаженням даних.
            </Text>
          </View>
        }
        ListFooterComponent={
          <View style={styles.footer}>
            {loadingMore ? (
              <>
                <ActivityIndicator size="small" />
                <Text style={styles.footerText}>Завантаження новин...</Text>
              </>
            ) : (
              <Text style={styles.footerText}>
                Прокрутіть нижче для підвантаження
              </Text>
            )}
          </View>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
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
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4b5563',
  },
  separator: {
    height: 2,
  },
  footer: {
    minHeight: 80,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    marginTop: 8,
    fontSize: 14,
    color: '#6b7280',
  },
});