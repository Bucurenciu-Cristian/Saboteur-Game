import {useEffect, useState} from 'react';
import io from 'socket.io-client';


const Home = () => {
    const [input, setInput] = useState('');
    const [jsonData, setJsonData] = useState('');
    
    // @ts-ignore
    let socket = null;
    
    useEffect(() => {
        socketInitializer();
    }, []);
    
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
            setJsonData(JSON.parse(data));
        });
    };
    
    const onChangeHandler = (e) => {
        setInput(e.target.value);
        socket.emit('input-change', e.target.value);
        
        // Update jsonData and emit the modified version to the clients
        const updatedJsonData = {
            ...jsonData,
            text: e.target.value,
        };
        setJsonData(updatedJsonData);
        socket.emit('json-data-change', JSON.stringify(updatedJsonData));
    };
    
    return (
        <>
            <input
                placeholder="Type something"
                value={input}
                onChange={onChangeHandler}
            />
            <p>{JSON.stringify(jsonData, null, 2)}</p>
        </>
    );
};

export default Home;
