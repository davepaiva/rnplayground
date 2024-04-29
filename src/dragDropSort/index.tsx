import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import {MARGIN, SIZE} from './Config';
import Tile from './Tile';
import SortableList from './SortableList';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const tiles = [
  {
    id: 'google',
    uri: 'https://google.com',
  },

  {
    id: 'expo',
    uri: 'https://expo.io',
  },
  {
    id: 'facebook',
    uri: 'https://facebook.com',
  },
  {
    id: 'reanimated',
    uri: 'https://docs.swmansion.com/react-native-reanimated/',
  },
  {
    id: 'github',
    uri: 'https://github.com',
  },
  {
    id: 'rnnavigation',
    uri: 'https://reactnavigation.org/',
  },
  {
    id: 'youtube',
    uri: 'https://youtube.com',
  },
  {
    id: 'twitter',
    uri: 'https://twitter.com',
  },
  {
    id: 'bluelearn',
    uri: 'https://bluelearn.in',
  },
];

const Chrome = () => {
  return (
    <View style={styles.container}>
      <SortableList>
        {tiles.map(tile => (
          <Tile
            onLongPress={() => true}
            key={tile.id}
            id={tile.id}
            uri={tile.uri}
          />
        ))}
      </SortableList>
    </View>
  );
};

const styles = StyleSheet.create({
  sav: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: MARGIN,
  },
  container: {
    flex: 1,
  },
});

export default Chrome;
