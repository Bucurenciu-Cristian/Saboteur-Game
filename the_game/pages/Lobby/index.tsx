import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import useSocket from "../../src/hooks/useSocket";
import useUpdateUserId from "../../src/hooks/useUpdateUserId";

function Lobby() {
  const [rooms, setRooms] = useState([]);
  const router = useRouter();
  const socket = useSocket();
  useUpdateUserId();
  const userId = useSelector((state) => state.auth.userId);
  
  const [newRoomName, setNewRoomName] = useState("");
  
  const createRoom = () => {
    if (socket && newRoomName) {
      socket.emit("createRoom", { userId, roomName: newRoomName });
      socket.on("roomCreated", (newRoomId) => {
        router.push(`/room/${newRoomId}`);
      });
    }
  };
  
  useEffect(() => {
    const checkUserRoom = async () => {
      if (userId) {
        const response = await fetch(`/api/user/${userId}/room`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.roomId) {
            router.push(`/room/${data.roomId}`);
          }
        }
      }
    };
    
    checkUserRoom();
  }, [userId, router]);
  
  useEffect(() => {
    if (socket) {
      socket.emit("joinLobby");
      socket.on("updateRooms", (waitingRooms) => {
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
      <h2>UserID: {userId}</h2>
      <ol>
        {rooms.map((room) => (
          <li key={room.id}>
            <Button onClick={() => joinRoom(room.id)}>
              {room.name} ({room.players.length} players) - {room.gameState}
            </Button>
            {room.players.map((player) => (
              <div key={player.id}> {player.id} -> {player.username} -> {player.email}</div>
            ))}
          </li>
        ))}
      </ol>
      <div>
        <h2>Create a new room</h2>
        <input type="text" value={newRoomName} onChange={(e) => setNewRoomName(e.target.value)}
               placeholder="Enter room name" />
        <Button onClick={createRoom}>Create Room</Button>
      </div>
    </div>
  );
}

export default Lobby;
