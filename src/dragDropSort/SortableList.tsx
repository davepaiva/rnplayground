import React, {ReactElement, useRef} from 'react';
import {ScrollView} from 'react-native-gesture-handler';

import Item from './Item';
import {COL, Positions, SIZE} from './Config';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

interface ListProps {
  children: ReactElement<{id: string}>[];
}

const List = ({children}: ListProps) => {
  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useSharedValue<number>(0);
  const positions = useSharedValue<Positions>(
    Object.assign(
      {},
      ...children.map((child, index) => ({[child.props.id]: index})),
    ),
  );

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({contentOffset: {y}}) => {
      scrollY.value = y;
    },
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{
          height: Math.ceil(children.length / COL) * SIZE,
        }}
        showsVerticalScrollIndicator={false}
        bounces={false}
        onScroll={onScroll}
        scrollEventThrottle={16}>
        {children.map(child => {
          return (
            <>
              <Item
                scrollviewRef={scrollViewRef}
                scrollY={scrollY}
                key={child.props.id}
                id={child.props.id}
                positions={positions}>
                {child}
              </Item>
            </>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default List;
