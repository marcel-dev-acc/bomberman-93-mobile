import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableHighlight,
  useWindowDimensions,
  Image,
} from 'react-native';
import {useDispatch} from 'react-redux';

import {GameText, Icon, Icons, SplashImage} from '../../components/General';
import type {Session, Player} from '../../types/session';
import colors from '../../constants/colors';
import {ScreenType, changeScreen} from '../../state/screens/reducer';
import {Socket} from 'socket.io-client';
import SocketTypes from '../../types/socketTypes';
import {getIsVertical} from '../../constants/screen';
import imageNames from '../../constants/imageNames';
import {
  EventGameServerResponse,
  SetTimeGameServerResponse,
} from '../../types/serverTypes';
import {DEBUG} from '../../constants/app';

type PlayerCardProps = {
  sessionRef: React.MutableRefObject<Session>;
  playerNumber: number;
  player: Player;
};

function PlayerCard({
  sessionRef,
  playerNumber,
  player,
}: PlayerCardProps): JSX.Element {
  const {width} = useWindowDimensions();

  const handlePlayerNameChange = (name: string) => {
    sessionRef.current = {
      ...sessionRef.current,
      playerNumber: playerNumber,
      players: [
        ...sessionRef.current.players.filter(
          (_player, idx) => idx !== playerNumber - 1,
        ),
        {
          ...sessionRef.current.players[playerNumber - 1],
          name: name,
        },
      ],
    };
  };

  const [textInputColor, setTextInputColor] = useState(colors.WHITE);

  return (
    <View
      style={{
        ...playerStyles.playerCardContainer,
        width: width * 0.95,
      }}>
      <View style={playerStyles.playerCardAvatarContainer}>
        {/* Avatar */}
        {player.avatar.gender === 'male' && (
          <Icon name={Icons.faceMan} color={colors.WHITE} size={30} />
        )}
        {player.avatar.gender === 'female' && (
          <Icon name={Icons.faceWoman} color={colors.WHITE} size={10} />
        )}
      </View>
      <View style={playerStyles.playerCardNameContaner}>
        {/* Player name */}
        {playerNumber === sessionRef.current.playerNumber && (
          <TextInput
            onChangeText={handlePlayerNameChange}
            value={player.name}
            style={{
              ...playerStyles.playerCardInput,
              color: textInputColor,
            }}
            onFocus={() => setTextInputColor(colors.BLACK)}
            onEndEditing={() => setTextInputColor(colors.WHITE)}
          />
        )}
        {playerNumber !== sessionRef.current.playerNumber && (
          <Text style={playerStyles.playerCardText}>{player.name}</Text>
        )}
      </View>
      <View style={playerStyles.playerCardToggleContainer}>
        {/* Toggle for: player, computer or inactive */}
        <TouchableHighlight
          style={{
            borderRadius: 100,
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          underlayColor="rgba(255,255,255,0.25)"
          onPress={pressEvent => {
            if (pressEvent.nativeEvent.target === undefined) {
              return;
            }
            if (player.isActive && !player.isReal) {
              sessionRef.current = {
                ...sessionRef.current,
                playerNumber: playerNumber,
                players: [
                  ...sessionRef.current.players.filter(
                    (_player, idx) => idx !== playerNumber - 1,
                  ),
                  {
                    ...sessionRef.current.players[playerNumber - 1],
                    isActive: false,
                  },
                ],
              } as Session;
            } else if (!player.isActive && !player.isReal) {
              sessionRef.current = {
                ...sessionRef.current,
                playerNumber: playerNumber,
                players: [
                  ...sessionRef.current.players.filter(
                    (_player, idx) => idx !== playerNumber - 1,
                  ),
                  {
                    ...sessionRef.current.players[playerNumber - 1],
                    isActive: true,
                  },
                ],
              } as Session;
            }
          }}>
          <View>
            {player.isActive &&
              player.isReal &&
              player.avatar.gender === 'male' && (
                <Icon name={Icons.faceMan} color={colors.WHITE} size={30} />
              )}
            {player.isActive &&
              player.isReal &&
              player.avatar.gender === 'female' && (
                <Icon name={Icons.faceWoman} color={colors.WHITE} size={30} />
              )}
            {player.isActive && !player.isReal && (
              <View style={{marginBottom: 2.5}}>
                <Icon name={Icons.robot} color={colors.WHITE} size={30} />
              </View>
            )}
            {!player.isActive && (
              <Icon name={Icons.help} color={colors.WHITE} size={30} />
            )}
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const playerStyles = StyleSheet.create({
  playerCardContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.WHITE,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    maxWidth: 500,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  playerCardAvatarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerCardNameContaner: {
    flex: 3,
    justifyContent: 'center',
  },
  playerCardToggleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerCardText: {
    color: colors.WHITE,
    fontSize: 20,
    fontFamily: 'Minecraft',
  },
  playerCardInput: {
    borderBottomColor: colors.WHITE,
    borderBottomWidth: 1,
    color: colors.WHITE,
    fontSize: 20,
  },
});

const countDownTime: number = 120;

type WaitingRoomScreenProps = {
  socketRef: React.MutableRefObject<Socket | undefined>;
  sessionRef: React.MutableRefObject<Session>;
};

function WaitingRoomScreen({
  socketRef,
  sessionRef,
}: WaitingRoomScreenProps): JSX.Element {
  const {height, width} = useWindowDimensions();
  const isVertical = getIsVertical(width, height);

  const dispatch = useDispatch();

  const [timerInner, setTimerInner] = useState(countDownTime);
  const timer = useRef(countDownTime);

  socketRef.current?.on(
    SocketTypes.setTimeRelayPositiveResponse,
    (response: SetTimeGameServerResponse) => {
      if (DEBUG && response.data.sessionName !== sessionRef.current.name) {
        console.warn(
          `[${SocketTypes.setTimeRelayPositiveResponse}]`,
          JSON.stringify(response),
        );
      }
      // Check if incoming response is for player
      if (response.data.sessionName !== sessionRef.current.name) {
        return;
      }
      if (sessionRef.current.playerNumber === 1) {
        return;
      }
      if (!response.time) {
        return;
      }
      // Set the time
      setTimerInner(response.time);
      timer.current = response.time;
      // Change screens when time runs out
      console.log('timer', timer.current);
      if (timer.current === 1) {
        dispatch(changeScreen(ScreenType.game));
      }
    },
  );

  socketRef.current?.on(
    SocketTypes.eventRelayPositiveResponse,
    (response: EventGameServerResponse) => {
      if (DEBUG && response.data.sessionName !== sessionRef.current.name) {
        console.warn(
          `[${SocketTypes.eventRelayPositiveResponse}]`,
          JSON.stringify(response.data),
        );
      }
      // Check if objects has keys
      if (Object.keys(response.state).length === 0) {
        return;
      }
      // const state = response.state as SessionDetails;
      // Trigger game start
      if (response.data.event.type === 'started') {
        dispatch(changeScreen(ScreenType.game));
      }
    },
  );

  useEffect(() => {
    if (sessionRef.current.playerNumber === 1) {
      if (timer.current > 0) {
        setTimeout(() => {
          setTimerInner(timerInner - 1);
          timer.current = timerInner - 1;
        }, 1000);
      } else {
        // Emit event to socket to start the game, if player 1
        if (sessionRef.current.playerNumber === 1) {
          socketRef.current?.emit(SocketTypes.eventRelay, {
            sessionName: sessionRef.current.name,
            playerNumber: sessionRef.current.playerNumber,
            secret: sessionRef.current.secret,
            event: {type: 'started'},
          });
        }
      }
      socketRef.current?.emit(SocketTypes.setTimeRelay, {
        sessionName: sessionRef.current.name,
        playerNumber: sessionRef.current.playerNumber,
        secret: sessionRef.current.secret,
        time: timer.current,
      });
    }
  }, [timerInner, sessionRef, socketRef]);

  useEffect(() => {
    if (width < height) {
      // In portrait mode
      dispatch(changeScreen(ScreenType.rotate));
    }
  }, [width, height, dispatch]);

  return (
    <View
      style={{
        ...styles.waitingRoomContainer,
        width: width,
      }}>
      <SplashImage />
      <ScrollView
        style={styles.waitingRoomScrollContainer}
        contentContainerStyle={styles.waitingRoomScrollContainerContent}>
        <View style={styles.waitingRoomHeadingContainer}>
          <GameText
            text={
              sessionRef.current.name
                ? sessionRef.current.name.length < 20
                  ? sessionRef.current.name
                  : `${sessionRef.current.name.substring(0, 20)}...`
                : 'Random session name'
            }
            charSize={25}
          />
        </View>
        <View>
          <Image
            source={imageNames.gameWillStartInText}
            resizeMode="contain"
            style={{
              width: 280,
              height: 40,
            }}
          />
        </View>
        <GameText text={timer.current.toString()} charSize={30} />
        <View style={styles.waitingRoomTextContainer}>
          {sessionRef.current.playerNumber === 1 && (
            <Image
              source={imageNames.youArePlayer1Text}
              resizeMode="contain"
              style={{
                width: 240,
                height: 50,
              }}
            />
          )}
          {sessionRef.current.playerNumber === 2 && (
            <Image
              source={imageNames.youArePlayer2Text}
              resizeMode="contain"
              style={{
                width: 240,
                height: 50,
              }}
            />
          )}
          {sessionRef.current.playerNumber === 3 && (
            <Image
              source={imageNames.youArePlayer3Text}
              resizeMode="contain"
              style={{
                width: 240,
                height: 50,
              }}
            />
          )}
          {sessionRef.current.playerNumber === 4 && (
            <Image
              source={imageNames.youArePlayer4Text}
              resizeMode="contain"
              style={{
                width: 240,
                height: 50,
              }}
            />
          )}
          {sessionRef.current.playerNumber === 5 && (
            <Image
              source={imageNames.youArePlayer5Text}
              resizeMode="contain"
              style={{
                width: 240,
                height: 50,
              }}
            />
          )}
        </View>
        <View style={styles.waitingRoomTextContainer}>
          <Image
            source={imageNames.playersText}
            resizeMode="contain"
            style={{
              width: 140,
              height: 40,
            }}
          />
        </View>
        {sessionRef.current.players &&
          sessionRef.current.players.map((player, idx) => {
            return (
              <PlayerCard
                key={idx}
                sessionRef={sessionRef}
                playerNumber={idx + 1}
                player={player}
              />
            );
          })}
        {sessionRef.current.playerNumber === 1 && (
          <View style={styles.waitingRoomButtonContainer}>
            <TouchableHighlight
              onPress={pressEvent => {
                if (pressEvent.nativeEvent.target === undefined) {
                  return;
                }
                socketRef.current?.emit(SocketTypes.eventRelay, {
                  sessionName: sessionRef.current.name,
                  playerNumber: sessionRef.current.playerNumber,
                  secret: sessionRef.current.secret,
                  event: {type: 'started'},
                });
              }}
              style={{
                ...styles.waitingRoomButton,
                width: isVertical ? width * 0.8 : width * 0.4,
              }}
              underlayColor="rgba(255,255,255,0.25)">
              <Image
                source={imageNames.startGameText}
                resizeMode="contain"
                style={{
                  width: 200,
                  height: 50,
                }}
              />
            </TouchableHighlight>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  waitingRoomContainer: {
    flex: 1,
  },
  waitingRoomScrollContainer: {},
  waitingRoomScrollContainerContent: {
    alignItems: 'center',
  },
  waitingRoomHeadingContainer: {
    marginVertical: 20,
  },
  waitingRoomText: {
    color: colors.WHITE,
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'Minecraft',
  },
  waitingRoomTextContainer: {
    marginVertical: 10,
  },
  waitingRoomButtonContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  waitingRoomButton: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WaitingRoomScreen;
