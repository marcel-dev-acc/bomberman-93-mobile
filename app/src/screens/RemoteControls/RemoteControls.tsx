import React, {useCallback, useEffect, useRef, useState} from 'react'
import {
  DeviceEventEmitter,
  Platform,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Switch,
  Image,
} from 'react-native'

import {Direction} from '../../types/serverTypes'
import colors from '../../constants/colors'
import {BackButton, SplashImage} from '../../components/General'
import {
  isGamepadModuleAvailableOnAndroid,
  AndroidGamepadEvent,
} from '../../native/interface'
import {useDispatch} from 'react-redux'
import {ScreenType, changeScreen} from '../../state/screens/reducer'
import imageNames from '../../constants/imageNames'
import {StorageKeys, fetchData, storeData} from '../../utils/localStorage'
import {Socket} from 'socket.io-client'
import type {Session} from '../../types/session'
import {AndroidGamepadProfile} from './types'
import eventCatcher from './eventCatcher'
import ScrollViewProfiles from './components/ScrollViewProfiles'
import ScrollViewDevices from './components/ScrollViewDevices'
import ScrollViewKeys from './components/ScrollViewKeys'
import DeviceToProfileModal from './components/DeviceToProfileModal'
import KeyToProfileModal from './components/KeyToProfileModal'
import sharedStyles from './SharedStyles'
import TabNavigation, {Tabs} from './components/TabNavigation'
import {addError} from '../../state/errors/reducer'
import {getIsVertical} from '../../constants/screen'

type RemoteControlsScreenProps = {
  socketRef: React.MutableRefObject<Socket>
  sessionRef: React.MutableRefObject<Session>
}

