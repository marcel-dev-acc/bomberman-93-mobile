import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  View,
  useWindowDimensions,
} from 'react-native';
import {useDispatch} from 'react-redux';

import {IntroImage, ServerStatus, SplashImage} from '../../components/General';
import {ScreenType, changeScreen} from '../../state/screens/reducer';
import {getIsVertical} from '../../constants/screen';
import imageNames from '../../constants/imageNames';
import {DEBUG} from '../../constants/app';

type WelcomeScreenProps = {
  showIntro: boolean;
  serverStatus: ServerStatus;
};

function WelcomeScreen({
  showIntro,
  serverStatus,
}: WelcomeScreenProps): JSX.Element {
  const {height, width} = useWindowDimensions();
  const isVertical = getIsVertical(width, height);

  const dispatch = useDispatch();

  return (
    <View
      style={{
        ...styles.welcomeContainer,
        width: width,
        justifyContent:
          !isVertical && serverStatus !== ServerStatus.unregistered
            ? 'flex-end'
            : 'center',
      }}>
      {!DEBUG && showIntro && <IntroImage />}
      <SplashImage includeHeader />
      <View style={styles.forEducationalPurposesOnlyContainer}>
        <Image
          source={imageNames.forEducationalPurposesOnlyText}
          resizeMode="contain"
          style={{
            width: isVertical ? 400 : 480,
            height: 30,
          }}
        />
      </View>
      {serverStatus === ServerStatus.unregistered && (
        <View
          style={{
            ...styles.welcomeButtonContainer,
            marginTop: isVertical ? 0 : 40,
          }}>
          <TouchableHighlight
            onPress={pressEvent => {
              if (pressEvent.nativeEvent.target === undefined) return;
              dispatch(changeScreen(ScreenType.register));
            }}
            style={{
              ...styles.welcomeButton,
              width: isVertical ? width * 0.8 : width * 0.5,
            }}
            underlayColor="rgba(255,255,255,0.25)">
            <Image
              source={imageNames.registerText}
              resizeMode="contain"
              style={{
                width: 240,
                height: 40,
              }}
            />
          </TouchableHighlight>
        </View>
      )}
      {serverStatus !== ServerStatus.unregistered && (
        <View>
          <View style={styles.welcomeButtonContainer}>
            <TouchableHighlight
              onPress={pressEvent => {
                if (pressEvent.nativeEvent.target === undefined) return;
                dispatch(changeScreen(ScreenType.createSession));
              }}
              style={{
                ...styles.welcomeButton,
                width: isVertical ? width * 0.8 : width * 0.5,
              }}
              underlayColor="rgba(255,255,255,0.25)">
              <Image
                source={imageNames.createSessionText}
                resizeMode="contain"
                style={{
                  width: 260,
                  height: 50,
                }}
              />
            </TouchableHighlight>
          </View>
          <View style={styles.welcomeButtonContainer}>
            <TouchableHighlight
              onPress={pressEvent => {
                if (pressEvent.nativeEvent.target === undefined) return;
                dispatch(changeScreen(ScreenType.joinSession));
              }}
              style={{
                ...styles.welcomeButton,
                width: isVertical ? width * 0.8 : width * 0.5,
              }}
              underlayColor="rgba(255,255,255,0.25)">
              <Image
                source={imageNames.joinSessionText}
                resizeMode="contain"
                style={{
                  width: 210,
                  height: 50,
                }}
              />
            </TouchableHighlight>
          </View>
          {/* <View style={styles.welcomeButtonContainer}>
            <Button
              onPress={(pressEvent) => {
                if (pressEvent.nativeEvent.target === undefined) return;
                dispatch(changeScreen(ScreenType.rules));
              }}
              text='Rules'
            />
          </View> */}
          <View style={styles.welcomeButtonContainer}>
            <TouchableHighlight
              onPress={pressEvent => {
                if (pressEvent.nativeEvent.target === undefined) return;
                dispatch(changeScreen(ScreenType.settings));
              }}
              style={{
                ...styles.welcomeButton,
                width: isVertical ? width * 0.8 : width * 0.5,
              }}
              underlayColor="rgba(255,255,255,0.25)">
              <Image
                source={imageNames.settingsText}
                resizeMode="contain"
                style={{
                  width: 135,
                  height: 50,
                }}
              />
            </TouchableHighlight>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    alignItems: 'center',
  },
  welcomeButtonContainer: {
    marginVertical: 5,
  },
  welcomeButton: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forEducationalPurposesOnlyContainer: {
    position: 'absolute',
    top: 0,
  },
});

export default WelcomeScreen;
