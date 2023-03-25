import { useEffect, useState } from 'react';
import io from 'socket.io-client';

function Home() {
  const [input, setInput] = useState('');
  const [jsonData, setJsonData] = useState('');

  // @ts-ignore
  let socket = null;
  // Here you are in a component. Not Back-end.

  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io();

    socket.on('connect', () => {
      console.log('Socket.io connection established.');
    });

    socket.on('update-input', (msg) => {
      setInput(msg);
    });

    socket.on('update-json-data', (data) => {
      setJsonData(data);
    });
  };
  useEffect(() => {
    socketInitializer();
  }, []);

  const onChangeHandler = (e) => {
    setInput(e.target.value);
    socket.emit('input-change', e.target.value);
  };

  return (
    <>
      <input placeholder="Type something" value={input} onChange={onChangeHandler} />
      <p>{JSON.stringify(jsonData, null, 2)}</p>
    </>
  );
}

export default Home;
