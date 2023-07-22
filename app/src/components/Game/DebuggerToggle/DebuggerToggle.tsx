import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Switch,
  Text,
  GestureResponderEvent,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {toggleDebugger} from '../../../state/screens/reducer';
import colors from '../../../constants/colors';

function DebuggerToggle(): JSX.Element {
  const debuggerEnabled: boolean = useSelector(
    (state: any) => state.screens.debuggerEnabled,
  );

  const dispatch = useDispatch();

  const handleOnChange = (event: GestureResponderEvent) => {
    if (event.nativeEvent.target === undefined) {
      return;
    }
    dispatch(toggleDebugger());
  };

  return (
    <View style={styles.debuggerToggleContainer}>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={debuggerEnabled ? colors.BLUE : colors.WHITE}
        ios_backgroundColor="#3e3e3e"
        onTouchStart={handleOnChange}
        value={debuggerEnabled}
      />
      <Text style={styles.debuggerToggleText}>Enable debugger</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  debuggerToggleContainer: {
    position: 'absolute',
    top: 100,
    left: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  debuggerToggleText: {
    marginLeft: 5,
    color: colors.RED,
  },
});

export default DebuggerToggle;
