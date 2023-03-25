import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import useSocket from '../../src/hooks/useSocket';
import useUpdateUserId from '../../src/hooks/useUpdateUserId';

function Lobby() {
  const [rooms, setRooms] = useState([]);
  const router = useRouter();
  const socket = useSocket();
  useUpdateUserId();

  useEffect(() => {
    if (socket) {
      socket.emit('joinLobby');
      socket.on('updateRooms', (waitingRooms) => {
        setRooms(waitingRooms);
      });
    }
  }, [socket]);

  const joinRoom = (roomId) => {
    router.push(`/room/${roomId}`);
  };

  return (
    <div>
      <h1>Lobby</h1>
      <ol>
        {rooms.map((room) => (
          <li key={room.id} onClick={() => joinRoom(room.id)}>
            <Button>
              {room.name} ({room.players.length} players)
            </Button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Lobby;
