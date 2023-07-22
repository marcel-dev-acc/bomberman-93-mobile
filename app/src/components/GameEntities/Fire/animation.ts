import {FireType} from '../../../types/serverTypes';

export const getSpriteCoordinates = (fireType: FireType) => {
  switch (fireType) {
    case FireType.center: //
      return {
        top: -1,
        left: -81,
        transform: [{rotate: '0deg'}],
      };
    case FireType.up: //
      return {
        top: -29.5,
        left: -111,
        transform: [{rotate: '90deg'}],
      };
    case FireType.upEnd: //
      return {
        top: -29.5,
        left: -142.5,
        transform: [{rotate: '270deg'}],
      };
    case FireType.down: //
      return {
        top: -29.5,
        left: -111,
        transform: [{rotate: '90deg'}],
      };
    case FireType.downEnd: //
      return {
        top: -29.5,
        left: -82.5,
        transform: [{rotate: '90deg'}],
      };
    case FireType.left: //
      return {
        top: -31.5,
        left: -81,
        transform: [{rotate: '0deg'}],
      };
    case FireType.leftEnd: //
      return {
        top: 0.9,
        left: -112,
        transform: [{rotate: '180deg'}],
      };
    case FireType.right: //
      return {
        top: -31.5,
        left: -81,
        transform: [{rotate: '0deg'}],
      };
    case FireType.rightEnd: //
      return {
        top: -59,
        left: -81.5,
        transform: [{rotate: '0deg'}],
      };
  }
};
