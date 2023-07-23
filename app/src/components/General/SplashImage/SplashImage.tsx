import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, useWindowDimensions} from 'react-native';
import {getIsVertical} from '../../../constants/screen';
import imageNames from '../../../constants/imageNames';

const {
  splashVertical,
  splashVerticalWithouthHeader,
  splashHorizontal,
  splashHorizontalWithoutHeader,
} = imageNames;

type SplashImageProps = {
  includeHeader?: boolean;
};

function SplashImage({includeHeader}: SplashImageProps): JSX.Element {
  const {height, width} = useWindowDimensions();
  const isVertical = getIsVertical(width, height);

  const [splash, setSplash] = useState(splashVertical);

  useEffect(() => {
    if (includeHeader && isVertical) {
      setSplash(splashVertical);
    } else if (includeHeader && !isVertical) {
      setSplash(splashHorizontal);
    } else if (!includeHeader && !isVertical) {
      setSplash(splashHorizontalWithoutHeader);
    } else {
      setSplash(splashVerticalWithouthHeader);
    }
  }, [includeHeader, isVertical]);

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
          height: height,
        }}
        source={splash}
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
    zIndex: -10,
  },
});

export default SplashImage;
