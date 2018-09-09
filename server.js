require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

//EDITED VEDANT
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
users = []
connections = []

io.sockets.on('connection', function(socket) {
    connections.push(socket);
    console.log("connected : %s socket connected", connections.length);

    socket.on("disconnect", function() {
        connections.splice(connections.indexOf(socket), 1);
        console.log("disconnected");
    });

    socket.on("send_message", function(data) {
        io.sockets.emit("new_message", { msg: data, username: data.username })
    });
});



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({ credentials: true, origin: 'http://localhost' }));

// use JWT auth to secure the api


// api routes
app.use('/users', require('./users/users.controller'));
app.use('/complains', require('./complains/complains.controller'));

// global error handler
app.use(errorHandler);

// start server
// const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
// const server = app.listen(port, function () {
//     console.log('Server listening on port ' + port));
// app.listen(process.env.PORT||3000);
// console.log("Running");
server.listen(process.env.PORT || 3000);
console.log("running");