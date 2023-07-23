import React, {useState} from 'react'
import {StyleSheet, TouchableHighlight, View, Text} from 'react-native'
import {Icon, Icons} from '../../General'

import colors from '../../../constants/colors'
import {useDispatch} from 'react-redux'
import {ScreenType, changeScreen} from '../../../state/screens/reducer'

type GameOptionsMenuProps = {
  setGameRunning: (gameRunning: boolean) => void
  handleReset: () => void
}

const modalWidth = 200

function GameOptionsMenu({
  setGameRunning,
  handleReset,
}: GameOptionsMenuProps): JSX.Element {
  const dispatch = useDispatch()

  const [showModal, setShowModal] = useState(false)

  return (
    <View style={styles.gameOptionsMenuContainer}>
      <TouchableHighlight
        onPress={pressEvent => {
          if (pressEvent.nativeEvent.target === undefined) {
            return
          }
          setGameRunning(false)
          setShowModal(true)
        }}
        underlayColor="rgba(255,255,255,0.25)">
        <Icon name={Icons.dotsVertical} size={30} color={colors.WHITE} />
      </TouchableHighlight>
      {showModal && (
        <View style={styles.gameOptionsMenuModal}>
          <View
            style={{
              alignItems: 'flex-end',
              width: modalWidth - 20,
            }}>
            <TouchableHighlight
              onPress={pressEvent => {
                if (pressEvent.nativeEvent.target === undefined) {
                  return
                }
                setShowModal(false)
              }}
              underlayColor="rgba(0,0,0,0.1)">
              <Icon name={Icons.close} size={30} color={colors.BLACK} />
            </TouchableHighlight>
          </View>
          <View
            style={{
              alignItems: 'flex-start',
              width: modalWidth - 20,
            }}>
            <TouchableHighlight
              onPress={pressEvent => {
                if (pressEvent.nativeEvent.target === undefined) {
                  return
                }
                setShowModal(false)
                handleReset()
                setGameRunning(false)
                dispatch(changeScreen(ScreenType.welcome))
              }}
              underlayColor="rgba(0,0,0,0.1)">
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Icon name={Icons.exitRun} size={30} color={colors.BLACK} />
                <Text style={styles.gameOptionsMenuText}>Quit</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  gameOptionsMenuContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOptionsMenuModal: {
    position: 'absolute',
    top: 5,
    right: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: modalWidth,
    borderRadius: 5,
    backgroundColor: colors.WHITE,
    paddingVertical: 10,
  },
  gameOptionsMenuText: {
    color: colors.BLACK,
    fontSize: 20,
    marginLeft: 10,
  },
})

export default GameOptionsMenu
