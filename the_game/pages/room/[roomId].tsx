import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import useSocket from '../../src/hooks/useSocket';

function Room() {
  const [room, setRoom] = useState(null);
  const router = useRouter();
  const { roomId } = router.query;
  const userId = useSelector((state) => state.auth.userId);
  const socket = useSocket();

  useEffect(() => {
    console.log('socket', socket);
    console.log('roomId', roomId);
    console.log('userId', userId);
    if (socket && roomId && userId) {
      socket.emit('joinRoom', { roomId, userId });
      socket.on('updateRoom', (updatedRoom) => {
        setRoom(updatedRoom);
      });

      return () => {
        socket.emit('leaveRoom', { roomId, userId });
      };
    }
  }, [socket, roomId, userId]);

  if (!room) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{room.name}</h1>
      <h2>Players:</h2>
      <ul>
        {room.players.map((player) => (
          <li key={player.id}>{player.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default Room;
