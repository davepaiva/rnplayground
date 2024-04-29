import React, {ReactNode} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
  COL,
  Positions,
  SIZE,
  animationConfig,
  getOrder,
  getPosition,
} from './Config';
import Animated, {
  SharedValue,
  setGestureState,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

interface ItemProps {
  children: ReactNode;
  id: string;
  positions: SharedValue<Positions>;
}

const Item = ({children, positions, id}: ItemProps) => {
  const inset = useSafeAreaInsets();
  const isAnimationActive = useSharedValue(false);
  // const containerHeight =
  //   Dimensions.get('window').height - inset.top - inset.bottom;
  // const contentHeight = (Object.keys(positions.value).length / COL) * SIZE;
  const p1 = getPosition(positions.value[id]);
  const position = getPosition(getOrder(p1.x, p1.y));
  const translateX = useSharedValue(position.x);
  const translateY = useSharedValue(position.y);

  useAnimatedReaction(
    () => positions.value[id],
    newOrder => {
      const newPosition = getPosition(newOrder);
      translateX.value = withTiming(newPosition.x, animationConfig);
      translateY.value = withTiming(newPosition.y, animationConfig);
    },
  );

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      isAnimationActive.value = true;
      ctx.x = translateX.value;
      ctx.y = translateY.value;
    },
    onActive: ({translationX, translationY}, ctx) => {
      translateX.value = (ctx.x as number) + translationX;
      translateY.value = (ctx.y as number) + translationY;
      const oldOrder = positions.value[id];
      const newOrder = getOrder(translateX.value, translateY.value);
      if (newOrder !== oldOrder) {
        const idToSwap = Object.keys(positions.value).find(
          key => positions.value[key] === newOrder,
        );
        if (idToSwap) {
          const newPositions = JSON.parse(JSON.stringify(positions.value));
          newPositions[id] = newOrder;
          newPositions[idToSwap] = oldOrder;
          positions.value = newPositions;
        }
      }
    },
    onEnd: () => {
      isAnimationActive.value = false;
      const destination = getPosition(positions.value[id]);
      translateX.value = withTiming(destination.x, animationConfig);
      translateY.value = withTiming(destination.y, animationConfig);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const zIndex = isAnimationActive.value ? 100 : 0;
    const scale = isAnimationActive.value ? 1.1 : 1;
    return {
      zIndex,
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
        {scale},
      ],
    };
  });
  return (
    <Animated.View style={[styles.childContainer, animatedStyle]}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={StyleSheet.absoluteFill}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  childContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SIZE,
    height: SIZE,
  },
});

export default Item;
