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
import type { Session } from '../../types/session';
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
import { Direction, GameEventProps, SessionDetails } from '../../types/serverTypes';
import { DEBUG } from '../../constants/app';
import { Socket } from 'socket.io-client';
import SocketTypes from '../../types/socketTypes';
import { EventGameServerResponse, NegativeResponse } from '../../types/serverTypes';


const countDownTime: number = 3 * 60;

type GameScreenProps = {
  socketRef: React.MutableRefObject<Socket | undefined>;
  sessionRef: React.MutableRefObject<Session>;
};

function GameScreen({
  socketRef,
  sessionRef,
}: GameScreenProps): JSX.Element {
  
  const { height, width } = useWindowDimensions();
  // const session: Session = useSelector((state: any) => state.session);
  const debuggerEnabled: boolean = useSelector((state: any) => state.screens.debuggerEnabled);

  const dispatch = useDispatch();

  const handleEvent = (e: GameEventProps) => {
    if (e.type === 'winner' && e.winner) {
      sessionRef.current = {
        ...sessionRef.current,
        winner: sessionRef.current.players[e.winner - 1],
      } as Session;
      // Set entities to an empty object
      setEntities({});
      setGameRunning(false);
      // Navigate to outcome screen
      dispatch(changeScreen(ScreenType.winner));
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
    if (debuggerEnabled) socketRef.current?.emit(SocketTypes.tickRelay, {
      sessionName: sessionRef.current.name,
      playerNumber: sessionRef.current.playerNumber,
      secret: sessionRef.current.secret,
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
    socketRef.current?.emit(SocketTypes.eventRelay, {
      sessionName: sessionRef.current.name,
      playerNumber: sessionRef.current.playerNumber,
      secret: sessionRef.current.secret,
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
      dispatch(changeScreen(ScreenType.rotate));
    }
  }, [width, height]);

  // Get the initial game state
  useEffect(() => {
    if (!gameStartedRef.current) dispatcher({ type: 'started' });
  }, [gameStartedRef.current]);

  socketRef.current?.on(SocketTypes.eventRelayPositiveResponse, (response: EventGameServerResponse) => {
    if (
      DEBUG &&
      response.data.secret !== sessionRef.current.secret
    ) console.warn(`[${SocketTypes.eventRelayPositiveResponse}]`, JSON.stringify(response.data));
    // Check if incoming response is for the player
    if (response.data.secret !== sessionRef.current.secret) return;
    // Check if objects has keys
    if (Object.keys(response.state).length === 0) return;
    const state = response.state as SessionDetails;
    // This is specifically for the game start scenario
    if (!gameStartedRef.current && state && state?.entities) {
      setEntities(state.entities);
      gameStartedRef.current = true;
    }
    /* Other events are logged here currently */
    // Calculate how many bombs player has
    const filteredEntity = Object.keys(state?.entities).filter(entityKey =>
      state?.entities[entityKey].name === 'bomber' &&
      state?.entities[entityKey].number === sessionRef.current.playerNumber
    );
    if (filteredEntity.length) {
      setBombsCount(state?.entities[filteredEntity[0]].bombs);
      setFireCount(state?.entities[filteredEntity[0]].bombDepth);
    }
  });

  socketRef.current?.on(SocketTypes.eventRelayNegativeResponse, (response: NegativeResponse) => {
    if (
      DEBUG &&
      response.data?.secret !== sessionRef.current.secret
    ) console.warn(`[${SocketTypes.joinSessionRelayNegativeResponse}]`, response.error);
    // Check if incoming response is for the player
    if (response.data?.secret !== sessionRef.current.secret) return;
    console.warn('[EVENT ERROR]', response.error);
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
        socketRef={socketRef}
        sessionRef={sessionRef}
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
