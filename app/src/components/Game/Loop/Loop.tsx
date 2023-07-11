import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
} from 'react-native';
import { GameLoop, GameLoopUpdateEventOptionType } from 'react-native-game-engine';
import { useSelector } from 'react-redux';
import { Icon, Icons } from '../../General';

import {
  PerkComp,
  BomberComp,
  BrickComp,
  BombComp,
  FireComp,
} from '../../GameEntities';
import colors from '../../../constants/colors';
import { ComponentType } from '../../../constants/types';
import { GameEventProps, SessionDetails } from '../../../constants/types';
import { dimensions } from '../../../constants/screen';
import { DEBUG } from '../../../constants/app';
import { Socket } from 'socket.io-client';
import SocketTypes from '../../../types/socketTypes';
import { Session } from '../../../state/session/reducer';


type LoopProps = {
  socket: Socket;
  entities: any;
  gameRunning: boolean;
  gameTickRef: React.MutableRefObject<number>;
  handleReset: () => void;
  dispatcher: (event: GameEventProps) => void;
};

function Loop({
  socket,
  entities,
  gameRunning,
  gameTickRef,
  handleReset,
  dispatcher,
}: LoopProps): JSX.Element {

  const session: Session = useSelector((state: any) => state.session);
  const debuggerEnabled: boolean = useSelector((state: any) => state.screens.debuggerEnabled);

  const updateHandler = (args: GameLoopUpdateEventOptionType) => {
    // Disable updateHandler loop if debugger is enabled
    if (DEBUG && debuggerEnabled) return;
    // Disable if the game is no longer running
    if (!gameRunning) return;
    // Emit the tick event
    socket.emit(SocketTypes.tick, {
      sessionName: session.name,
      playerNumber: session.playerNumber,
      secret: session.secret,
      tick: gameTickRef.current,
    });
  };

  const engine = useRef(null as any);
  const bombCountRef = useRef(1);
  
  const [volatileEntities, setVolatileEntities] = useState(entities);

  useEffect(() => {
    if (Object.keys(entities).length > 0) setVolatileEntities(entities);
  }, [entities]);

  socket.on(SocketTypes.tickPositiveResponse, (state: SessionDetails) => {
    // Check if objects has keys
    if (Object.keys(state).length === 0) return;
    // Validate that the tick has been kept correctly
    if (state && state.tick === gameTickRef.current + 1) {
      gameTickRef.current = state.tick;
      setVolatileEntities(state.entities);
    }
    // Check if a winner has been defined
    if (
      state &&
      state.isRunning !== undefined &&
      state.isRunning === false &&
      state.winner !== undefined
    ) {
      dispatcher({ type: 'winner', winner: state.winner });
      dispatcher({ type: 'stopped' });
    }
  });

  socket.on(SocketTypes.tickNegativeResponse, (error: string) => {
    console.log('[TICK ERROR]', error);
  });

  return (
    <View>
      <GameLoop
        ref={engine}
        style={{
          ...styles.gameEngine,
          width: dimensions.width,
          height: dimensions.height,
        }}
        onUpdate={updateHandler}
      >
        {Object.keys(volatileEntities).length > 0 && Object.keys(volatileEntities).map((key, idx) => {
          const entity = volatileEntities[key];
          const entityName = entity.name as ComponentType;
          switch (entityName) {
            case ComponentType.bomber:
              return (
                <BomberComp
                  key={idx}
                  number={entity.number}
                  top={entity.top}
                  left={entity.left}
                  color={entity.color}
                  direction={entity.direction}
                  previous={entity.previous}
                  isMovementChangeable={entity.isMovementChangeable}
                  isLeft={entity.isLeft}
                  chaosType={entity.chaosType}
                  bomberCount={bombCountRef.current}
                />
              );
            case ComponentType.perk:
              return (
                <PerkComp
                  key={idx}
                  top={entity.top}
                  left={entity.left}
                  type={entity.type}
                  isDark={entity.isDark}
                />
              );
            case ComponentType.brick:
              return (
                <BrickComp
                  key={idx}
                  top={entity.top}
                  left={entity.left}
                />
              );
            case ComponentType.bomb:
              return (
                <BombComp
                  key={idx}
                  top={entity.top}
                  left={entity.left}
                />
              );
            case ComponentType.fire:
              return (
                <FireComp
                  key={idx}
                  top={entity.top}
                  left={entity.left}
                  type={entity.type}
                />
              );
            default:
              return null;
          }
        })}
      </GameLoop>
      {DEBUG && (
        <TouchableHighlight
          onPress={(pressEvent) => {
            if (pressEvent.nativeEvent.target === undefined) return;
            handleReset();
          }}
          style={styles.loopReset}
          underlayColor='rgba(255,255,255,0.25)'
        >
          <Icon
            name={Icons.reload}
            color={colors.RED}
            size={30}
          />
        </TouchableHighlight>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  gameEngine: {
    backgroundColor: colors.FOREST_GREEN,
    marginTop: -1,
  },
  loopReset: {
    position: 'absolute',
    top: 10,
    left: -45,
    borderRadius: 5,
    marginRight: 20,
  },
});

export default Loop;
