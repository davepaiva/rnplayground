import React, {ReactElement} from 'react';
import {ScrollView} from 'react-native-gesture-handler';

import Item from './Item';
import {COL, Positions, SIZE} from './Config';
import {StyleSheet, View} from 'react-native';

interface ListProps {
  children: ReactElement<{id: string}>[];
}

const List = ({children}: ListProps) => {
  const positions: Positions = Object.assign(
    {},
    ...children.map((child, index) => ({[child.props.id]: index})),
  );
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          height: Math.ceil(children.length / COL) * SIZE,
        }}
        showsVerticalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={16}>
        {children.map(child => {
          return (
            <>
              <Item
                key={child.props.id}
                id={child.props.id}
                positions={positions}>
                {child}
              </Item>
            </>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default List;
