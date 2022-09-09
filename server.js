const express = require('express');
const app = express ();
const http = require('http');
const {Server} = require('socket.io');

const cors = require('cors');
app.use (cors());

const server = http.createServer(app);

//new users that eventually join will get pushed into this array
let users = [];

const io = new Server(server, {
    cors: {
        origin: "http://127.0.0.1:5173",    //client side url goes here
        methods: ["GET", "POST"],
    },
})

//connect to socket
io.on("connection", (socket) => {           //listens to 'connection' event
    console.log(`User Connected: ${socket.id}`)

    // socket.emit('assign-id', { id: socket.id });

    socket.on("join-room", (data) => {
        socket.join(data);
        console.log(`You have joined room ${data}`)
    })

});

module.exports = server;


