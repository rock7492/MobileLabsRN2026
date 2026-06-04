import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext(null);

const initialStats = {
  score: 0,
  taps: 0,
  pressActions: 0,
  doubleTaps: 0,
  longPresses: 0,
  dragged: false,
  swipeRight: false,
  swipeLeft: false,
  pinchResize: false,
  flings: 0,
  lastAction: 'Почни взаємодію з об’єктом',
};

export function GameProvider({ children }) {
  const [stats, setStats] = useState(initialStats);
  const [themeMode, setThemeMode] = useState('light');

  const registerTap = () => {
    setStats((prev) => ({
      ...prev,
      score: prev.score + 1,
      taps: prev.taps + 1,
      pressActions: prev.pressActions + 1,
      lastAction: 'Коротке натискання: +1 очко',
    }));
  };

  const registerDoubleTap = () => {
    setStats((prev) => ({
      ...prev,
      score: prev.score + 2,
      doubleTaps: prev.doubleTaps + 1,
      pressActions: prev.pressActions + 2,
      lastAction: 'Подвійний клік: +2 очки',
    }));
  };

  const registerLongPress = () => {
    setStats((prev) => ({
      ...prev,
      score: prev.score + 5,
      longPresses: prev.longPresses + 1,
      pressActions: prev.pressActions + 1,
      lastAction: 'Утримання 3 секунди: +5 очок',
    }));
  };

  const registerDrag = () => {
    setStats((prev) => ({
      ...prev,
      score: prev.score + 10,
      dragged: true,
      lastAction: 'Перетягування об’єкта: +10 очок',
    }));
  };

  const registerSwipe = (direction) => {
    const points = Math.floor(Math.random() * 10) + 1;

    setStats((prev) => ({
      ...prev,
      score: prev.score + points,
      swipeRight: direction === 'right' ? true : prev.swipeRight,
      swipeLeft: direction === 'left' ? true : prev.swipeLeft,
      flings: prev.flings + 1,
      lastAction:
        direction === 'right'
          ? `Свайп вправо: +${points} очок`
          : `Свайп вліво: +${points} очок`,
    }));
  };

  const registerPinch = () => {
    setStats((prev) => ({
      ...prev,
      score: prev.score + 3,
      pinchResize: true,
      lastAction: 'Зміна розміру об’єкта: +3 очки',
    }));
  };

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const resetProgress = () => {
    setStats(initialStats);
  };

  return (
    <GameContext.Provider
      value={{
        stats,
        themeMode,
        registerTap,
        registerDoubleTap,
        registerLongPress,
        registerDrag,
        registerSwipe,
        registerPinch,
        toggleTheme,
        resetProgress,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGame must be used inside GameProvider');
  }

  return context;
}