import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Icon, Icons } from '../../General';

import colors from '../../../constants/colors';


type BombsCountProps = {
  bombsCount: number;
};

function BombsCount({
  bombsCount,
}: BombsCountProps): JSX.Element {

  let bombsArray: number[] = [];
  for (let i = 0; i < bombsCount; i++) {
    bombsArray.push(i + 1);
  }

  return (
    <View style={styles.bombsAvailableContainer}>
      {bombsArray.map(bombNumber => (
        <Icon
          key={bombNumber}
          name={Icons.bomb}
          color={colors.WHITE}
          size={30}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bombsAvailableContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 80,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BombsCount;
