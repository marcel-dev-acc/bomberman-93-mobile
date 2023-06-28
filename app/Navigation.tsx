import React, { useState } from 'react';
import {
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';

import {
  WelcomeScreen,
  RulesScreen,
  CreateSessionScreen,
  WaitingRoomScreen,
  RotateScreen,
  GameScreen,
  WinnerScreen,
  RemoteControlsScreen,
} from './src/screens';
import { ScreenType } from './src/state/screens/reducer';
import { webSocketServer } from './src/constants/server';
import SocketTypes from './src/types/socketTypes';
import { addError } from './src/state/errors/reducer';

// const socket = io(webSocketServer, { auth: { token: '' } });

function Navigation(): JSX.Element {
  const screen: string = useSelector((state: any) => state.screens.screen);

  const dispatch = useDispatch();

  const [socket, setSocket] = useState(undefined as any);

  // Register a connection error handler
  socket.on(SocketTypes.connectionError, (err) => {
    if (!(['timeout', 'xhr poll error'].includes(err.message))) {
      dispatch(addError({
        title: `[${SocketTypes.connectionError}] Server connection error response`,
        value: err.message,
      }));
    }
  });

  return (
    <View style={styles.coreContainer}>
      {screen === ScreenType.welcome && <WelcomeScreen socket={socket} />}
      {screen === ScreenType.rules && <RulesScreen />}
      {screen === ScreenType.createSession && <CreateSessionScreen socket={socket} />}
      {screen === ScreenType.waitingRoom && <WaitingRoomScreen socket={socket} />}
      {screen === ScreenType.rotate && <RotateScreen />}
      {screen === ScreenType.game && <GameScreen socket={socket} />}
      {screen === ScreenType.winner && <WinnerScreen />}
      {
        screen === ScreenType.remoteControls &&
        Platform.OS === 'android' &&
        <RemoteControlsScreen />
      }
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
