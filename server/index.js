const express = require("express");       //a commonly used express library
const app = express();  

const http = require("http");           //http is used for socket.io (recommended)
const { Server } = require("socket.io"); //requiring class {Server} from socket io library
const cors = require("cors");           //requiring cors(a good library that presents errors when working with middleware)

app.use(cors())

const server = http.createServer(app);  //This creates a http server using express

const io = new Server(server, {         //Server = {Class} therefore need to call a new instance of it
    cors: {                             //Cors is commonly used with socket.io
        origin: `http://127.0.0.1:5173`,    //React URL goes here
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {           //listens to 'connection' event
    console.log(`User Connected: ${socket.id}`)

    socket.on("join_room", (data) => {      //events within " " have to match ones in clientside
        socket.join(data);
    })

    socket.on("send_message", (data) => {
        console.log(data);
        socket.to(data.room).emit("receive-message", data)
    })
})

const port = 3001;

server.listen(port, () => {
    console.log (`Now listening in on server ${port}`);
})
