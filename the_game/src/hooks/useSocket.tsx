// hooks/useSocket.js
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const initSocket = async () => {
      await fetch('/api/socket');
      const newSocket = io();
      setSocket(newSocket);
    };

    initSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  return socket;
};

export default useSocket;
