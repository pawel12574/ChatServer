const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


let sockets = new Set();

io.on('connection', socket => {
    sockets.add(socket);

    socket.on('clientData', data => {
        console.log(data);
        sendMessage(data);
    })

    socket.on('disconnect', () => {
        sockets.delete(socket);
    })
});


function sendMessage(message){
    for (const s of sockets) {
        s.emit('message', {data: message});
    }
}

server.listen(8081);
console.log('serwer dziala');

