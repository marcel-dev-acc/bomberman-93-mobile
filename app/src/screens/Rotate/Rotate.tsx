import React, {useEffect} from 'react';
import {StyleSheet, View, useWindowDimensions, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {Icon, Icons, SplashImage} from '../../components/General';
import {changeScreen} from '../../state/screens/reducer';
import colors from '../../constants/colors';
import imageNames from '../../constants/imageNames';

function RotateScreen(): JSX.Element {
  const {previousScreen} = useSelector((state: any) => state.screens);
  const {height, width} = useWindowDimensions();

  const dispatch = useDispatch();

  useEffect(() => {
    if (width > height) {
      // In landscape mode
      dispatch(changeScreen(previousScreen));
    }
  }, [width, height]);

  return (
    <View
      style={{
        ...styles.rotateContainer,
        width: width,
      }}>
      <SplashImage includeHeader />
      <Image
        source={imageNames.pleaseRotateText}
        resizeMode="contain"
        style={{
          width: 250,
          height: 50,
        }}
      />
      <Image
        source={imageNames.yourScreenText}
        resizeMode="contain"
        style={{
          width: 250,
          height: 50,
        }}
      />
      <View
        style={{
          marginTop: 20,
        }}>
        <Icon name={Icons.screenRotation} color={colors.WHITE} size={50} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rotateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RotateScreen;
