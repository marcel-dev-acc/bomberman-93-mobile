import React from 'react';
import {StyleSheet, View} from 'react-native';

import colors from '../../../constants/colors';
import {entitySizes} from '../../../constants/entitySizes';

type PillarProps = {
  top: number;
  left: number;
};

function Pillar(props: any): JSX.Element {
  return (
    <View
      style={{
        ...styles.wallContainer,
        left: props.left,
        top: props.top,
      }}
    />
  );
}

const styles = StyleSheet.create({
  wallContainer: {
    position: 'absolute',
    width: entitySizes.square.width,
    height: entitySizes.square.height,
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    borderColor: colors.BLACK,
    borderRadius: 3,
  },
});

export default Pillar;
