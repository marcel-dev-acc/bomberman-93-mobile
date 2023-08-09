import React, {useEffect} from 'react'
import {
  StyleSheet,
  View,
  GestureResponderEvent,
  useWindowDimensions,
  TouchableHighlight,
  Image,
} from 'react-native'
import {useDispatch} from 'react-redux'
import {Socket} from 'socket.io-client'

import {GameText, SplashImage, WinnerAnimation} from '../../components/General'
import type {Session} from '../../types/session'
import {ScreenType, changeScreen} from '../../state/screens/reducer'
import imageNames from '../../constants/imageNames'
import {getIsVertical} from '../../constants/screen'

type WinnerScreenProps = {
  socketRef: React.MutableRefObject<Socket | undefined>
  sessionRef: React.MutableRefObject<Session>
}

function WinnerScreen({socketRef, sessionRef}: WinnerScreenProps): JSX.Element {
  const {height, width} = useWindowDimensions()
  const isVertical = getIsVertical(width, height)

  const dispatch = useDispatch()

  const handleGameReset = (pressEvent: GestureResponderEvent) => {
    if (pressEvent.nativeEvent.target === undefined) {
      return
    }
    sessionRef.current = {
      ...sessionRef.current,
      winner: undefined,
    } as Session
    dispatch(changeScreen(ScreenType.welcome))
  }

  useEffect(() => {
    socketRef.current = undefined
  }, [socketRef])

  return (
    <View
      style={{
        ...styles.winnerContainer,
        justifyContent: sessionRef.current.winner
          ? isVertical
            ? 'space-between'
            : 'flex-end'
          : 'center',
        width: width,
      }}>
      {!sessionRef.current.winner && isVertical && (
        <SplashImage includeHeader />
      )}
      {!sessionRef.current.winner && !isVertical && <SplashImage />}
      {sessionRef.current.winner && <WinnerAnimation />}
      {sessionRef.current.winner && (
        <View
          style={{
            ...styles.winnerTextContainer,
            marginTop: isVertical ? height * 0.1 : 0,
          }}>
          <Image
            source={imageNames.theWinnerIsText}
            resizeMode="contain"
            style={styles.winnerTextImg}
          />
          <GameText text={sessionRef.current.winner.name} charSize={50} />
        </View>
      )}
      <View
        style={{
          ...styles.winnerButtonContainer,
          marginBottom: sessionRef.current.winner
            ? isVertical
              ? height * 0.15
              : 10
            : 0,
        }}>
        <TouchableHighlight
          onPress={handleGameReset}
          style={styles.winnerButton}
          underlayColor="rgba(255,255,255,0.25)">
          <Image
            source={imageNames.playAgainText}
            resizeMode="contain"
            style={styles.winnerTextImg}
          />
        </TouchableHighlight>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  winnerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  winnerTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  winnerButtonContainer: {
    marginVertical: 5,
  },
  winnerButton: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  winnerTextImg: {
    width: 200,
    height: 45,
  },
})

export default WinnerScreen
