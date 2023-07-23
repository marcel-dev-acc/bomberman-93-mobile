import React from 'react'
import {ScrollView, View, useWindowDimensions} from 'react-native'
import sharedStyles from '../SharedStyles'
import {Button, GameText} from '../../../components/General'
import {AndroidGamepadEvent} from '../../../native/interface'
import {getIsVertical} from '../../../constants/screen'

type ScrollViewKeysProps = {
  displayedEvents: AndroidGamepadEvent[]
  setActiveEvent: (event: AndroidGamepadEvent) => void
  setShowKeyToProfileModal: (showKeyToProfileModal: boolean) => void
}

function ScrollViewKeys({
  displayedEvents,
  setActiveEvent,
  setShowKeyToProfileModal,
}: ScrollViewKeysProps): JSX.Element {
  const {height, width} = useWindowDimensions()
  const isVertical = getIsVertical(width, height)

  return (
    <ScrollView style={sharedStyles.remoteControlsScrollContainer}>
      {displayedEvents.map((event, idx) => (
        <View key={idx} style={sharedStyles.remoteControlsScrollViewItem}>
          {/* <Text style={sharedStyles.remoteControlsScrollViewItemText}>
            {`Device ID ${event.deviceId}`}
          </Text> */}
          <GameText
            text={`Device ID ${event.deviceId}`}
            charSize={isVertical ? 12.5 : 20}
          />
          <Button
            text={`Log KeyCode ${event.keyCode}`}
            onPress={pressEvent => {
              if (pressEvent.nativeEvent.target === undefined) {
                return
              }
              setActiveEvent(event)
              setShowKeyToProfileModal(true)
            }}
            customButtonStyle={{
              ...sharedStyles.remoteControlsScrollViewItemButton,
              width: width > 500 ? 300 : 190,
            }}
          />
        </View>
      ))}
    </ScrollView>
  )
}

export default ScrollViewKeys
