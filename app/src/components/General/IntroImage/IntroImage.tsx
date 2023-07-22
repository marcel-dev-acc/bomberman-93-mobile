import React from 'react';
import {View, StyleSheet, Image, useWindowDimensions} from 'react-native';
import {getIsVertical} from '../../../constants/screen';
import imageNames from '../../../constants/imageNames';
import colors from '../../../constants/colors';

function IntroImage(): JSX.Element {
  const {height, width} = useWindowDimensions();
  const isVertical = getIsVertical(width, height);

  return (
    <View
      style={{
        ...styles.splashImageContainer,
        width: width,
        height: height,
      }}>
      <Image
        resizeMode="contain"
        style={{
          height: isVertical ? width : height,
        }}
        source={imageNames.introImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  splashImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    backgroundColor: colors.BLACK,
  },
});

export default IntroImage;
