import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  GestureResponderEvent,
  useWindowDimensions,
  TouchableHighlight,
  Image,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Socket} from 'socket.io-client';

import {GameText, SplashImage} from '../../components/General';
import type {Session} from '../../types/session';
import {ScreenType, changeScreen} from '../../state/screens/reducer';
import imageNames from '../../constants/imageNames';
import {getIsVertical} from '../../constants/screen';

type WinnerScreenProps = {
  socketRef: React.MutableRefObject<Socket | undefined>;
  sessionRef: React.MutableRefObject<Session>;
};

function WinnerScreen({socketRef, sessionRef}: WinnerScreenProps): JSX.Element {
  const {height, width} = useWindowDimensions();
  const isVertical = getIsVertical(width, height);

  const dispatch = useDispatch();

  const handleGameReset = (pressEvent: GestureResponderEvent) => {
    if (pressEvent.nativeEvent.target === undefined) {
      return;
    }
    sessionRef.current = {
      ...sessionRef.current,
      winner: undefined,
    } as Session;
    dispatch(changeScreen(ScreenType.welcome));
  };

  useEffect(() => {
    socketRef.current = undefined;
  }, []);

  return (
    <View
      style={{
        ...styles.winnerContainer,
        width: width,
      }}>
      {isVertical && <SplashImage includeHeader />}
      {!isVertical && <SplashImage />}
      {sessionRef.current.winner && (
        <View style={styles.winnerTextContainer}>
          <Image
            source={imageNames.theWinnerIsText}
            resizeMode="contain"
            style={{
              width: 240,
              height: 45,
            }}
          />
          <GameText text={sessionRef.current.winner.name} charSize={50} />
        </View>
      )}
      <View style={styles.winnerButtonContainer}>
        <TouchableHighlight
          onPress={handleGameReset}
          style={styles.winnerButton}
          underlayColor="rgba(255,255,255,0.25)">
          <Image
            source={imageNames.playAgainText}
            resizeMode="contain"
            style={{
              width: 200,
              height: 45,
            }}
          />
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  winnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  winnerTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  winnerButtonContainer: {
    marginVertical: 5,
  },
  winnerButton: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WinnerScreen;
