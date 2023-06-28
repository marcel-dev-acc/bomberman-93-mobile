import React from 'react';
import {
  Image,
} from 'react-native';

import colors from '../../../constants/colors';
import { Icons, getIconImage } from './iconMap';



type IconProps = {
  name: Icons;
  size: number;
  style?: any;
  color: string;
};

function Icon(props: IconProps): JSX.Element {

  let iconSrc = getIconImage(props.name);

  return (
    <Image
      style={props.style ? {
        ...props.style,
        width: props.size,
        height: props.size,
        tintColor: props.color ? props.color : colors.WHITE,
      } : {
        width: props.size,
        height: props.size,
        tintColor: props.color ? props.color : colors.WHITE,
      }}
      source={iconSrc}
    />
  );
}

export default Icon;
