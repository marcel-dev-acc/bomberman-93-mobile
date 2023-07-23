import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Platform,
  AppState,
  AppStateStatus,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import colors from '../../../constants/colors';
import {ScreenType, toggleMusic} from '../../../state/screens/reducer';
import Icon from '../Icon/Icon';
import {Icons} from '../Icon/iconMap';
import {
  isMusicPlayerModuleAvailableOnAndroid,
  playSoundOnAndroid,
} from '../../../native/interface';
import music from '../../../constants/music';

function MusicToggle(): JSX.Element {
  const screen: ScreenType = useSelector((state: any) => state.screens.screen);
  const musicEnabled: boolean = useSelector(
    (state: any) => state.screens.musicEnabled,
  );

  const dispatch = useDispatch();

  const handlePlayMusic = useCallback(async () => {
    if (Platform.OS === 'android') {
      if (await isMusicPlayerModuleAvailableOnAndroid()) {
        setMusicPlayerIsAvailable(true);
        const isPlaying = await playSoundOnAndroid(music.welcome);
        dispatch(toggleMusic(isPlaying));
      }
    }
  }, [dispatch]);

  const handleStopMusic = useCallback(async () => {
    if (Platform.OS === 'android') {
      if (await isMusicPlayerModuleAvailableOnAndroid()) {
        await playSoundOnAndroid(music.nothing);
        dispatch(toggleMusic(false));
      }
    }
  }, [dispatch]);

  const handleMusicToggle = async () => {
    if (!musicEnabled) {
      handlePlayMusic();
    } else {
      handleStopMusic();
    }
  };

  const [musicPlayerIsAvailable, setMusicPlayerIsAvailable] = useState(false);
  const trackIsPlaying = useRef(false);

  useEffect(() => {
    if (!trackIsPlaying.current) {
      trackIsPlaying.current = true;
      handlePlayMusic();
    }

    // Apply an app state listener to detect once the app goes into background
    AppState.addEventListener('change', (appState: AppStateStatus) => {
      if (appState !== 'active') {
        handleStopMusic();
      }
    });
  }, [handlePlayMusic, handleStopMusic]);

  // Disabled for certain screens
  if (
    [ScreenType.game, ScreenType.remoteControls].includes(screen) ||
    !musicPlayerIsAvailable
  ) {
    return <></>;
  }

  // Default is to show
  return (
    <View style={styles.musicToggleContainer}>
      <TouchableHighlight
        onPress={pressEvent => {
          if (pressEvent.nativeEvent.target === undefined) {
            return;
          }
          handleMusicToggle();
        }}
        underlayColor="rgba(0,0,0,0.1)"
        style={{
          borderRadius: 100,
        }}>
        <Icon
          name={musicEnabled ? Icons.music : Icons.musicOff}
          size={30}
          color={colors.WHITE}
        />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  musicToggleContainer: {
    position: 'absolute',
    top: 0,
    right: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    zIndex: 20,
  },
});

export default MusicToggle;
