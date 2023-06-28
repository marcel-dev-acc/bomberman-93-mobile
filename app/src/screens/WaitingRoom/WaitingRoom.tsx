import React, { useRef, useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';

import { Button, GameText, Icon, Icons, SplashImage } from '../../components/General';
import type { Session, Player } from '../../state/session/reducer';
import { changePlayersDetails } from '../../state/session/reducer';
import colors from '../../constants/colors';
import { ScreenType, changeScreen } from '../../state/screens/reducer';
import { Socket } from 'socket.io-client';
import SocketTypes from '../../types/socketTypes';
import { getIsVertical } from '../../constants/screen';
import imageNames from '../../constants/imageNames';

type PlayerCardProps = {
  playerNumber: number;
  player: Player;
};

function PlayerCard({ playerNumber, player }: PlayerCardProps): JSX.Element {
  const { playerNumber: storedPlayerNumber, players }: Session = useSelector((state: any) => state.session);
  const { width } = useWindowDimensions();

  const handlePlayerNameChange = (name: string) => {
    dispatch(changePlayersDetails({
      playerNumber: playerNumber,
      player: {
        ...players[playerNumber - 1],
        name: name,
      },
    }));
  };

  const dispatch = useDispatch();

  const [textInputColor, setTextInputColor] = useState(colors.WHITE);

  return (
    <View style={{
      ...playerStyles.playerCardContainer,
      width: width * 0.95,
    }}>
      <View style={playerStyles.playerCardAvatarContainer}>
        {/* Avatar */}
        {player.avatar.gender === 'male' && (
          <Icon
            name={Icons.faceMan}
            color={colors.WHITE}
            size={30}
          />
        )}
        {player.avatar.gender === 'female' && (
          <Icon
            name={Icons.faceWoman}
            color={colors.WHITE}
            size={10}
          />
        )}
      </View>
      <View style={playerStyles.playerCardNameContaner}>
        {/* Player name */}
        {playerNumber === storedPlayerNumber && (
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
        {playerNumber !== storedPlayerNumber && (
          <Text style={playerStyles.playerCardText}>
            {player.name}
          </Text>
        )}
      </View>
      <View style={playerStyles.playerCardToggleContainer}>
        {/* Toggle for: player, computer or inactive */}
        <TouchableHighlight
          style={{ borderRadius: 100, width: 40, height: 40, justifyContent: 'center', alignItems: 'center', }}
          underlayColor='rgba(255,255,255,0.25)'
          onPress={(pressEvent) => {
            if (pressEvent.nativeEvent.target === undefined) return;
            if (player.isActive && !player.isReal) {
              dispatch(changePlayersDetails({
                playerNumber: playerNumber,
                player: {
                  ...players[playerNumber - 1],
                  isActive: false,
                },
              }));
            } else if (!player.isActive && !player.isReal) {
              dispatch(changePlayersDetails({
                playerNumber: playerNumber,
                player: {
                  ...players[playerNumber - 1],
                  isActive: true,
                },
              }));
            }
          }}
        >
          <View>
            {player.isActive && player.isReal && player.avatar.gender === 'male' && (
              <Icon
                name={Icons.faceMan}
                color={colors.WHITE}
                size={30}
              />
            )}
            {player.isActive && player.isReal && player.avatar.gender === 'female' && (
              <Icon
                name={Icons.faceWoman}
                color={colors.WHITE}
                size={30}
              />
            )}
            {player.isActive && !player.isReal && (
              <View style={{ marginBottom: 2.5 }}>
                <Icon
                  name={Icons.robot}
                  color={colors.WHITE}
                  size={30}
                />
              </View>
            )}
            {!player.isActive && (
              <Icon
                name={Icons.help}
                color={colors.WHITE}
                size={30}
              />
            )}
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

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
  socket: Socket
};

function WaitingRoomScreen({
  socket,
}: WaitingRoomScreenProps): JSX.Element {
  const { name, playerNumber, players, secret }: Session = useSelector((state: any) => state.session);
  const sessionName = name; 
  const { height, width } = useWindowDimensions();
  const isVertical = getIsVertical(width, height);

  const dispatch = useDispatch();

  const [timerInner, setTimerInner] = useState(countDownTime);
  const timer = useRef(countDownTime);

  useEffect(() => {
    if (timerInner > 0) {
      setTimeout(() => {
        setTimerInner(timerInner - 1);
        timer.current = timerInner - 1;
      }, 1000);
    } else {
      // Emit event to socket to start the game
      socket.emit(SocketTypes.event, {
        sessionName: sessionName,
        playerNumber: playerNumber,
        secret: secret,
        event: { type: 'started' },
      });
      // Play game
      dispatch(changeScreen({
        screen: ScreenType.game,
      }));
    }
  }, [timerInner]);

  useEffect(() => {
    if (width < height) {
      // In portrait mode
      dispatch(changeScreen({
        screen: ScreenType.rotate,
      }));
    }
  }, [width, height]);

  return (
    <View
      style={{
        ...styles.waitingRoomContainer,
        width: width,
      }}
    >
      <SplashImage />
      <ScrollView
        style={styles.waitingRoomScrollContainer}
        contentContainerStyle={styles.waitingRoomScrollContainerContent}
      >
        <View style={styles.waitingRoomHeadingContainer}>
          <GameText
            text={
              sessionName?
                sessionName.length <  20 ? sessionName : `${sessionName.substring(0, 20)}...` :
                'Random session name'
            }
            charSize={25}
          />
        </View>
        <View>
          <Image
            source={imageNames.gameWillStartInText}
            resizeMode='contain'
            style={{
              width: 280,
              height: 40,
            }}
          />
        </View>
        <GameText
          text={timer.current.toString()}
          charSize={30}
        />
        <View style={styles.waitingRoomTextContainer}>
          {playerNumber === 1 && (
            <Image
              source={imageNames.youArePlayer1Text}
              resizeMode='contain'
              style={{
                width: 240,
                height: 50,
              }}
            />
          )}
          {playerNumber === 2 && (
            <Image
              source={imageNames.youArePlayer2Text}
              resizeMode='contain'
              style={{
                width: 240,
                height: 50,
              }}
            />
          )}
          {playerNumber === 3 && (
            <Image
              source={imageNames.youArePlayer3Text}
              resizeMode='contain'
              style={{
                width: 240,
                height: 50,
              }}
            />
          )}
          {playerNumber === 4 && (
            <Image
              source={imageNames.youArePlayer4Text}
              resizeMode='contain'
              style={{
                width: 240,
                height: 50,
              }}
            />
          )}
          {playerNumber === 5 && (
            <Image
              source={imageNames.youArePlayer5Text}
              resizeMode='contain'
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
            resizeMode='contain'
            style={{
              width: 140,
              height: 40,
            }}
          />
        </View>
        {players && players.map((player, idx) => {
          return (
            <PlayerCard
              key={idx}
              playerNumber={idx + 1}
              player={player}
            />
          );
        })}
        {playerNumber === 1 && (
          <View style={styles.waitingRoomButtonContainer}>
            <TouchableHighlight
              onPress={(pressEvent) => {
                if (pressEvent.nativeEvent.target === undefined) return;
                socket.emit(SocketTypes.event, {
                  sessionName: sessionName,
                  playerNumber: playerNumber,
                  secret: secret,
                  event: { type: 'started' },
                });
                dispatch(changeScreen({ screen: ScreenType.game }));
              }}
              style={{
                ...styles.waitingRoomButton,
                width: isVertical ? width * 0.8 : width * 0.4,
              }}
              underlayColor='rgba(255,255,255,0.25)'
            >
              <Image
                source={imageNames.startGameText}
                resizeMode='contain'
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
