import React, {useState, useEffect} from 'react'
import {StyleSheet, Text, View} from 'react-native'

import colors from '../../../constants/colors'

export enum ServerStatus {
  localToken = 'token',
  unregistered = 'unregistered',
  connected = 'connected',
  disconnected = 'disconnected',
  notFound = 'not found',
}

type ServerConnectionStatusProps = {
  status: ServerStatus
}

function ServerConnectionStatus({
  status,
}: ServerConnectionStatusProps): JSX.Element {
  let color = colors.GREY
  let textColor = colors.BLACK
  switch (status) {
    case ServerStatus.connected:
      color = colors.FOREST_GREEN
      textColor = colors.WHITE
      break
    case ServerStatus.disconnected:
      color = colors.GREY
      break
    case ServerStatus.notFound:
      color = colors.DARK_ORANGE
      break
    case ServerStatus.unregistered:
      color = colors.BLACK
      textColor = colors.WHITE
      break
  }

  const [display, setDisplay] = useState(true)

  useEffect(() => {
    if (status === ServerStatus.connected) {
      setTimeout(() => {
        setDisplay(false)
      }, 10000)
    }
  })

  return display ? (
    <View style={styles.serverConnectionStatusContainer}>
      <View
        style={{
          ...styles.serverConnectionStatusTextContainer,
          backgroundColor: color,
        }}>
        <Text
          style={{
            ...styles.serverConnectionStatusText,
            color: textColor,
          }}>
          {status}
        </Text>
      </View>
    </View>
  ) : (
    <></>
  )
}

const bannerWidth = 100

const styles = StyleSheet.create({
  serverConnectionStatusContainer: {
    position: 'absolute',
    bottom: 19,
    right: -21,
    justifyContent: 'center',
    alignItems: 'center',
    width: bannerWidth,
    zIndex: 100,
    transform: [{rotate: '-45deg'}],
    backgroundColor: 'rgba(0,0,0,0.25)',
    paddingVertical: 2,
  },
  serverConnectionStatusTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: bannerWidth,
  },
  serverConnectionStatusText: {
    fontSize: 11.5,
  },
})

export default ServerConnectionStatus
