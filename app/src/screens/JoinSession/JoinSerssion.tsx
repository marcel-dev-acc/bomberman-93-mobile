import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  useWindowDimensions,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import {useDispatch} from 'react-redux';

import {BackButton, GameText, SplashImage} from '../../components/General';
import type {Session} from '../../types/session';
import {ScreenType, changeScreen} from '../../state/screens/reducer';
import {getIsVertical} from '../../constants/screen';
import {Socket} from 'socket.io-client';
import SocketTypes from '../../types/socketTypes';
import {
  JoinSessionGameServerResponse,
  SessionNames,
} from '../../types/serverTypes';
import {addError} from '../../state/errors/reducer';
import colors from '../../constants/colors';
import {DEBUG} from '../../constants/app';

type JoinSessionScreenProps = {
  socketRef: React.MutableRefObject<Socket | undefined>;
  sessionRef: React.MutableRefObject<Session>;
};

function JoinSessionScreen({
  socketRef,
  sessionRef,
}: JoinSessionScreenProps): JSX.Element {
  const {height, width} = useWindowDimensions();
  const isVertical = getIsVertical(width, height);

  const dispatch = useDispatch();

  const [displaySessionNames, setDisplaySessionNames] = useState(
    undefined as SessionNames | undefined,
  );

  const sessionNameRef = useRef(undefined as string | undefined);
  const sessionPlayerNumberRef = useRef(2);

  socketRef.current?.on(
    SocketTypes.joinableSessionsRelayPositiveResponse,
    (sessionNames: SessionNames) => {
      setDisplaySessionNames(sessionNames);
    },
  );

  socketRef.current?.on(
    SocketTypes.joinSessionRelayPositiveResponse,
    (response: JoinSessionGameServerResponse) => {
      if (
        DEBUG &&
        (response.data.sessionName !== sessionNameRef.current ||
          response.data.playerNumber !== sessionPlayerNumberRef.current)
      ) {
        console.warn(
          `[${SocketTypes.joinSessionRelayPositiveResponse}]`,
          JSON.stringify(response.data),
          response.secret,
        );
      }
      // Check if incoming response is for player
      if (
        response.data.sessionName !== sessionNameRef.current ||
        response.data.playerNumber !== sessionPlayerNumberRef.current
      ) {
        return;
      }
      // Set the session details
      sessionRef.current = {
        ...sessionRef.current,
        name: sessionNameRef.current,
        secret: response.secret,
        playerNumber: sessionPlayerNumberRef.current,
      } as Session;
      // Change the screen to the waiing room
      dispatch(changeScreen(ScreenType.waitingRoom));
    },
  );

  socketRef.current?.on(
    SocketTypes.joinSessionRelayNegativeResponse,
    response => {
      if (
        DEBUG &&
        (response.data?.sessionName !== sessionNameRef.current ||
          response.data?.playerNumber !== sessionPlayerNumberRef.current)
      ) {
        console.warn(
          `[${SocketTypes.joinSessionRelayNegativeResponse}]`,
          JSON.stringify(response.data),
        );
      }
      // Check if incoming response is for player
      if (
        response.data?.sessionName !== sessionNameRef.current ||
        response.data?.playerNumber !== sessionPlayerNumberRef.current
      ) {
        return;
      }
      dispatch(
        addError({
          title: `[${SocketTypes.joinSessionRelayNegativeResponse}] Server error response`,
          value: response.error,
        }),
      );
    },
  );

  // Fetch a list of sessions to join
  useEffect(() => {
    socketRef.current?.emit(SocketTypes.joinableSessionsRelay);
  }, [socketRef]);

  return (
    <View
      style={{
        ...styles.joinSessionContainer,
        width: width,
      }}>
      <SplashImage />
      <BackButton
        onPress={pressEvent => {
          if (pressEvent.nativeEvent.target === undefined) {
            return;
          }
          dispatch(changeScreen(ScreenType.welcome));
        }}
      />
      <View style={{marginTop: 15, width: width, alignItems: 'center'}}>
        <View style={{flexDirection: 'row'}}>
          <GameText text="Join" charSize={30} />
        </View>
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
          {displaySessionNames &&
            Object.keys(displaySessionNames).map((sessionName, idx) => {
              return (
                <View
                  key={idx}
                  style={{
                    marginHorizontal: 5,
                    borderBottomColor: colors.WHITE,
                    borderBottomWidth: 1,
                  }}>
                  {[1, 2, 3, 4, 5].map((playerNumber, jdx) => {
                    const _playerNumber = playerNumber as 1 | 2 | 3 | 4 | 5;
                    if (
                      displaySessionNames[sessionName][_playerNumber].hasJoined
                    ) {
                      return <View key={jdx} />;
                    }
                    return (
                      <View key={jdx} style={{marginTop: 10}}>
                        <TouchableHighlight
                          onPress={pressEvent => {
                            if (pressEvent.nativeEvent.target === undefined) {
                              return;
                            }
                            sessionNameRef.current = sessionName;
                            sessionPlayerNumberRef.current = playerNumber;
                            socketRef.current?.emit(
                              SocketTypes.joinSessionRelay,
                              {
                                sessionName: sessionName,
                                playerNumber: playerNumber,
                              },
                            );
                          }}
                          underlayColor="rgba(255,255,255,0.25)">
                          <GameText
                            text={`${sessionName} as player ${playerNumber}`}
                            charSize={isVertical ? 15 : 30}
                          />
                        </TouchableHighlight>
                      </View>
                    );
                  })}
                </View>
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  joinSessionContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default JoinSessionScreen;
