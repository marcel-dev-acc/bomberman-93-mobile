import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import colors from '../../../constants/colors';
import { entitySizes } from '../../../constants/entitySizes';

interface WallProps {
  left: number;
  top: number;
};

function Wall(props: WallProps): JSX.Element {

  return (
    <View
      style={{
        ...styles.wallContainer,
        left: props.left,
        top: props.top,
      }}
    ></View>
  );
}

const styles = StyleSheet.create({
  wallContainer: {
    position: 'absolute',
    width: entitySizes.square.width,
    height: entitySizes.square.height,
    backgroundColor: colors.GREY,
    borderWidth: 1,
    borderColor: colors.BLACK
  },
});

export default Wall;
