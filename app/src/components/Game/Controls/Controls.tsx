import React from 'react';
import {StyleSheet, View, TouchableHighlight} from 'react-native';
import {Icon, Icons} from '../../General';

import colors from '../../../constants/colors';
import {Direction} from '../../../constants/types';

type ControlsProps = {
  handleMovePress: (direction: Direction, isMoving: boolean) => void;
  isMovingUp: React.MutableRefObject<boolean>;
  isMovingDown: React.MutableRefObject<boolean>;
  isMovingLeft: React.MutableRefObject<boolean>;
  isMovingRight: React.MutableRefObject<boolean>;
};

function Controls({
  handleMovePress,
  isMovingUp,
  isMovingDown,
  isMovingLeft,
  isMovingRight,
}: ControlsProps): JSX.Element {
  return (
    <View style={styles.movementButtonContainer}>
      <View style={styles.movementCenter}>
        <TouchableHighlight
          onPressIn={pressEvent => {
            if (pressEvent.nativeEvent.target === undefined) return;
            handleMovePress(Direction.up, true);
          }}
          onPressOut={pressEvent => {
            if (pressEvent.nativeEvent.target === undefined) return;
            isMovingUp.current = false;
          }}
          style={{borderRadius: 5}}
          underlayColor="rgba(255,255,255,0.25)">
          <Icon name={Icons.arrowUp} color={colors.WHITE} size={40} />
        </TouchableHighlight>
      </View>
      <View style={styles.movementRow}>
        <View>
          <TouchableHighlight
            onPressIn={pressEvent => {
              if (pressEvent.nativeEvent.target === undefined) return;
              handleMovePress(Direction.left, true);
            }}
            onPressOut={pressEvent => {
              if (pressEvent.nativeEvent.target === undefined) return;
              isMovingLeft.current = false;
            }}
            style={{borderRadius: 5}}
            underlayColor="rgba(255,255,255,0.25)">
            <Icon name={Icons.arrowLeft} color={colors.WHITE} size={40} />
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight
            onPressIn={pressEvent => {
              if (pressEvent.nativeEvent.target === undefined) return;
              handleMovePress(Direction.right, true);
            }}
            onPressOut={pressEvent => {
              if (pressEvent.nativeEvent.target === undefined) return;
              isMovingRight.current = false;
            }}
            style={{borderRadius: 5}}
            underlayColor="rgba(255,255,255,0.25)">
            <Icon name={Icons.arrowRight} color={colors.WHITE} size={40} />
          </TouchableHighlight>
        </View>
      </View>
      <View style={styles.movementCenter}>
        <TouchableHighlight
          onPressIn={pressEvent => {
            if (pressEvent.nativeEvent.target === undefined) return;
            handleMovePress(Direction.down, true);
          }}
          onPressOut={pressEvent => {
            if (pressEvent.nativeEvent.target === undefined) return;
            isMovingDown.current = false;
          }}
          style={{borderRadius: 5}}
          underlayColor="rgba(255,255,255,0.25)">
          <Icon name={Icons.arrowDown} color={colors.WHITE} size={40} />
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  movementButtonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    width: 120,
  },
  movementCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  movementRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Controls;
