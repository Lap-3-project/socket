const express = require('express');
const app = express ();
const http = require('http');
const {Server} = require('socket.io');

const cors = require('cors');
app.use (cors());

const server = http.createServer(app);

const {Games } = require('./socketClass');

//create new game
const games = new Games();

//users array to store connected users who join
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

    socket.emit('assign-id', { id: socket.id });

    socket.on('join-server', (username) => {
        //create user object
        const user = {
            username,
            id: socket.id
        }
        //Pushes users joined to users array and displays list of users
        users.push(user);
        io.emit("new-user", users);
    })

    //Creating the room
    socket.on ('add-config', (config, cb) => {
    games.addGame (
        config.host,
        config.room,
        config.difficulty,
        config.count,
        config.subject
    );
    socket.join(config.host);

    games.addPlayer(
        config.username,
        config.room,
        config.host
    )

    cb({
        code: "success",
        message: "SUCCESS: Creation successful. Config has been added"
    })

    })

    socket.on ('join-room', (config, cb) => {
        //Find the room first
        console.log(config);
        let findRoom = games.joinRoom(config.room);
        console.log('join-room', findRoom);
    
        //if-else 
        if (findRoom == 'ERROR') {
            console.log('Room cannot be found')
            const noRoom = 'Room does not exist';
            io.to(config.id).emit('Room not found', noRoom);
        } else {
            console.log('adding player...')
            games.addPlayer(
                config.username,
                config.room,
                socket.id
            );
            socket.join(config.room);
            socket.emit(`${config.username} has entered the room.`);
            io.emit('new user', config.username)
            let game = games.findGameRoom(config.room);
    
            cb({
                code: 'success',
                player: config.username,
                score: 0
            })
    
            io.to(game.host).emit("player-connected", {
                name: config.username,
                score: 0
            });
        }
        
    })

});

module.exports = server;


