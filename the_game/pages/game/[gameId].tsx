import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useSocket from '../../src/hooks/useSocket';
import ShowBoard from '../../src/components/ShowBoard';

/* if (typeof window !== 'undefined') {
  inspect({
    url: 'https://statecharts.io/inspect', // The URL of the inspect server
    iframe: false, // Set to false if you want to use a separate browser window for the inspector
  });
} */

async function checkRoomExists(gameId: number) {
  const response = await fetch(`/api/room/${gameId}/players`);
  const data = await response.json();
  return data;
}

function GameId() {
  const router = useRouter();
  let { gameId } = router.query;
  gameId = Number(gameId);
  const [gameState, setGameState] = useState(null);

  const socket = useSocket();
  // const [clientState, sendClient] = useMachine(clientMachine, { devTools: true });

  // const { context } = clientState;
  useEffect(() => {
    if (!gameId) return;
    (async () => {
      const roomExists = await checkRoomExists(gameId);
      if (roomExists[0].roomExists === false) {
        await router.push('/'); // Redirect to the home page if the room doesn't exist
      }
    })();
  }, [gameId, router]);

  useEffect(() => {
    if (!socket || !gameId) return;

    // Join the room with the given gameId
    socket.emit('join', gameId);
    socket.on('GAME_STATE_UPDATE', (data) => {
      console.log('GAME_STATE_UPDATE_CLIENT', data);
      setGameState(data);
    });
    return () => {
      socket.emit('leave', gameId);
    };
  }, [socket, gameId]);
  // Listen for server updates and update the client state accordingly
  useEffect(() => {}, [socket]);
  // Render the component based on the client state
  return (
    <>
      <div>Game ID: {gameId}</div>
      {gameState && <ShowBoard gameMatrix={gameState.gameBoard} />}
    </>
  );
}

export default GameId;
