import React, { useEffect, useRef, useState } from 'react';
import {
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import io, { Socket } from 'socket.io-client';

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
} from './src/screens';
import { ScreenType } from './src/state/screens/reducer';
import { webSocketServer } from './src/constants/server';
import SocketTypes from './src/types/socketTypes';
import { addError } from './src/state/errors/reducer';
import { ServerConnectionStatus, ServerStatus } from './src/components/General';
import { StorageKeys, fetchData } from './src/utils/localStorage';
import InitSessionState from './src/state/session/init';

function Navigation(): JSX.Element {
  const screen: string = useSelector((state: any) => state.screens.screen);

  const dispatch = useDispatch();

  const handleShowIntro = async () => {
    await new Promise((resolve: any) => setTimeout(resolve, 9000));
    setShowIntro(false);
  };
  
  const handleFetchStoredToken = async () => {
    const token = await fetchData(StorageKeys.token);
    // Check if a token exists, and mark as unregistered if it doesn't
    if (!token) {
      setServerStatus(ServerStatus.unregistered);
      return;
    }
    setServerStatus(ServerStatus.localToken);
    if (socket.current?.connected) {
      setServerStatus(ServerStatus.connected);
      return;
    }
    socket.current = io(webSocketServer, { auth: { token } });
    setTimeout(() => {
      if (socket.current?.connected) {
        setServerStatus(ServerStatus.connected);
      } else {
        dispatch(addError({
          title: `[${SocketTypes.connectionError}] Server connection error`,
          value: 'Failed to connect to the server (check keys)',
        }));
      }
    }, 1000);
  };
  
  const [showIntro, setShowIntro] = useState(true);
  const [serverStatus, setServerStatus] = useState(ServerStatus.unregistered);
  
  const socket = useRef(undefined as Socket | undefined);
  const sessionRef = useRef(InitSessionState);

  useEffect(() => {
    if (showIntro) handleShowIntro();
  }, [showIntro]);

  useEffect(() => {
    handleFetchStoredToken();
  }, [screen]);

  // Register a connection error handler
  if (socket.current) {
    socket.current.on(SocketTypes.connectionErrorRelay, (err) => {
      if (!(['timeout', 'xhr poll error'].includes(err.message))) {
        setServerStatus(ServerStatus.disconnected);
        dispatch(addError({
          title: `[${SocketTypes.connectionError}] Server connection error response`,
          value: err.message,
        }));
      }
    });
  }

  return (
    <View style={styles.coreContainer}>
      <ServerConnectionStatus status={serverStatus} />
      {screen === ScreenType.welcome && (
        <WelcomeScreen
          showIntro={showIntro}
          serverStatus={serverStatus}
        />
      )}
      {screen === ScreenType.register && (
        <RegisterScreen
          setServerStatus={setServerStatus}
        />
      )}
      {screen === ScreenType.rules && <RulesScreen />}
      {socket.current && screen === ScreenType.createSession && (
        <CreateSessionScreen
          socket={socket.current}
          sessionRef={sessionRef}
        />
      )}
      {socket.current && screen === ScreenType.waitingRoom && (
        <WaitingRoomScreen
          socket={socket.current}
          sessionRef={sessionRef}
        />
      )}
      {screen === ScreenType.rotate && <RotateScreen />}
      {socket.current && screen === ScreenType.game && (
        <GameScreen
          socket={socket.current}
          sessionRef={sessionRef}
        />
      )}
      {screen === ScreenType.winner && <WinnerScreen sessionRef={sessionRef} />}
      {
        socket.current &&
        screen === ScreenType.remoteControls &&
        Platform.OS === 'android' &&
        <RemoteControlsScreen socket={socket.current} sessionRef={sessionRef} />
      }
      {screen === ScreenType.settings && <SettingsScreen /> }
    </View>
  );
}

const styles = StyleSheet.create({
  coreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Navigation;
