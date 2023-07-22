import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import colors from '../../../constants/colors';
import { entitySizes } from '../../../constants/entitySizes';
import { Icon, Icons } from '../../General';
import { PerkType } from '../../../types/serverTypes';
import { useSelector } from 'react-redux';

type PerkProps = {
  top: number;
  left: number;
  type: PerkType;
  isDark: boolean;
};

function Perk(props: PerkProps): JSX.Element {

  const graphicsEnabled: boolean = useSelector((state: any) => state.screens.graphicsEnabled);

  const perkType = props.type as PerkType;
  let iconName = Icons.fire as Icons.fire |
    Icons.bomb |
    Icons.runFast |
    Icons.bombOff |
    Icons.accessPointMinus |
    Icons.arrowULeftBottom;
  switch (perkType) {
    case PerkType.bombStrength:
      iconName = Icons.fire;
      break;
    case PerkType.chaosBackwards:
      iconName = Icons.arrowULeftBottom;
      break;
    case PerkType.chaosFaster:
      iconName = Icons.runFast;
      break;
    case PerkType.chaosNoBombs:
      iconName = Icons.bombOff;
      break;
    case PerkType.chaosSmallBombs:
      iconName = Icons.accessPointMinus;
      break;
    case PerkType.bombNumber:
      iconName = Icons.bomb;
      break;
  }

  return (
    <View style={{
      ...styles.brickContainer,
      top: props.top,
      left: props.left,
      backgroundColor: graphicsEnabled && !props.isDark ? colors.WHITE : colors.BLACK,
      borderColor: graphicsEnabled && !props.isDark ? colors.BLACK : colors.WHITE,
    }}>
      <Icon
        name={iconName}
        size={15}
        color={graphicsEnabled && !props.isDark ? colors.BLACK : colors.WHITE}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  brickContainer: {
    position: 'absolute',
    width: entitySizes.square.width,
    height: entitySizes.square.height,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
  },
});

export default Perk;
