import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  useWindowDimensions,
  Image,
} from 'react-native';
import {useDispatch} from 'react-redux';

import {ScreenType, changeScreen} from '../../state/screens/reducer';
import {BackButton, GameText, SplashImage} from '../../components/General';
import {getIsVertical} from '../../constants/screen';
import imageNames from '../../constants/imageNames';
import {StorageKeys, fetchData, removeData} from '../../utils/localStorage';

function SettingsScreen(): JSX.Element {
  const {height, width} = useWindowDimensions();
  const isVertical = getIsVertical(width, height);

  const dispatch = useDispatch();

  const handleFetchToken = async () => {
    const _token = await fetchData(StorageKeys.token);
    if (_token) setToken(_token);
  };

  const [token, setToken] = useState('');

  useEffect(() => {
    if (!token) handleFetchToken();
  }, []);

  return (
    <View
      style={{
        ...styles.settingsContainer,
        width: width,
      }}>
      <SplashImage />
      <BackButton
        onPress={pressEvent => {
          if (pressEvent.nativeEvent.target === undefined) return;
          dispatch(changeScreen(ScreenType.welcome));
        }}
      />
      <View>
        <View style={styles.settingsButtonContainer}>
          <TouchableHighlight
            onPress={pressEvent => {
              if (pressEvent.nativeEvent.target === undefined) return;
              dispatch(changeScreen(ScreenType.remoteControls));
            }}
            style={{
              ...styles.settingsButton,
              width: isVertical ? width * 0.8 : width * 0.5,
            }}
            underlayColor="rgba(255,255,255,0.25)">
            <Image
              source={imageNames.controlsText}
              resizeMode="contain"
              style={{
                width: 140,
                height: 50,
              }}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.settingsButtonContainer}>
          <TouchableHighlight
            onPress={pressEvent => {
              if (pressEvent.nativeEvent.target === undefined) return;
              removeData(StorageKeys.token);
              dispatch(changeScreen(ScreenType.welcome));
            }}
            style={{
              ...styles.settingsButton,
              width: isVertical ? width * 0.8 : width * 0.5,
            }}
            underlayColor="rgba(255,255,255,0.25)">
            <Image
              source={imageNames.deregisterText}
              resizeMode="contain"
              style={{
                width: 170,
                height: 50,
              }}
            />
          </TouchableHighlight>
        </View>
      </View>
      <View style={styles.settingsTokenContainer}>
        <GameText text={token} charSize={isVertical ? 10 : 15} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  settingsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsButtonContainer: {
    marginVertical: 5,
  },
  settingsButton: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsTokenContainer: {
    position: 'absolute',
    bottom: 0,
  },
});

export default SettingsScreen;
