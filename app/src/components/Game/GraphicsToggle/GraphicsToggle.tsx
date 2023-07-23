import React from 'react';
import {
  StyleSheet,
  View,
  Switch,
  Text,
  GestureResponderEvent,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {toggleGraphics} from '../../../state/screens/reducer';
import colors from '../../../constants/colors';

function GraphicsToggle(): JSX.Element {
  const graphicsEnabled: boolean = useSelector(
    (state: any) => state.screens.graphicsEnabled,
  );

  const dispatch = useDispatch();

  const handleOnChange = (event: GestureResponderEvent) => {
    if (event.nativeEvent.target === undefined) {
      return;
    }
    dispatch(toggleGraphics());
  };

  return (
    <View style={styles.grapgicsToggleContainer}>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={graphicsEnabled ? colors.BLUE : colors.WHITE}
        ios_backgroundColor="#3e3e3e"
        onTouchStart={handleOnChange}
        value={graphicsEnabled}
      />
      <Text style={styles.graphicsToggleText}>Enable graphics</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  grapgicsToggleContainer: {
    position: 'absolute',
    top: 60,
    left: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphicsToggleText: {
    marginLeft: 5,
    color: colors.RED,
  },
});

export default GraphicsToggle;
