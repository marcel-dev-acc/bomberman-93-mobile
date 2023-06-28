import React, {useState,useEffect,useRef, Dispatch} from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  View,
  useWindowDimensions,
  GestureResponderEvent,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';


import { Icon, Icons } from '../../components/General';
import { ScreenType, changeScreen } from '../../state/screens/reducer';
import colors from '../../constants/colors';
import type { Session } from '../../state/session/reducer';
import { changeWinner } from '../../state/session/reducer';
import {
  BombsCount,
  Controls,
  DebuggerToggle,
  FireCount,
  GraphicsToggle,
  Loop,
  StaticEntities,
  GameOptionsMenu,
  Timer,
} from '../../components/Game';
import { Direction, GameEventProps, SessionDetails } from '../../constants/types';
import { DEBUG } from '../../constants/app';
import { Socket } from 'socket.io-client';
import SocketTypes from '../../types/socketTypes';


const countDownTime: number = 3 * 60;

type GameScreenProps = {
  socket: Socket
};

function GameScreen({
  socket,
}: GameScreenProps): JSX.Element {
  
  const { height, width } = useWindowDimensions();
  const session: Session = useSelector((state: any) => state.session);
  const debuggerEnabled: boolean = useSelector((state: any) => state.screens.debuggerEnabled);

  const dispatch = useDispatch();

  const handleEvent = (e: GameEventProps) => {
    if (e.type === 'winner' && e.winner) {
      dispatch(changeWinner(session.players[e.winner - 1]));
      // Set entities to an empty object
      setEntities({});
      setGameRunning(false);
      // Navigate to outcome screen
      dispatch(changeScreen({
        screen: ScreenType.winner,
      }));
    }
    if (e.type === 'stopped') {
    }
    if (e.type === 'bomb') {
      // Handle any extra bomb specific UI
    }
    if (e.type === 'add-bomb') {
      // Handle any extra add-bomb specific UI
    }
    if (e.type === 'add-bomb-strength') {
      const newBombsStrengthCount = fireCount + 1;
      setFireCount(newBombsStrengthCount);
    }
  };

  const handleMovePress = (direction: Direction, isMoving: boolean) => {
    const event: GameEventProps = {
      type: 'movement',
      movement: direction,
    };
    dispatcher(event);
    if (debuggerEnabled) socket.emit(SocketTypes.tick, {
      sessionName: session.name,
      playerNumber: session.playerNumber,
      secret: session.secret,
      tick: gameTickRef.current,
    });
    if (isMoving) {
      if (direction === Direction.up) isMovingUp.current = true;
      if (direction === Direction.down) isMovingDown.current = true;
      if (direction === Direction.left) isMovingLeft.current = true;
      if (direction === Direction.right) isMovingRight.current = true;
    }
    setTimeout(() => {
      if (direction === Direction.up && isMovingUp.current) handleMovePress(direction, isMovingUp.current);
      if (direction === Direction.down && isMovingDown.current) handleMovePress(direction, isMovingDown.current);
      if (direction === Direction.left && isMovingLeft.current) handleMovePress(direction, isMovingLeft.current);
      if (direction === Direction.right && isMovingRight.current) handleMovePress(direction, isMovingRight.current);
    }, 100);
  };

  const handleBombPress = (pressEvent: GestureResponderEvent) => {
    if (pressEvent.nativeEvent.target === undefined) return;
    dispatcher({ type: 'bomb' });
  };

  const handleReset = () => {
    dispatcher({ type: 'stopped' });
    dispatcher({ type: 'started' });
    setTimer(countDownTime);
  };

  const dispatcher = (event: GameEventProps) => {
    // Emit an event to the socket
    socket.emit(SocketTypes.event, {
      sessionName: session.name,
      playerNumber: session.playerNumber,
      secret: session.secret,
      event: event,
    });
    handleEvent(event);
  };

  const gameStartedRef = useRef(false);
  const gameTickRef = useRef(0);
  const isMovingUp = useRef(false);
  const isMovingDown = useRef(false);
  const isMovingLeft = useRef(false);
  const isMovingRight = useRef(false);

  const [gameRunning, setGameRunning] = useState(true);
  const [bombsCount, setBombsCount] = useState(0);
  const [fireCount, setFireCount] = useState(0); // This should be adjusted based on state changes, on events
  const [entities, setEntities] = useState({} as any);
  const [timer, setTimer] = useState(countDownTime);

  useEffect(() => {
    if (width < height) {
      // In portrait mode
      dispatch(changeScreen({
        screen: ScreenType.rotate,
      }));
    }
  }, [width, height]);

  // Get the initial game state
  useEffect(() => {
    if (!gameStartedRef.current) dispatcher({ type: 'started' });
  }, [gameStartedRef.current]);

  socket.on(SocketTypes.eventPositiveResponse, (state: SessionDetails) => {
    // Check if objects has keys
    if (Object.keys(state).length === 0) return;
    // This is specifically for the game start scenario
    if (!gameStartedRef.current && state && state.entities) {
      setEntities(state.entities);
      gameStartedRef.current = true;
    }
    /* Other events are logged here currently */
    // Calculate how many bombs player has
    const filteredEntity = Object.keys(state?.entities).filter(entityKey =>
      state?.entities[entityKey].name === 'bomber' &&
      state?.entities[entityKey].number === session.playerNumber
    );
    if (filteredEntity.length) {
      setBombsCount(state?.entities[filteredEntity[0]].bombs);
      setFireCount(state?.entities[filteredEntity[0]].bombDepth);
    }
  });

  socket.on(SocketTypes.eventNegativeResponse, (error: string) => {
    console.log('[EVENT ERROR]', error);
  });

  return (
    <View style={{
      ...styles.gameContainer,
      width: width,
      height: height,
    }}>
      
      <Timer
        baseTimer={timer}
        dispatcher={dispatcher}
      />
      <View style={styles.optionsContainer}>
        <TouchableHighlight
          onPress={(pressEvent) => {
            if (pressEvent.nativeEvent.target === undefined) return;
            dispatcher({ type: gameRunning ? 'paused' : 'unpaused' });
            setGameRunning(!gameRunning);
          }}
          style={{ borderRadius: 5, marginRight: 20, }}
          underlayColor='rgba(255,255,255,0.25)'
        >
          {gameRunning ? 
            <Icon
              name={Icons.pause}
              color={colors.WHITE}
              size={30}
            />
            :
            <Icon
              name={Icons.play}
              color={colors.WHITE}
              size={30}
            />
          }
        </TouchableHighlight>
      </View>
      <Controls
        handleMovePress={handleMovePress}
        isMovingUp={isMovingUp}
        isMovingDown={isMovingDown}
        isMovingLeft={isMovingLeft}
        isMovingRight={isMovingRight}
      />
      {DEBUG && (
        <GraphicsToggle />
      )}
      {DEBUG && (
        <DebuggerToggle />
      )}
      <Loop
        socket={socket}
        entities={entities}
        gameRunning={gameRunning}
        gameTickRef={gameTickRef}
        handleReset={handleReset}
        dispatcher={dispatcher}
      />
      <StaticEntities
        entities={entities}
      />
      <GameOptionsMenu
        setGameRunning={setGameRunning}
        handleReset={handleReset}
      />
      <FireCount
        fireCount={fireCount}
      />
      <BombsCount
        bombsCount={bombsCount}
      />
      <View style={styles.bombButtonContainer}>
        <TouchableHighlight
          onPress={handleBombPress}
          style={{ borderRadius: 5, }}
          underlayColor='rgba(255,255,255,0.25)'
        >
          <Icon
            name={Icons.bomb}
            color={colors.WHITE}
            size={50}
          />
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    left: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bombButtonContainer: {
    position: 'absolute',
    bottom: 80,
    right: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameText: {
    color: colors.WHITE,
    fontSize: 20,
  },
});

export default GameScreen;
