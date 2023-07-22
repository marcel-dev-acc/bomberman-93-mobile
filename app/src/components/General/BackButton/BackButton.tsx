import React from 'react';
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  TouchableHighlight,

} from 'react-native';
import imageNames from '../../../constants/imageNames';

type BackButtonProps = {
  onPress: (pressEvent: GestureResponderEvent) => void;
};

function BackButton({
  onPress,
}: BackButtonProps): JSX.Element {

  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor='rgba(255,255,255,0.25)'
      style={styles.backButtonIcon}
    >
      <Image
        source={imageNames.arrowLeftText}
        resizeMode='contain'
        style={{
          width: 40,
          height: 40,
        }}
      />
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  backButtonIcon: {
    position: 'absolute',
    zIndex: 1,
    top: 5,
    left: 5,
    width: 45,
    borderRadius: 200,
    padding: 2.5,
  },
});

export default BackButton;
