import { Direction, GameEventProps } from "../../../constants/types";
import { GamepadEvent } from "../../../state/gamepad/reducer";

export default function(event: GamepadEvent, dispatcher: (event: GameEventProps) => void) {
  switch (event.action) {
    case Direction.up:
      dispatcher({ type: 'movement', movement: event.action });
      break;
    case Direction.down:
      dispatcher({ type: 'movement', movement: event.action });
      break;
    case Direction.left:
      dispatcher({ type: 'movement', movement: event.action });
      break;
    case Direction.right:
      dispatcher({ type: 'movement', movement: event.action });
      break;
    case 'bomb':
      break;
  }
}