const express = require('express');
const app = express ();
const http = require('http');
const {Server} = require('socket.io');

const cors = require('cors');
app.use (cors());

const server = http.createServer(app);

const {Games } = require('./socketClass');

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

//create new game
const games = new Games();

//users array to store connected users who join
let users = [];

//connect to socket
io.on("connection", socket => {
    console.log(socket.id)

    socket.emit('assign-id', { id: socket.id });

    socket.on('join-server', (username) => {
        const user = {
            username,
            id: socket.id
        }
        //Pushes users joined to users array and displays list of users
        users.push(user);
        io.emit("new users", users);
    })
})
