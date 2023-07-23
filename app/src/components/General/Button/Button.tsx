import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  useWindowDimensions,
  GestureResponderEvent,
} from 'react-native';

import colors from '../../../constants/colors';

type ButtonProps = {
  customButtonStyle?: any;
  customTextStyle?: any;
  onPress: (pressEvent: GestureResponderEvent) => void;
  text: string;
};

function Button({
  customButtonStyle,
  customTextStyle,
  onPress,
  text,
}: ButtonProps): JSX.Element {
  const {width} = useWindowDimensions();

  return (
    <TouchableHighlight
      onPress={onPress}
      style={{borderRadius: 5}}
      underlayColor="rgba(255,255,255,0.25)">
      <View
        style={{
          ...styles.buttonContainer,
          width: width * 0.8,
          ...customButtonStyle,
        }}>
        <Text
          style={{
            ...styles.buttonText,
            ...customTextStyle,
          }}>
          {text}
        </Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 400,
    borderColor: colors.WHITE,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: colors.WHITE,
    fontSize: 20,
  },
});

export default Button;
