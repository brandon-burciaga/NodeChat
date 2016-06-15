// function handler supplied to HTTP server
var express = require('express');
var app = express();
var http = require('http').Server(app);

// http server listening on port 3000
http.listen(3000, function() {
    console.log('Server connected...listening on *.3000');
});

// direct to styles, external js, etc
app.use(express.static(__dirname + '/public'));

// serves index.html as response
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

// initialize socket.io instance by passing http object
var io = require('socket.io')(http);

// current active users
var activeNames = {};

// on new client connection
io.on('connection', function(socket) {
    console.log('user connected');

    // when client emits 'sendchat', sends chat message
    socket.on('sendchat', function(data) {
        io.sockets.emit('updatechat', socket.username, data);
    });

    // when client emits 'adduser', adds user
    socket.on('adduser', function(username) {

        // store user name in socket session for specific client
        socket.username = username;

        // add client user name to activeNames list
        activeNames[username] = username;

        // echo to client they have been connected
        socket.emit('updatechat', 'SERVER', 'you have connected!');

        // echo to all clients a new user has been connected
        socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected!');

        // update activeNames list, client-side
        io.sockets.emit('updateusers', activeNames);
    });

    // when client emits 'disconnect', disconnects user
    socket.on('disconnect', function() {

        // remove user from activeNames
        delete activeNames[socket.username];

        // update activeNames
        io.sockets.emit('updateusers', activeNames);

        // echo to all clients the user has left
        io.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected!');
    });
});
