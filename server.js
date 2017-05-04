// HTTP PORTION

var http = require('http');
var fs = require('fs');
var httpServer = http.createServer(requestHandler);
var url = require('url');
httpServer.listen(8080);

function requestHandler(req, res) {

	var parsedUrl = url.parse(req.url);
	console.log("The Request is: " + parsedUrl.pathname);
		
	fs.readFile(__dirname + parsedUrl.pathname, 
		function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading ' + parsedUrl.pathname);
			}
			res.writeHead(200);
			res.end(data);
  		}
  	); 
  	
}

// this holdas the players in the game
var playerSockets = {
	/*socketId: socketObj*/
}

var players = {
	/*socket_id: {
		playerInfo: {
			pos:
			rotation,

		}
	}*/
};

// WEBSOCKET PORTION

var io = require('socket.io').listen(httpServer);

io.sockets.on('connection', 

	function (socket) {
	    
	    // @TODO
		console.log("We have a new client: " + socket.id);

		//when someone else connects, we let everyone else know that they're here
		
		socket.on('newPlayer', function() {

			socket.broadcast.emit('newPlayer');
		});
		

		//MY SOCKET STUFF

		//receive position
		socket.on('fighterPos', function(data){

			socket.broadcast.emit('fighter1Pos', data);

			console.log(data);

		});

		socket.on('fighterRotateLeft', function(data){

			socket.broadcast.emit('fighter1RotateLeft', data);

			console.log(data);

		});



			socket.on('disconnect', function() {
			console.log("Client has disconnected " + socket.id);
		});
	}
);