function RemoteControlsScreen({
  socketRef,
  sessionRef,
}: RemoteControlsScreenProps): JSX.Element {
  const {height, width} = useWindowDimensions()
  const isVertical = getIsVertical(width, height)

  const dispatch = useDispatch()

  const handleIsGamepadModuleAvailable = async () => {
    if (Platform.OS === 'android') {
      const gamepadIsAvailable: boolean =
        await isGamepadModuleAvailableOnAndroid()
      setGamepadModuleIsAvailable(gamepadIsAvailable)
    }
  }

  const handleFetchProfiles = async () => {
    const profiles = await fetchData(StorageKeys.profiles)
    if (profiles) {
      setDisplayProfiles(JSON.parse(profiles))
    }
  }

  const handleKeySettingForProfile = (directionOrBomb: Direction | 'bomb') => {
    if (!activeEvent) {
      dispatch(
        addError({
          title: 'Warning',
          value: 'No active event set, please try again',
        }),
      )
      return
    }
    const matchingProfiles = displayProfiles.filter(
      profile => profile.deviceId === activeEvent.deviceId,
    )
    if (matchingProfiles.length === 0) {
      dispatch(
        addError({
          title: 'Warning',
          value: 'No matching profiles',
        }),
      )
      return
    }
    let activeProfile = matchingProfiles[0]
    switch (directionOrBomb) {
      case Direction.up:
        activeProfile.upKey = activeEvent.keyCode
        break
      case Direction.down:
        activeProfile.downKey = activeEvent.keyCode
        break
      case Direction.left:
        activeProfile.leftKey = activeEvent.keyCode
        break
      case Direction.right:
        activeProfile.rightKey = activeEvent.keyCode
        break
      case 'bomb':
        activeProfile.bombKey = activeEvent.keyCode
        break
    }
    const currentProfiles = displayProfiles
    setDisplayProfiles([
      ...currentProfiles.filter(
        profile => profile.deviceId !== activeEvent.deviceId,
      ),
      activeProfile,
    ])
    storeData(
      StorageKeys.profiles,
      JSON.stringify([
        ...currentProfiles.filter(
          profile => profile.deviceId !== activeEvent.deviceId,
        ),
        activeProfile,
      ]),
    )
    setActiveEvent(undefined)
    setActiveProfileName('')
    setShowKeyToProfileModal(false)
    setActiveTab(Tabs.profiles)
  }

  const [showDeviceToProfileModal, setShowDeviceToProfileModal] =
    useState(false)
  const [showKeyToProfileModal, setShowKeyToProfileModal] = useState(false)
  const [gamepadModuleIsAvailable, setGamepadModuleIsAvailable] =
    useState(false)
  const [gamepadIsEnabled, setGamepadIsEnabled] = useState(true)
  const [activeTab, setActiveTab] = useState(Tabs.profiles)
  const [activeEvent, setActiveEvent] = useState(
    undefined as undefined | AndroidGamepadEvent,
  )
  const [activeProfileName, setActiveProfileName] = useState('')
  const [displayProfiles, setDisplayProfiles] = useState(
    [] as AndroidGamepadProfile[],
  )
  const [displayedEvents, setDisplayedEvents] = useState(
    [] as AndroidGamepadEvent[],
  )
  const [displayDeviceIds, setDisplayDevicesIds] = useState([] as number[])

  const activeGamepadProfileRef = useRef(
    undefined as AndroidGamepadProfile | undefined,
  )
  const displayEventsRef = useRef(displayedEvents)

  const buttonReleased = useRef(false)
  const buttonLooper = useCallback(
    (
      event: AndroidGamepadEvent,
      session: Session,
      _socketRef: React.MutableRefObject<Socket>,
      activeGamepadProfile: AndroidGamepadProfile,
    ) => {
      setTimeout(() => {
        eventCatcher(event, session, _socketRef, activeGamepadProfile)
        // Check if loop needs to re-initialised
        if (!buttonReleased) {
          buttonLooper(event, session, _socketRef, activeGamepadProfile)
        }
      }, 500)
    },
    [],
  )

  const androidEventHandler = useCallback(() => {
    DeviceEventEmitter.addListener(
      'onGamepadKeyEvent',
      (event: AndroidGamepadEvent) => {
        try {
          // Set the events to display
          const currentDisplayEvents = [...displayEventsRef.current, event]
          displayEventsRef.current = currentDisplayEvents
          setDisplayedEvents(currentDisplayEvents)

          // Define a unique list of device id's to show
          if (!displayDeviceIds.some(id => id === event.deviceId)) {
            setDisplayDevicesIds([...displayDeviceIds, event.deviceId])
          }

          // Emit the event to the game server
          if (event.deviceId === activeGamepadProfileRef.current?.deviceId) {
            buttonReleased.current = event.action === 1
            buttonLooper(
              event,
              sessionRef.current,
              socketRef,
              activeGamepadProfileRef.current,
            )
          }
        } catch (err: any) {}
      },
    )
  }, [buttonLooper, displayDeviceIds, sessionRef, socketRef])

  useEffect(() => {
    if (displayProfiles.length === 0) {
      handleFetchProfiles()
    }
    // Check if the gamepad module is available
    if (!gamepadModuleIsAvailable) {
      handleIsGamepadModuleAvailable()
    }
    // Add listener for events
    if (gamepadIsEnabled && gamepadModuleIsAvailable) {
      if (Platform.OS === 'android') {
        androidEventHandler()
      }
    }
  }, [
    displayProfiles.length,
    gamepadModuleIsAvailable,
    gamepadIsEnabled,
    androidEventHandler,
  ])

  return (
    <View
      style={{
        ...styles.remoteControlsContainer,
        width: width,
      }}>
      <SplashImage />
      <BackButton
        onPress={pressEvent => {
          if (pressEvent.nativeEvent.target === undefined) {
            return
          }
          dispatch(changeScreen(ScreenType.settings))
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 15,
          right: 5,
        }}>
        <View style={sharedStyles.remoteControlsEnableControls}>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={gamepadIsEnabled ? colors.BLUE : colors.WHITE}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setGamepadIsEnabled}
            value={gamepadIsEnabled}
          />
          <Image
            source={imageNames.enableGamepadsText}
            resizeMode="contain"
            style={{
              width: 180,
              height: 25,
              marginBottom: -2.5,
            }}
          />
        </View>
      </View>
      <View
        style={{
          ...styles.remoteControlsHeaderContainer,
          marginTop: isVertical ? 60 : 30,
        }}>
        <Image
          source={imageNames.controlsSettingsText}
          resizeMode="contain"
          style={{
            width: 280,
            height: 40,
          }}
        />
      </View>
      <View
        style={{
          ...sharedStyles.remoteControlsTextContainer,
          marginBottom: 10,
        }}>
        <Text style={sharedStyles.remoteControlsText}>
          {!gamepadIsEnabled
            ? 'Gamepad disabled'
            : gamepadModuleIsAvailable
            ? 'Gamepad module is available'
            : 'Could not find the gamepad module'}
        </Text>
      </View>
      <TabNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setDisplayDevicesIds={setDisplayDevicesIds}
        setDisplayedEvents={setDisplayedEvents}
      />
      {activeTab === Tabs.profiles && (
        <ScrollViewProfiles
          displayedEvents={displayedEvents}
          displayProfiles={displayProfiles}
          setDisplayProfiles={setDisplayProfiles}
          activeGamepadProfileRef={activeGamepadProfileRef}
        />
      )}
      {Platform.OS === 'android' && activeTab === Tabs.devices && (
        <ScrollViewDevices
          displayDeviceIds={displayDeviceIds}
          displayedEvents={displayedEvents}
          displayProfiles={displayProfiles}
          setActiveEvent={setActiveEvent}
          setShowDeviceToProfileModal={setShowDeviceToProfileModal}
        />
      )}
      {Platform.OS === 'android' && activeTab === Tabs.keys && (
        <ScrollViewKeys
          displayedEvents={displayedEvents}
          setActiveEvent={setActiveEvent}
          setShowKeyToProfileModal={setShowKeyToProfileModal}
        />
      )}
      {showDeviceToProfileModal && activeEvent !== undefined && (
        <DeviceToProfileModal
          setShowDeviceToProfileModal={setShowDeviceToProfileModal}
          activeEvent={activeEvent}
          setActiveEvent={setActiveEvent}
          activeProfileName={activeProfileName}
          setActiveProfileName={setActiveProfileName}
          displayProfiles={displayProfiles}
          setDisplayProfiles={setDisplayProfiles}
        />
      )}
      {showKeyToProfileModal && activeEvent && (
        <KeyToProfileModal
          setShowKeyToProfileModal={setShowKeyToProfileModal}
          displayProfiles={displayProfiles}
          activeEvent={activeEvent}
          handleKeySettingForProfile={handleKeySettingForProfile}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  remoteControlsContainer: {
    flex: 1,
  },
  remoteControlsHeaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default RemoteControlsScreen
