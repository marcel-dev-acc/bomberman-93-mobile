import { Direction } from "../../../types/serverTypes";
import { Animations, BomberSpriteCoordinate } from "./types";

type Postion = {
  top: number;
  left: number;
};

export const getAnimation = (
  position: Postion,
  direction: Direction,
  previous: any,
  isMovementChangeable: boolean,
  isLeft: boolean,
): Animations => {
  let formattedAnimation = Animations.downStationary;

  // By default previous will be undefined so we want down-stationary to be
  // the default
  if (previous === undefined) {
    formattedAnimation = Animations.downStationary;
  }
  // Check if the animation should be stationary as a direction
  // exists but the position never changed
  else if (
    direction === Direction.up &&
    position.top === previous.top
  ) {
    formattedAnimation = Animations.upStationary;
  }
  // Check if the animation should be stationary as a direction
  // exists but the position never changed
  else if (
    direction === Direction.up &&
    position.top !== previous.top
  ) {
    formattedAnimation = !isMovementChangeable ? Animations.upStationary : 
      isLeft ? Animations.upWalkLeft : Animations.upWalkRight;
  }
  // Check if the animation should be stationary as a direction
  // exists but the position never changed
  else if (
    direction === Direction.down &&
    position.top === previous.top
  ) {
    formattedAnimation = Animations.downStationary;
  }
  // Check if the animation should be in transit as a direction
  // exists and the position changed
  else if (
    direction === Direction.down &&
    position.top !== previous.top
  ) {
    formattedAnimation = !isMovementChangeable ? Animations.downStationary : 
      isLeft ? Animations.downWalkLeft : Animations.downWalkRight;
  }
  // Check if the animation should be stationary as a direction
  // exists but the position never changed
  else if (
    direction === Direction.left &&
    position.left === previous.left
  ) {
    formattedAnimation = Animations.leftStationary;
  }
  // Check if the animation should be stationary as a direction
  // exists but the position never changed
  else if (
    direction === Direction.left &&
    position.left !== previous.left
  ) {
    formattedAnimation = !isMovementChangeable ? Animations.leftStationary :
      isLeft ? Animations.leftWalkLeft : Animations.leftWalkRight;
  }
  // Check if the animation should be stationary as a direction
  // exists but the position never changed
  else if (
    direction === Direction.right &&
    position.left === previous.left
  ) {
    formattedAnimation = Animations.rightStationary;
  }
  // Check if the animation should be stationary as a direction
  // exists but the position never changed
  else if (
    direction === Direction.right &&
    position.left !== previous.left
  ) {
    formattedAnimation = formattedAnimation = !isMovementChangeable ? Animations.rightStationary :
      isLeft ? Animations.rightWalkLeft : Animations.rightWalkRight;
  }
  // Check if the animation should be stationary as a direction
  // exists but the position never changed
  else {
    formattedAnimation = Animations.downStationary;
  }

  return formattedAnimation;
};


export const getSpriteCoordinates = (animation: Animations): Postion => {
  switch(animation) {
    // up
    case Animations.upStationary:
      return {
        top: BomberSpriteCoordinate.upStationaryPosTop as number,
        left: BomberSpriteCoordinate.upStationaryPosLeft as number,
      };
    case Animations.upWalkLeft:
      return {
        top: BomberSpriteCoordinate.upWalkLeftPosTop as number,
        left: BomberSpriteCoordinate.upWalkLeftPosLeft as number,
      };
    case Animations.upWalkRight:
      return {
        top: BomberSpriteCoordinate.upWalkRightPosTop as number,
        left: BomberSpriteCoordinate.upWalkRightPosLeft as number,
      };
    // down
    case Animations.downStationary:
      return {
        top: BomberSpriteCoordinate.downStationaryPosTop as number,
        left: BomberSpriteCoordinate.downStationaryPosLeft as number,
      };
    case Animations.downWalkLeft:
      return {
        top: BomberSpriteCoordinate.downWalkLeftPosTop as number,
        left: BomberSpriteCoordinate.downWalkLeftPosLeft as number,
      };
    case Animations.downWalkRight:
      return {
        top: BomberSpriteCoordinate.downWalkRightPosTop as number,
        left: BomberSpriteCoordinate.downWalkRightPosLeft as number,
      };
    // left
    case Animations.leftStationary:
      return {
        top: BomberSpriteCoordinate.leftStationaryPosTop as number,
        left: BomberSpriteCoordinate.leftStationaryPosLeft as number,
      };
    case Animations.leftWalkLeft:
      return {
        top: BomberSpriteCoordinate.leftWalkLeftPosTop as number,
        left: BomberSpriteCoordinate.leftWalkLeftPosLeft as number,
      };
    case Animations.leftWalkRight:
      return {
        top: BomberSpriteCoordinate.leftWalkRightPosTop as number,
        left: BomberSpriteCoordinate.leftWalkRightPosLeft as number,
      };
    // right
    case Animations.rightStationary:
      return {
        top: BomberSpriteCoordinate.rightStationaryPosTop as number,
        left: BomberSpriteCoordinate.rightStationaryPosLeft as number,
      };
    case Animations.rightWalkLeft:
      return {
        top: BomberSpriteCoordinate.rightWalkLeftPosTop as number,
        left: BomberSpriteCoordinate.rightWalkLeftPosLeft as number,
      };
    case Animations.rightWalkRight:
      return {
        top: BomberSpriteCoordinate.rightWalkRightPosTop as number,
        left: BomberSpriteCoordinate.rightWalkRightPosLeft as number,
      };

  }

};