import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  useWindowDimensions,
  TouchableHighlight,
  Image,
} from 'react-native';
import { useDispatch } from 'react-redux';

import { BackButton, Icon, Icons, SplashImage } from '../../components/General';
import { Session } from '../../types/session';
import colors from '../../constants/colors';
import { ScreenType, changeScreen } from '../../state/screens/reducer';
import type { Socket } from 'socket.io-client';
import SocketTypes from '../../types/socketTypes';
import { addError } from '../../state/errors/reducer';
import { getIsVertical } from '../../constants/screen';
import imageNames from '../../constants/imageNames';

type CreateSessionScreenProps = {
  socket: Socket;
  sessionRef: React.MutableRefObject<Session>;
};

function CreateSessionScreen({
  socket,
  sessionRef,
}: CreateSessionScreenProps): JSX.Element {

  const { height, width } = useWindowDimensions();
  const isVertical = getIsVertical(width, height);

  const dispatch = useDispatch();

  const handleSessionNameChange = (text: string) => {
    sessionNameRef.current = text;
    setSessionName(text);
  };
  
  const [sessionName, setSessionName] = useState('');
  const [textInputColor, setTextInputColor] = useState(colors.BLACK);

  const sessionNameRef = useRef(sessionName);
  const hasJoinSessionRef = useRef(false);

  useEffect(() => {
    if (width < height) {
      // In portrait mode
      dispatch(changeScreen({ screen: ScreenType.rotate }));
    }
  }, [width, height]);

  socket.on(SocketTypes.createSessionPositiveResponse, () => {
    if (!hasJoinSessionRef.current && sessionNameRef.current) {
      socket.emit(SocketTypes.joinSession, {
        sessionName: sessionNameRef.current,
        playerNumber: 1,
      });
    }
  });

  socket.on(SocketTypes.createSessionNegativeResponse, (error: string) => {
    dispatch(addError({
      title: `[${SocketTypes.createSessionNegativeResponse}] Server error response`,
      value: error,
    }));
  });

  socket.on(SocketTypes.joinSessionPositiveResponse, (secret) => {
    hasJoinSessionRef.current = true;
    sessionRef.current = {
      ...sessionRef.current,
      name: sessionNameRef.current,
      secret: secret,
    } as Session;
    dispatch(changeScreen({ screen: ScreenType.waitingRoom }));
    // Reset the internal state values (delay so we don't generate server errors)
    setTimeout(() => {
      setSessionName('');
      sessionNameRef.current = '';
      hasJoinSessionRef.current = false;
    }, 5000);
  });

  socket.on(SocketTypes.joinSessionNegativeResponse, (error) => {
    if (!hasJoinSessionRef.current) {
      dispatch(addError({
        title: `[${SocketTypes.joinSessionNegativeResponse}] Server error response`,
        value: error,
      }));
    }
  });

  return (
    <View
      style={{
        ...styles.createSessionContainer,
        width: width,
      }}
    >
      <SplashImage />
      <BackButton
        onPress={(pressEvent) => {
          if (pressEvent.nativeEvent.target === undefined) return;
          dispatch(changeScreen({
            screen: ScreenType.welcome,
          }));
        }}
      />
      <View style={styles.createSessionTextContainer}>
        <Image
          source={imageNames.enterText}
          resizeMode='contain'
          style={{
            width: 100,
            height: 40,
          }}
        />
        <Image
          source={imageNames.sessionNameText}
          resizeMode='contain'
          style={{
            width: 220,
            height: 40,
          }}
        />
      </View>
      <TextInput
        onChangeText={handleSessionNameChange}
        value={sessionName}
        style={{
          ...styles.createSessionInput,
          width: isVertical ? width * 0.8 : width * 0.4,
          color: textInputColor,
        }}
        onFocus={() => setTextInputColor(colors.BLACK)}
        onEndEditing={() => setTextInputColor(colors.WHITE)}
      />
      <View style={styles.createSessionButtonContainer}>
        <TouchableHighlight
          onPress={(pressEvent) => {
            if (pressEvent.nativeEvent.target === undefined) return;
            // Validate if the sessionNameRef current value is blank
            if (!sessionNameRef.current) {
              sessionNameRef.current = '';
              setSessionName('');
              dispatch(addError({
                title: `[Create Session] Game Error`,
                value: 'Session name was empty',
              }));
              return;
            }
            socket.on('connect', () => console.log('Socket connected') );
            if (!socket.connected) {
              dispatch(addError({
                title: `[Server Connection] Server error response`,
                value: 'Failed to connect to the server',
              }));
            } else {
              socket.emit(SocketTypes.createSession, {
                sessionName: sessionNameRef.current,
              });
            }
          }}
          style={{
            ...styles.createSessionButton,
            width: isVertical ? width * 0.8 : width * 0.4,
          }}
          underlayColor='rgba(255,255,255,0.25)'
        >
          <Image
            source={imageNames.createSessionText}
            resizeMode='contain'
            style={{
              width: 260,
              height: 50,
            }}
          />
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  createSessionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createSessionTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  createSessionInput: {
    borderBottomColor: colors.WHITE,
    borderBottomWidth: 1,
    fontSize: 20,
  },
  createSessionButtonContainer: {
    marginVertical: 5,
  },
  createSessionButton: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreateSessionScreen;
