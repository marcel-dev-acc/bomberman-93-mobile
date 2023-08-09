import React from 'react'
import {View, StyleSheet, Image, useWindowDimensions} from 'react-native'
import {getIsVertical} from '../../../constants/screen'
import imageNames from '../../../constants/imageNames'

function WinnerAnimation(): JSX.Element {
  const {height, width} = useWindowDimensions()
  const isVertical = getIsVertical(width, height)

  const imgStyle = isVertical
    ? {
        width: width,
      }
    : {
        height: height,
      }

  return (
    <View
      style={{
        ...styles.splashImageContainer,
        width: width,
        height: height,
        top: isVertical ? 0 : -20,
      }}>
      {isVertical &&
        Array.from({length: 18}, (_, k) => k).map(idx => (
          <View
            key={idx}
            style={styles.winnerAnimationBackgroundStaticContainer}>
            {Array.from({length: 43}, (_, k) => k).map(jdx => (
              <Image
                key={`${jdx}${idx}`}
                resizeMode="contain"
                style={{
                  ...styles.winnerAnimationBackgroundStatic,
                  width: 25,
                  height: 25,
                  top: jdx * 20 - 10,
                  left: -20 + idx * 25,
                }}
                source={imageNames.winnerGrassBackground}
              />
            ))}
          </View>
        ))}
      {!isVertical &&
        Array.from({length: 27}, (_, k) => k).map(idx => (
          <View
            key={idx}
            style={styles.winnerAnimationBackgroundStaticContainer}>
            {Array.from({length: 14}, (_, k) => k).map(jdx => (
              <Image
                key={`${jdx}${idx}`}
                resizeMode="contain"
                style={{
                  ...styles.winnerAnimationBackgroundStatic,
                  width: 35,
                  height: 35,
                  top: jdx * 30,
                  left: -20 + idx * 35,
                }}
                source={imageNames.winnerGrassBackground}
              />
            ))}
          </View>
        ))}
      <Image
        resizeMode="contain"
        style={imgStyle}
        source={
          isVertical ? imageNames.winnerLoopRed : imageNames.winnerLoopRed
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  splashImageContainer: {
    position: 'absolute',
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  winnerAnimationBackgroundStaticContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  winnerAnimationBackgroundStatic: {
    position: 'absolute',
  },
  winnerAnimation: {},
})

export default WinnerAnimation
