import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Icon, Icons } from '../../General';

import colors from '../../../constants/colors';

type FireCountProps = {
  fireCount: number;
};

function FireCount({
  fireCount,
}: FireCountProps): JSX.Element {

  let fireArray: number[] = [];
  for (let i = 0; i < fireCount; i++) {
    fireArray.push(i + 1);
  }

  return (
    <View style={styles.fireAvailableContainer}>
      {fireArray.map(fireNumber => (
        <Icon
          key={fireNumber}
          name={Icons.fire}
          color={colors.WHITE}
          size={30}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  fireAvailableContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 45,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FireCount;
