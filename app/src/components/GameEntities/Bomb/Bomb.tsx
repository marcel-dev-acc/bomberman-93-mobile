import React, {memo} from 'react'
import {StyleSheet, View, Image} from 'react-native'

import colors from '../../../constants/colors'
import {entitySizes} from '../../../constants/entitySizes'
import {useSelector} from 'react-redux'
import imageNames from '../../../constants/imageNames'

type BombProps = {
  top: number
  left: number
}

function Bomb(props: BombProps): JSX.Element {
  const graphicsEnabled: boolean = useSelector(
    (state: any) => state.screens.graphicsEnabled,
  )

  const withoutGraphicsContainerStyle = graphicsEnabled
    ? {}
    : {
        backgroundColor: colors.BLACK,
        borderWidth: 1,
        borderColor: colors.WHITE,
      }

  return graphicsEnabled ? (
    <Image
      style={{
        ...styles.brickContainer,
        top: props.top,
        left: props.left,
      }}
      source={imageNames.bomb}
    />
  ) : (
    <View
      style={{
        ...styles.brickContainer,
        ...withoutGraphicsContainerStyle,
        top: props.top,
        left: props.left,
      }}
    />
  )
}

const styles = StyleSheet.create({
  brickContainer: {
    position: 'absolute',
    width: entitySizes.square.width,
    height: entitySizes.square.height,
  },
})

export default memo(Bomb)
