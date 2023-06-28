import { PerkType } from "../../../constants/Boards/general";
import { Direction } from "../../../constants/types";

export type BomberProps = {
  top: number;
  left: number;
  color: string;
  number: number;
  direction: Direction;
  previous: any;
  isMovementChangeable: boolean;
  isLeft: boolean;
  chaosType: PerkType | undefined;
  bomberCount: number;
};

export enum Animations {
  upStationary = 'up-stationary',
  upWalkLeft = 'up-walk-left',
  upWalkRight = 'up-walk-right',

  downStationary = 'down-stationary',
  downWalkLeft = 'down-walk-left',
  downWalkRight = 'down-walk-right',

  leftStationary = 'left-stationary',
  leftWalkLeft = 'left-walk-left',
  leftWalkRight = 'left-walk-right',

  rightStationary = 'right-stationary',
  rightWalkLeft = 'right-walk-left',
  rightWalkRight = 'right-walk-right',
};

export enum BomberSpriteCoordinate {
  upStationaryPosTop = -1.5, //
  upStationaryPosLeft = -164, //

  upWalkLeftPosTop = -1.5, //
  upWalkLeftPosLeft = -203.5, //

  upWalkRightPosTop = -1.5, //
  upWalkRightPosLeft = -123, //

  // -------------------------------

  downStationaryPosTop = -1.5, //
  downStationaryPosLeft = -48, //

  downWalkLeftPosTop = -1.5, //
  downWalkLeftPosLeft = -89, //

  downWalkRightPosTop = -1.5, //
  downWalkRightPosLeft = -8, //

  // -------------------------------

  leftStationaryPosTop = -43, //
  leftStationaryPosLeft = -48, //

  leftWalkLeftPosTop = -43, //
  leftWalkLeftPosLeft = -9, //

  leftWalkRightPosTop = -43, //
  leftWalkRightPosLeft = -88, //

  // -------------------------------

  rightStationaryPosTop = -43, //
  rightStationaryPosLeft = -166, //

  rightWalkLeftPosTop = -43, //
  rightWalkLeftPosLeft = -126, //

  rightWalkRightPosTop = -43, //
  rightWalkRightPosLeft = -207, //

};
