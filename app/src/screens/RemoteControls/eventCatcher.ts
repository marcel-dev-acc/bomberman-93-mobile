import { Socket } from 'socket.io-client';
import {
  AndroidGamepadEvent,
} from '../../native/interface';
import { Session } from '../../types/session';
import { Direction, GameEventProps } from '../../constants/types';
import SocketTypes from '../../types/socketTypes';
import { AndroidGamepadProfile } from './types';

const eventCatcher = (
  event: AndroidGamepadEvent,
  session: Session,
  socket: Socket,
  activeGamepadProfile: AndroidGamepadProfile,
) => {
  // Check if the session is populated
  if (!session.secret) return;
  // Check if the event is a bomb key press
  if (event.keyCode === activeGamepadProfile.bombKey) {
    const socketEvent: GameEventProps = {
      type: 'bomb',
    };
    socket.emit(SocketTypes.event, {
      sessionName: session.name,
      playerNumber: session.playerNumber,
      secret: session.secret,
      event: socketEvent,
    });
    return;
  }
  // Define the direction of the event keyCode
  let direction: Direction | undefined = undefined;
  switch (event.keyCode) {
    case activeGamepadProfile.upKey:
      direction = Direction.up;
      break;
    case activeGamepadProfile.downKey:
      direction = Direction.down;
      break;
    case activeGamepadProfile.leftKey:
      direction = Direction.left;
      break;
    case activeGamepadProfile.rightKey:
      direction = Direction.right;
      break;
  }
  if (!direction) return;
  const socketEvent: GameEventProps = {
    type: 'movement',
    movement: direction,
  };
  socket.emit(SocketTypes.event, {
    sessionName: session.name,
    playerNumber: session.playerNumber,
    secret: session.secret,
    event: socketEvent,
  });
};

export default eventCatcher;