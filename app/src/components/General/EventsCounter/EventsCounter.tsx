import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import {useSelector} from 'react-redux';

import colors from '../../../constants/colors';



function EventsCounter(): JSX.Element {

  // return gamepad.deviceId !== undefined ? (
  //   <View style={styles.eventsCounterContainer}>
  //     <Text style={styles.eventsCounterText}>
  //       {gamepad.events.length >= 0 && gamepad.events.length < 100 ? gamepad.events.length : '99+'}
  //     </Text>
  //   </View>
  // ) : <View></View>;

  return (
    <View></View>
  );
}

const styles = StyleSheet.create({
  eventsCounterContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    borderWidth: 1,
    borderColor: colors.WHITE,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  eventsCounterText: {
    color: colors.WHITE,
  },
});

export default EventsCounter;
