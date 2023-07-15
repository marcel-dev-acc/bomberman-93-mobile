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
import { io, type Socket } from 'socket.io-client';
import SocketTypes from '../../types/socketTypes';
import { addError } from '../../state/errors/reducer';
import { getIsVertical } from '../../constants/screen';
import imageNames from '../../constants/imageNames';
import { HandleCreateSessionData, JoinSessionGameServerResponse, NegativeResponse } from '../../types/serverTypes';
import { StorageKeys, fetchData } from '../../utils/localStorage';
import { webSocketServer } from '../../constants/server';
import { sleep } from '../../utils/helpers';

type CreateSessionScreenProps = {
  socketRef: React.MutableRefObject<Socket>;
  sessionRef: React.MutableRefObject<Session>;
};

function CreateSessionScreen({
  socketRef,
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

  socketRef.current.on(SocketTypes.createSessionRelayPositiveResponse, (data: HandleCreateSessionData) => {
    // Check if incoming response is for player
    if (data.sessionName !== sessionNameRef.current) return;
    // Trigger join session which has been created
    if (!hasJoinSessionRef.current && sessionNameRef.current) {
      socketRef.current.emit(SocketTypes.joinSessionRelay, {
        sessionName: sessionNameRef.current,
        playerNumber: 1,
      });
    }
  });

  socketRef.current.on(SocketTypes.createSessionRelayNegativeResponse, (response: NegativeResponse) => {
    // Check if incoming response is for player
    if (response.data?.sessionName !== sessionNameRef.current) return;
    dispatch(addError({
      title: `[${SocketTypes.createSessionRelayNegativeResponse}] Server error response`,
      value: response.error,
    }));
  });

  socketRef.current.on(SocketTypes.joinSessionRelayPositiveResponse, (response: JoinSessionGameServerResponse) => {
    // Check if incoming response is for player
    if (response.data.sessionName !== sessionNameRef.current || response.data.playerNumber !== 1) return;
    // Mark that player has joined a session
    hasJoinSessionRef.current = true;
    sessionRef.current = {
      ...sessionRef.current,
      name: sessionNameRef.current,
      secret: response.secret,
    } as Session;
    dispatch(changeScreen({ screen: ScreenType.waitingRoom }));
    // Reset the internal state values (delay so we don't generate server errors)
    setTimeout(() => {
      setSessionName('');
      sessionNameRef.current = '';
      hasJoinSessionRef.current = false;
    }, 5000);
  });

  socketRef.current.on(SocketTypes.joinSessionRelayNegativeResponse, (response: NegativeResponse) => {
    // Check if incoming response is for player
    if (response.data?.sessionName !== sessionNameRef.current || response.data?.playerNumber !== 1) return;
    if (!hasJoinSessionRef.current) {
      dispatch(addError({
        title: `[${SocketTypes.joinSessionRelayNegativeResponse}] Server error response`,
        value: response.error,
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
          onPress={async (pressEvent) => {
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
            const token = await fetchData(StorageKeys.token);
            socketRef.current = io(webSocketServer, { auth: { token } });
            let count = 0;
            while (!socketRef.current?.connected && count < 10) {
              await sleep(500);
              count++;
            }
            if (count >= 10) {
              dispatch(addError({
                title: `[Server Connection] Server error response`,
                value: 'Failed to connect to the server',
              }));
              return;
            }
            socketRef.current.emit(SocketTypes.createSessionRelay, {
              sessionName: sessionNameRef.current,
            });
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
