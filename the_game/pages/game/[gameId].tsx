import { useRouter } from 'next/router';
import { useMachine } from '@xstate/react';
import React, { useEffect } from 'react';
import useSocket from '../../src/hooks/useSocket';
import parentMachine from '../../src/Types/Xstate/Back-end/main-back-machine';
import preparationMachine from '../../src/Types/Xstate/Back-end/PreparationGame';

export async function fetchPlayers(roomId: number) {
  const response = await fetch(`/api/room/${roomId}/players`);
  const players = await response.json();
  return players;
}

function GameId() {
  const router = useRouter();
  let { gameId } = router.query;
  gameId = Number(gameId);

  const socket = useSocket();
  const [parentState, send] = useMachine(parentMachine, { devTools: true });
  const [ChildState, ChildSend] = useMachine(preparationMachine, { devTools: true });

  useEffect(() => {
    async function loadPlayers() {
      console.log('loadPlayers');
      const players = await fetchPlayers(gameId);
      // Send the players to the parentState machine
      console.log('players', players);
      send({ type: 'SET_PLAYERS', players });
    }

    loadPlayers();
  }, [gameId, send]);

  return (
    <>
      <div>Game ID: {gameId}</div>
      <div>
        <h1>Child Comp</h1>
        {/* <p>Current context: {JSON.stringify(ChildState.context)}</p> */}
        <p>Current state: {ChildState.value}</p>
        {ChildState.matches('preparationComplete') ? <p>Preparation is complete!</p> : <button>Start Preparation</button>}
        {ChildState.done && <p>Done processing!</p>}
      </div>
      <div>
        <p>Current state of BIG: {parentState.value}</p>
        {parentState.done && <p>Done processing!</p> && JSON.stringify(parentState.context.players)}
      </div>
    </>
  );
}

export default GameId;
