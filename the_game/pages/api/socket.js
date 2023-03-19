import {Server} from 'socket.io'
import fs from 'fs';
import path from 'path';

const SocketHandler = (req, res) => {
    if (res.socket.server.io) {
        console.log('Socket is already running')
    } else {
        console.log('Socket is initializing')
        const io = new Server(res.socket.server)
        res.socket.server.io = io
        const jsonFilePath = path.join(process.cwd(), 'data', 'example.json');
        
        io.on('connection', socket => {
            socket.on('input-change', msg => {
                socket.broadcast.emit('update-input', msg)
            })
            // Send initial JSON data to the client
            const initialJsonData = fs.readFileSync(jsonFilePath, 'utf8');
            socket.emit('update-json-data', initialJsonData);
            socket.on('json-data-change', msg => {
                socket.broadcast.emit('update-json-data', msg)
            })
        })
        // Watch for changes in the JSON file and emit the updated content to clients
        fs.watch(jsonFilePath, (eventType, filename) => {
            if (eventType === 'change') {
                const updatedJsonData = fs.readFileSync(jsonFilePath, 'utf8');
                io.emit('update-json-data', updatedJsonData);
            }
        });
    }
    res.end()
}

export default SocketHandler
