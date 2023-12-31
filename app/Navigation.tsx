import React, {useEffect, useRef, useState} from 'react'
import {Platform, StyleSheet, View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import io, {Socket} from 'socket.io-client'

import {
  WelcomeScreen,
  RulesScreen,
  CreateSessionScreen,
  WaitingRoomScreen,
  RotateScreen,
  GameScreen,
  WinnerScreen,
  RemoteControlsScreen,
  RegisterScreen,
  SettingsScreen,
  JoinSessionScreen,
} from './src/screens'
import {ScreenType, changeScreen} from './src/state/screens/reducer'
import {webSocketServer} from './src/constants/server'
import SocketTypes from './src/types/socketTypes'
import {addError} from './src/state/errors/reducer'
import {
  Loader,
  ServerConnectionStatus,
  ServerStatus,
} from './src/components/General'
import {StorageKeys, fetchData} from './src/utils/localStorage'
import InitSessionState from './src/state/session/init'
import {sleep} from './src/utils/helpers'
import {DEBUG} from './src/constants/app'

function Navigation(): JSX.Element {
  const {screen, isLoading} = useSelector((state: any) => state.screens)

  const dispatch = useDispatch()

  const handleShowIntro = async () => {
    await sleep(9000)
    setShowIntro(false)
  }

  const handleFetchStoredToken = async () => {
    const token = await fetchData(StorageKeys.token)
    // Check if a token exists, and mark as unregistered if it doesn't
    if (!token) {
      setServerStatus(ServerStatus.unregistered)
      serverStatusRef.current = ServerStatus.unregistered
      return
    }
    setServerStatus(ServerStatus.localToken)
    serverStatusRef.current = ServerStatus.localToken
    if (socketRef.current?.connected) {
      setServerStatus(ServerStatus.connected)
      serverStatusRef.current = ServerStatus.connected
      return
    }
    const webSocketUrl = await webSocketServer()
    if (!webSocketUrl) {
      dispatch(
        addError({
          title: 'Socket Url Error',
          value: 'Socket url is undefined',
        }),
      )
      return
    }
    socketRef.current = io(webSocketUrl, {auth: {token}})
    let count = 0
    while (!socketRef.current?.connected && count < 10) {
      await sleep(500)
      count++
    }
    if (count >= 10) {
      dispatch(
        addError({
          title: `[${SocketTypes.connectionError}] Server connection error`,
          value: 'Failed to connect to the server (check keys)',
        }),
      )
      return
    }
    setServerStatus(ServerStatus.connected)
    serverStatusRef.current = ServerStatus.connected
  }

  const checkServerStatus = async () => {
    while (true) {
      await sleep(1000 * 30)
      if (
        serverStatusRef.current === ServerStatus.connected &&
        !socketRef.current?.connected
      ) {
        setServerStatus(ServerStatus.disconnected)
        serverStatusRef.current = ServerStatus.disconnected
        dispatch(changeScreen(ScreenType.welcome))
      }
    }
  }

  const [showIntro, setShowIntro] = useState(true)
  const [serverStatus, setServerStatus] = useState(ServerStatus.unregistered)
  const serverStatusRef = useRef(serverStatus)

  const socketRef = useRef(undefined as Socket | undefined)
  const sessionRef = useRef(InitSessionState)
  const serverStatusRunner = useRef(checkServerStatus())

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = serverStatusRunner
    if (showIntro) {
      handleShowIntro()
    }
  }, [showIntro])

  useEffect(() => {
    handleFetchStoredToken()
  }, [screen]) // eslint-disable-line react-hooks/exhaustive-deps

  // Register a connection error handler
  if (socketRef.current) {
    socketRef.current.on(SocketTypes.connectionErrorRelay, err => {
      if (DEBUG) {
        console.warn(`[${SocketTypes.connectionErrorRelay}]`, err.message)
      }
      if (!['timeout', 'xhr poll error'].includes(err.message)) {
        setServerStatus(ServerStatus.disconnected)
        serverStatusRef.current = ServerStatus.disconnected
        dispatch(
          addError({
            title: `[${SocketTypes.connectionError}] Server connection error response`,
            value: err.message,
          }),
        )
      }
    })
  }

  return (
    <View style={styles.coreContainer}>
      {isLoading && <Loader />}
      <ServerConnectionStatus status={serverStatus} />
      {screen === ScreenType.welcome && (
        <WelcomeScreen showIntro={showIntro} serverStatus={serverStatus} />
      )}
      {screen === ScreenType.register && (
        <RegisterScreen
          setServerStatus={setServerStatus}
          serverStatusRef={serverStatusRef}
        />
      )}
      {screen === ScreenType.rules && <RulesScreen />}
      {socketRef.current && screen === ScreenType.createSession && (
        <CreateSessionScreen socketRef={socketRef} sessionRef={sessionRef} />
      )}
      {socketRef.current && screen === ScreenType.waitingRoom && (
        <WaitingRoomScreen socketRef={socketRef} sessionRef={sessionRef} />
      )}
      {socketRef.current && screen === ScreenType.joinSession && (
        <JoinSessionScreen socketRef={socketRef} sessionRef={sessionRef} />
      )}
      {screen === ScreenType.rotate && <RotateScreen />}
      {socketRef.current && screen === ScreenType.game && (
        <GameScreen socketRef={socketRef} sessionRef={sessionRef} />
      )}
      {screen === ScreenType.winner && (
        <WinnerScreen socketRef={socketRef} sessionRef={sessionRef} />
      )}
      {socketRef.current &&
        screen === ScreenType.remoteControls &&
        Platform.OS === 'android' && (
          <RemoteControlsScreen
            socketRef={socketRef as React.MutableRefObject<Socket>}
            sessionRef={sessionRef}
          />
        )}
      {screen === ScreenType.settings && <SettingsScreen />}
    </View>
  )
}

const styles = StyleSheet.create({
  coreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Navigation
