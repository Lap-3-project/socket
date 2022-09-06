const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server) 


var clickCount = 0;

app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(client) { 
	console.log('Client connected...'); 
	//when the server receives clicked message, do this
    client.on('clicked', function(data) {
    	  clickCount++;
		  //send a message to ALL connected clients
		  io.emit('buttonUpdate', clickCount);
    });
});

//start our web server and socket.io server listening
server.listen(3000, function(){
  console.log('listening on *:3000');
}); 

