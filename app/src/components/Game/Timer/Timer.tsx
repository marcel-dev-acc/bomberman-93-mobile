import React, {useState, useEffect, useRef} from 'react'
import {StyleSheet, View, Text} from 'react-native'

import {Icon, Icons} from '../../General'
import colors from '../../../constants/colors'
import {useSelector} from 'react-redux'
import {GameEventProps} from '../../../types/serverTypes'
import {DEBUG} from '../../../constants/app'

type TimerProps = {
  baseTimer: number
  dispatcher: (event: GameEventProps) => void
}

function Timer({baseTimer, dispatcher}: TimerProps): JSX.Element {
  const debuggerEnabled: boolean = useSelector(
    (state: any) => state.screens.debuggerEnabled,
  )

  const [timerInner, setTimerInner] = useState(baseTimer)
  const timer = useRef(baseTimer)

  useEffect(() => {
    if (!DEBUG && !debuggerEnabled) {
      setTimeout(() => {
        if (timer.current > -1) {
          setTimerInner(timerInner - 1)
          timer.current = timerInner - 1
        } else {
          // Timer finished
          dispatcher({type: 'time-over'})
        }
      }, 1000)
    }
  }, [debuggerEnabled, timerInner, dispatcher])

  return (
    <View style={styles.timerContainer}>
      <Icon name={Icons.timer} color={colors.WHITE} size={30} />
      <View style={{marginLeft: 0, marginRight: 20}}>
        <Text style={styles.timerText}>
          {`${Math.floor(timer.current / 60)}:${
            timer.current - Math.floor(timer.current / 60) * 60 > 9
              ? timer.current - Math.floor(timer.current / 60) * 60
              : `0${timer.current - Math.floor(timer.current / 60) * 60}`
          }`}
        </Text>
        {/* <GameText
          text={`${
            Math.floor(timer.current / 60)
          }:${
            timer.current - Math.floor(timer.current / 60) * 60 > 9 ?
              timer.current - Math.floor(timer.current / 60) * 60 :
              `0${timer.current - Math.floor(timer.current / 60) * 60}`
          }`}
          charSize={30}
        /> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  timerContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  timerText: {
    color: colors.WHITE,
    fontSize: 20,
  },
})

export default Timer
