import {Server} from 'socket.io'
import fs from 'fs';
import path from 'path';


const eventJsonData = 'update-json-data';
const eventNameClient = 'update-input';

const inputChange = 'input-change';
const jsonDataChange = 'json-data-change';

function watchAJsonFile(jsonFilePath, io, eventNameClient) {
    fs.watch(jsonFilePath, (eventType, filename) => {
        if (eventType === 'change') {
            let updatedJsonData = fs.readFileSync(jsonFilePath, 'utf8');
            try {
                updatedJsonData = JSON.parse(updatedJsonData);
                io.emit(eventNameClient, updatedJsonData); // Emit the event if the JSON data is valid
            } catch (error) {
                console.error('Invalid JSON data:', error.message);
            }
        }
    });
}

//Here you are on the back-end side:
//You have to restart the server for the changes to take effect
const SocketHandler = (req, res) => {
    function eventServerToClient(socket, eventNameServer, eventNameClient) {
        socket.on(eventNameServer, msg => {
            socket.broadcast.emit(eventNameClient, msg)
        })
    }
    
    const dataFolder = 'data';
    if (!res.socket.server.io) {
        console.log('Socket is initializing')
        const io = new Server(res.socket.server)
        res.socket.server.io = io
        
        const jsonFilePath = path.join(process.cwd(), dataFolder, 'example.json');
        
        io.on('connection', socket => {
            // Send initial JSON data to the client
            let initialJsonData = fs.readFileSync(jsonFilePath, 'utf8');
            initialJsonData = JSON.parse(initialJsonData);
            socket.emit(eventJsonData, initialJsonData);
            
            eventServerToClient(socket, inputChange, eventNameClient);
            
            eventServerToClient(socket, jsonDataChange, eventJsonData);
        })
        // Watch for changes in the JSON file and emit the updated content to clients
        watchAJsonFile(jsonFilePath, io, eventJsonData);
    }
    res.end()
}

export default SocketHandler
