import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import useSocket from '../../src/hooks/useSocket';
import useUpdateUserId from '../../src/hooks/useUpdateUserId';

function Room() {
  const [room, setRoom] = useState(null);
  const navigatingToGame = useRef(false);
  const router = useRouter();
  const { roomId } = router.query;
  const socket = useSocket();
  useUpdateUserId();
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    console.log('socket', socket);
    console.log('roomId', roomId);
    console.log('userId', userId);
    if (socket && roomId && userId) {
      socket.emit('joinRoom', { roomId, userId });
      socket.on('updateRoom', (updatedRoom) => {
        setRoom(updatedRoom);
      });
      socket.on('gameStarted', ({ roomId }) => {
        navigatingToGame.current = true;
        router.push(`/game/${roomId}`);
      });
      return () => {
        if (!navigatingToGame.current) {
          socket.emit('leaveRoom', { roomId, userId });
        }
      };
    }
  }, [socket, roomId, userId]);
  const disconnect = () => {
    if (socket) {
      socket.emit('disconnectRoom', { roomId, userId });
      router.push('/Lobby');
    }
  };
  const startGame = () => {
    if (socket) {
      socket.emit('startGame', { roomId });
      router.push(`/game/${roomId}`);
    }
  };
  if (!room) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Name: {room.name}</h1>
      <h1>Status of the room: {room.gameState}</h1>
      <h2>Players:</h2>
      <ul>
        {room.players.map((player) => (
          <li key={player.id}>
            <h3>{player.username}</h3>
          </li>
        ))}
      </ul>
      {room.players.length >= 3 && <Button onClick={startGame}>Start Game</Button>}
      <Button onClick={disconnect}>Disconnect</Button>
    </div>
  );
}

export default Room;
