export function generateNews(startId, count) {
  return Array.from({ length: count }, (_, index) => {
    const id = startId + index;

    return {
      id: String(id),
      title: `Новина №${id}`,
      description:
        `Опис новини №${id}.`,
      image: `https://picsum.photos/seed/news-${id}/600/350`,
    };
  });
}

export const initialNews = generateNews(1, 15);