import React, { useRef, useState } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import {
  Directions,
  FlingGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  PinchGestureHandler,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';

import { useGame } from '../context/GameContext';

const OBJECT_SIZE = 155;

function clamp(value, min, max) {
  return Math.max(min, Math.min(value, max));
}

export default function ClickerObject() {
  const {
    registerTap,
    registerDoubleTap,
    registerLongPress,
    registerDrag,
    registerSwipe,
    registerPinch,
  } = useGame();

  const doubleTapRef = useRef(null);

  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });

  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const lastPan = useRef({ x: 0, y: 0 });

  const baseScale = useRef(new Animated.Value(1)).current;
  const pinchScale = useRef(new Animated.Value(1)).current;
  const clickScale = useRef(new Animated.Value(1)).current;
  const currentScale = useRef(1);

  const scale = Animated.multiply(Animated.multiply(baseScale, pinchScale), clickScale);

  const getBounds = (scaleValue = currentScale.current) => {
    const halfObject = (OBJECT_SIZE * scaleValue) / 2;

    return {
      maxX: Math.max(0, stageSize.width / 2 - halfObject),
      maxY: Math.max(0, stageSize.height / 2 - halfObject),
    };
  };

  const animateClick = () => {
    clickScale.stopAnimation();

    Animated.sequence([
      Animated.timing(clickScale, {
        toValue: 0.9,
        duration: 70,
        useNativeDriver: false,
      }),
      Animated.spring(clickScale, {
        toValue: 1,
        friction: 4,
        tension: 160,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const applyClampedPosition = (x, y, scaleValue = currentScale.current) => {
    const { maxX, maxY } = getBounds(scaleValue);

    const nextX = clamp(x, -maxX, maxX);
    const nextY = clamp(y, -maxY, maxY);

    pan.setValue({ x: nextX, y: nextY });
    lastPan.current = { x: nextX, y: nextY };
  };

  const onPanGestureEvent = (event) => {
    const { translationX, translationY } = event.nativeEvent;
    const { maxX, maxY } = getBounds();

    const nextX = clamp(lastPan.current.x + translationX, -maxX, maxX);
    const nextY = clamp(lastPan.current.y + translationY, -maxY, maxY);

    pan.setValue({ x: nextX, y: nextY });
  };

  const onPinchGestureEvent = (event) => {
    pinchScale.setValue(event.nativeEvent.scale);
  };

  const handleSingleTap = (event) => {
    if (event.nativeEvent.state === State.END) {
      animateClick();
      registerTap();
    }
  };

  const handleDoubleTap = (event) => {
    if (event.nativeEvent.state === State.END) {
      animateClick();
      registerDoubleTap();
    }
  };

  const handleLongPress = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      animateClick();
      registerLongPress();
    }
  };

  const handlePanStateChange = (event) => {
    const { oldState, state, translationX, translationY } = event.nativeEvent;

    if (oldState === State.ACTIVE || state === State.END) {
      const moved = Math.abs(translationX) > 3 || Math.abs(translationY) > 3;
      const { maxX, maxY } = getBounds();

      const nextX = clamp(lastPan.current.x + translationX, -maxX, maxX);
      const nextY = clamp(lastPan.current.y + translationY, -maxY, maxY);

      lastPan.current = { x: nextX, y: nextY };
      pan.setValue({ x: nextX, y: nextY });

      if (moved) {
        registerDrag();
      }
    }
  };

  const handleSwipeRight = (event) => {
    if (event.nativeEvent.state === State.END) {
      animateClick();
      registerSwipe('right');
    }
  };

  const handleSwipeLeft = (event) => {
    if (event.nativeEvent.state === State.END) {
      animateClick();
      registerSwipe('left');
    }
  };

  const handlePinchStateChange = (event) => {
    const { oldState, state, scale: gestureScale } = event.nativeEvent;

    if (oldState === State.ACTIVE || state === State.END) {
      const nextScale = clamp(currentScale.current * gestureScale, 0.75, 1.55);

      currentScale.current = nextScale;
      baseScale.setValue(nextScale);
      pinchScale.setValue(1);

      applyClampedPosition(lastPan.current.x, lastPan.current.y, nextScale);

      if (Math.abs(gestureScale - 1) > 0.05) {
        registerPinch();
      }
    }
  };

  return (
    <Stage
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout;
        setStageSize({ width, height });
      }}
    >
      <PinchGestureHandler
        onGestureEvent={onPinchGestureEvent}
        onHandlerStateChange={handlePinchStateChange}
      >
        <Animated.View collapsable={false}>
          <PanGestureHandler
            onGestureEvent={onPanGestureEvent}
            onHandlerStateChange={handlePanStateChange}
          >
            <Animated.View
              collapsable={false}
              style={{
                transform: [...pan.getTranslateTransform(), { scale }],
              }}
            >
              <FlingGestureHandler
                direction={Directions.RIGHT}
                onHandlerStateChange={handleSwipeRight}
              >
                <Animated.View collapsable={false}>
                  <FlingGestureHandler
                    direction={Directions.LEFT}
                    onHandlerStateChange={handleSwipeLeft}
                  >
                    <Animated.View collapsable={false}>
                      <LongPressGestureHandler
                        minDurationMs={3000}
                        onHandlerStateChange={handleLongPress}
                      >
                        <Animated.View collapsable={false}>
                          <TapGestureHandler
                            ref={doubleTapRef}
                            numberOfTaps={2}
                            onHandlerStateChange={handleDoubleTap}
                          >
                            <Animated.View collapsable={false}>
                              <TapGestureHandler
                                waitFor={doubleTapRef}
                                onHandlerStateChange={handleSingleTap}
                              >
                                <ClickerButton collapsable={false}>
                                  <ClickerEmoji>👆</ClickerEmoji>
                                  <ClickerText>TAP ME</ClickerText>
                                </ClickerButton>
                              </TapGestureHandler>
                            </Animated.View>
                          </TapGestureHandler>
                        </Animated.View>
                      </LongPressGestureHandler>
                    </Animated.View>
                  </FlingGestureHandler>
                </Animated.View>
              </FlingGestureHandler>
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </PinchGestureHandler>
    </Stage>
  );
}

const Stage = styled.View`
  height: 235px;
  width: 100%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ClickerButton = styled(Animated.View)`
  width: ${OBJECT_SIZE}px;
  height: ${OBJECT_SIZE}px;
  border-radius: 80px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.primary};
  border-width: 7px;
  border-color: ${(props) => props.theme.colors.surface};
  elevation: 8;
  shadow-color: #000000;
  shadow-opacity: 0.18;
  shadow-radius: 12px;
  shadow-offset: 0px 8px;
`;

const ClickerEmoji = styled.Text`
  font-size: 30px;
  margin-bottom: 8px;
`;

const ClickerText = styled.Text`
  color: #ffffff;
  font-size: 17px;
  font-weight: 800;
  letter-spacing: 1px;
`;