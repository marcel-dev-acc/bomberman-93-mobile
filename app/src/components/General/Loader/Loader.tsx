import React from 'react';
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import imageNames from '../../../constants/imageNames';

function sin(deg: number) {
  return Math.sin((deg * Math.PI) / 180.0);
}

function cos(deg: number) {
  return Math.cos((deg * Math.PI) / 180.0);
}

function AnimatedLoader(): JSX.Element {

  const numDots = 8; // Number of dots in spinner
  const angleIncrement = 360 / numDots;
  const radius = 50;
  const dots = [ ...Array(numDots).keys() ].map( i => i + 1);

  return (
    <View>
      {dots.map((i, idx) => {
        return (
          <Image
            key={idx}
            source={imageNames.symbolFullStopText}
            resizeMode='contain'
            style={{
              position: 'absolute',
              top: cos((i - 1) * angleIncrement) * radius * -1 + 55,
              left: sin((i - 1) * angleIncrement) * radius + 57,
              height: 40,
              transform: [{rotate: `${(i - 1) * angleIncrement}deg`}],
            }}
          />
        );
      }
      )}
    </View>
  );
}

function Loader(): JSX.Element {

  const { height, width } = useWindowDimensions();

  // Set the animation
  const spinValue = new Animated.Value(0);
  Animated.loop(
    Animated.timing(
        spinValue,
      {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }
    )
  ).start();
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View
      style={{
        ...styles.loaderContainer,
        width: width,
        height: height,
      }}
    >
      <Animated.View
        style={{
          transform: [{ rotate: spin }],
          // borderWidth: 1,
          // borderColor: 'red',
          width: 150,
          height: 150,
        }}
      >
        <AnimatedLoader />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    zIndex: 999,
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
});

export default Loader;
