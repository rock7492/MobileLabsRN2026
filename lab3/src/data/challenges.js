function limit(current, target) {
  return Math.min(current, target);
}

export function getChallenges(stats) {
  return [
    {
      id: 'tap10',
      title: 'Зробити 10 натискань',
      description: 'Натискай на об’єкт будь-яким способом: коротко, двічі або з утриманням.',
      current: limit(stats.pressActions, 10),
      target: 10,
      done: stats.pressActions >= 10,
    },
    {
      id: 'double5',
      title: 'Зробити 5 подвійних кліків',
      description: 'Натискай на об’єкт двічі підряд, щоб отримувати більше очок.',
      current: limit(stats.doubleTaps, 5),
      target: 5,
      done: stats.doubleTaps >= 5,
    },
    {
      id: 'long3sec',
      title: 'Утримати об’єкт 3 секунди',
      description: 'Затисни об’єкт і дочекайся бонусу за довге натискання.',
      current: stats.longPresses > 0 ? 1 : 0,
      target: 1,
      done: stats.longPresses > 0,
    },
    {
      id: 'drag',
      title: 'Перетягнути об’єкт',
      description: 'Перемісти об’єкт пальцем у межах ігрової області.',
      current: stats.dragged ? 1 : 0,
      target: 1,
      done: stats.dragged,
    },
    {
      id: 'swipeRight',
      title: 'Зробити свайп вправо',
      description: 'Проведи по об’єкту вправо швидким рухом.',
      current: stats.swipeRight ? 1 : 0,
      target: 1,
      done: stats.swipeRight,
    },
    {
      id: 'swipeLeft',
      title: 'Зробити свайп вліво',
      description: 'Проведи по об’єкту вліво швидким рухом.',
      current: stats.swipeLeft ? 1 : 0,
      target: 1,
      done: stats.swipeLeft,
    },
    {
      id: 'pinch',
      title: 'Змінити розмір об’єкта',
      description: 'Використай два пальці, щоб збільшити або зменшити об’єкт.',
      current: stats.pinchResize ? 1 : 0,
      target: 1,
      done: stats.pinchResize,
    },
    {
      id: 'score100',
      title: 'Отримати 100 очок',
      description: 'Збирай очки різними жестами, доки не набереш 100.',
      current: limit(stats.score, 100),
      target: 100,
      done: stats.score >= 100,
    },
    {
      id: 'customSwipe3',
      title: 'Зробити 3 свайпи',
      description: 'Зроби 3 швидкі свайпи у будь-якому напрямку.',
      current: limit(stats.flings, 3),
      target: 3,
      done: stats.flings >= 3,
    },
  ];
}