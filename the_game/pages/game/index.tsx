import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import useSocket from '../../src/hooks/useSocket';

function ActiveGames() {
  const [activeGames, setActiveGames] = useState([]);
  const socket = useSocket();
  const router = useRouter();

  useEffect(() => {
    if (socket) {
      socket.emit('getActiveGames');
      socket.on('updateActiveGames', (playingRooms) => {
        setActiveGames(playingRooms);
      });
    }

    return () => {
      if (socket) {
        socket.off('updateActiveGames');
      }
    };
  }, [socket]);

  const joinGame = (gameId) => {
    router.push(`/game/${gameId}`);
  };

  return (
    <div>
      <h1>Active Games</h1>
      <ol>
        {activeGames.map((game) => (
          <li key={game.id} onClick={() => joinGame(game.id)}>
            <Button>
              {game.name} ({game.players.length} players)
            </Button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ActiveGames;
