import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  View,
  useWindowDimensions,
} from 'react-native';
import { useDispatch } from 'react-redux';

import { IntroImage, SplashImage } from '../../components/General';
import { ScreenType, changeScreen } from '../../state/screens/reducer';
import { getIsVertical } from '../../constants/screen';
import imageNames from '../../constants/imageNames';

type WelcomeScreenProps = {
  socket: any;
};

function WelcomeScreen({ socket }: WelcomeScreenProps): JSX.Element {

  const { height, width } = useWindowDimensions();
  const isVertical = getIsVertical(width, height);

  const dispatch = useDispatch();

  const handleShowIntro = async () => {
    await new Promise((resolve: any) => setTimeout(resolve, 8000));
    setShowIntro(false);
  };

  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    if (showIntro) handleShowIntro();
  }, [showIntro]);

  return (
    <View
      style={{
        ...styles.welcomeContainer,
        width: width,
        justifyContent: isVertical ? 'center' : 'flex-end',
        paddingBottom: isVertical ? 0 : 15,
      }}
    >
      {showIntro && <IntroImage />}
      <SplashImage includeHeader />
      <View style={styles.welcomeButtonContainer}>
        <TouchableHighlight
          onPress={(pressEvent) => {
            if (pressEvent.nativeEvent.target === undefined) return;
            dispatch(changeScreen({
              screen: ScreenType.createSession,
            }));
          }}
          style={{
            ...styles.welcomeButton,
            width: isVertical ? width * 0.8 : width * 0.5,
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
      <View style={styles.welcomeButtonContainer}>
        <TouchableHighlight
          onPress={(pressEvent) => {
            if (pressEvent.nativeEvent.target === undefined) return;
            console.warn('[NOT IMPLEMENTED] Show join session');
          }}
          style={{
            ...styles.welcomeButton,
            width: isVertical ? width * 0.8 : width * 0.5,
          }}
          underlayColor='rgba(255,255,255,0.25)'
        >
          <Image
            source={imageNames.joinSessionText}
            resizeMode='contain'
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
            dispatch(changeScreen({
              screen: ScreenType.rules,
            }));
          }}
          text='Rules'
        />
      </View> */}
      <View style={styles.welcomeButtonContainer}>
        <TouchableHighlight
          onPress={(pressEvent) => {
            if (pressEvent.nativeEvent.target === undefined) return;
            dispatch(changeScreen({
              screen: ScreenType.remoteControls,
            }));
          }}
          style={{
            ...styles.welcomeButton,
            width: isVertical ? width * 0.8 : width * 0.5,
          }}
          underlayColor='rgba(255,255,255,0.25)'
        >
          <Image
            source={imageNames.controlsText}
            resizeMode='contain'
            style={{
              width: 145,
              height: 50,
            }}
          />
        </TouchableHighlight>
      </View>
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
});

export default WelcomeScreen;
