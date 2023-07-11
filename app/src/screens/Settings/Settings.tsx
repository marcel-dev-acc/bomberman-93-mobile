import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  useWindowDimensions,
  Image,
} from 'react-native';
import { useDispatch } from 'react-redux';

import colors from '../../constants/colors';
import { ScreenType, changeScreen } from '../../state/screens/reducer';
import { BackButton, Icon, Icons, SplashImage } from '../../components/General';
import { getIsVertical } from '../../constants/screen';
import imageNames from '../../constants/imageNames';
import { StorageKeys, removeData } from '../../utils/localStorage';




function SettingsScreen(): JSX.Element {

  const { height, width } = useWindowDimensions();
  const isVertical = getIsVertical(width, height);

  const dispatch = useDispatch();

  return (
    <View
      style={{
        ...styles.settingsContainer,
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
      <View>
        <View style={styles.settingsButtonContainer}>
          <TouchableHighlight
            onPress={(pressEvent) => {
              if (pressEvent.nativeEvent.target === undefined) return;
              dispatch(changeScreen({
                screen: ScreenType.remoteControls,
              }));
            }}
            style={{
              ...styles.settingsButton,
              width: isVertical ? width * 0.8 : width * 0.5,
            }}
            underlayColor='rgba(255,255,255,0.25)'
          >
            <Image
              source={imageNames.controlsText}
              resizeMode='contain'
              style={{
                width: 140,
                height: 50,
              }}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.settingsButtonContainer}>
          <TouchableHighlight
            onPress={(pressEvent) => {
              if (pressEvent.nativeEvent.target === undefined) return;
              removeData(StorageKeys.token);
              dispatch(changeScreen({
                screen: ScreenType.welcome,
              }));
            }}
            style={{
              ...styles.settingsButton,
              width: isVertical ? width * 0.8 : width * 0.5,
            }}
            underlayColor='rgba(255,255,255,0.25)'
          >
            <Image
              source={imageNames.deregisterText}
              resizeMode='contain'
              style={{
                width: 170,
                height: 50,
              }}
            />
          </TouchableHighlight>
        </View>
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
});

export default SettingsScreen;
