import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

import colors from '../../../constants/colors';
import {entitySizes} from '../../../constants/entitySizes';
import {useSelector} from 'react-redux';
import {FireType} from '../../../constants/types';
import {getSpriteCoordinates} from './animation';
import imageNames from '../../../constants/imageNames';

type FireProps = {
  top: number;
  left: number;
  type: FireType;
};

function Fire(props: FireProps): JSX.Element {
  const graphicsEnabled: boolean = useSelector(
    (state: any) => state.screens.graphicsEnabled,
  );

  const withoutGraphicsContainerStyle = graphicsEnabled
    ? {}
    : {
        backgroundColor: colors.DARK_ORANGE,
        borderWidth: 1,
        borderColor: colors.RED,
      };

  const {
    top: spriteTop,
    left: spriteLeft,
    transform: spriteTransform,
  } = getSpriteCoordinates(props.type);

  return graphicsEnabled ? (
    <View
      style={{
        top: props.top,
        left: props.left,
        // width and height of image you want display
        ...styles.animatedFireContainer,
      }}>
      <Image
        style={{
          ...styles.fireContainer,
          // position of image you want display
          top: spriteTop,
          left: spriteLeft,
          transform: spriteTransform,
        }}
        source={imageNames.fireEffectSprite}
        resizeMode="contain"
      />
    </View>
  ) : (
    <View
      style={{
        ...styles.fireContainer,
        ...withoutGraphicsContainerStyle,
        left: props.left,
        top: props.top,
      }}
    />
  );
}

const styles = StyleSheet.create({
  fireContainer: {
    position: 'absolute',
    width: 255,
    height: 88,
  },
  animatedFireContainer: {
    width: entitySizes.square.width,
    height: entitySizes.square.height,
    overflow: 'hidden',
    position: 'absolute',
  },
});

export default Fire;
