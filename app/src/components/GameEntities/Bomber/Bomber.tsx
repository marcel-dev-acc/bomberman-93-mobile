import React from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';

import { entitySizes } from '../../../constants/entitySizes';
import { useSelector } from 'react-redux';
import { BomberProps } from './types';
import { getAnimation, getSpriteCoordinates } from './animation';
import { Direction } from '../../../constants/types';
import imageNames from '../../../constants/imageNames';

const {
  bomberWhiteSprite,
  bomberWhiteInvertedSprite,
  bomberBlackSprite,
  bomberBlackInvertedSprite,
  bomberBlueSprite,
  bomberBlueInvertedSprite,
  bomberRedSprite,
  bomberRedInvertedSprite,
  bomberGreenSprite,
  bomberGreenInvertedSprite,
} = imageNames;

function Bomber(props: BomberProps): JSX.Element {

  const graphicsEnabled: boolean = useSelector((state: any) => state.screens.graphicsEnabled);

  // Calculate what movement animation should be shown
  const { top: spriteTop, left: spriteLeft } = getSpriteCoordinates(
    getAnimation(
      {
        top: props.top,
        left: props.left,
      },
      props.direction as Direction,
      props.previous,
      props.isMovementChangeable,
      props.isLeft,
    )
  );

  // Set the bomber sprite
  let bomberSprite = bomberWhiteSprite;
  switch (props.number) {
    case 1:
      bomberSprite = props.chaosType && props.isMovementChangeable ?
        bomberWhiteInvertedSprite : bomberWhiteSprite;
      break;
    case 2:
      bomberSprite = props.chaosType && props.isMovementChangeable ?
        bomberRedInvertedSprite : bomberRedSprite;
      break;
    case 3:
      bomberSprite = props.chaosType && props.isMovementChangeable ?
        bomberGreenInvertedSprite : bomberGreenSprite;
      break;
    case 4:
      bomberSprite = props.chaosType && props.isMovementChangeable ?
        bomberBlueInvertedSprite : bomberBlueSprite;
      break;
    case 5:
      bomberSprite = props.chaosType && props.isMovementChangeable ?
        bomberBlackInvertedSprite : bomberBlackSprite;
      break;
  }

  // Return the bomber by number
  return !graphicsEnabled ? (
    <View
      style={{
        ...styles.bomberContainer,
        width: entitySizes.square.width,
        height: entitySizes.square.height,
        top: props.top,
        left: props.left,
        backgroundColor: props.color,
      }}
      testID={`bomber${props.number}`}
    >
    </View>
  ) : (
    <View
      style={{
        top: props.top,
        left: props.left,
        // width and height of image you want display
        ...styles.animatedBomberContainer,
      }}
      testID={`bomber${props.number}`}
    >
        <Image
          style={{
            ...styles.bomberContainer,
            // position of image you want display
            top: spriteTop,
            left: spriteLeft,
          }}
          source={bomberSprite}
          resizeMode='contain'
        />
    </View>
  );
}

const styles = StyleSheet.create({
  bomberContainer: {
    position: 'absolute',
    width: 380,
    height: 120,
  },
  animatedBomberContainer: {
    width: entitySizes.square.width,
    height: entitySizes.square.height,
    overflow: 'hidden',
    position: 'absolute',
  },
});

export default Bomber;
