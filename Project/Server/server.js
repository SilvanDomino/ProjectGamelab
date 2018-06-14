const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Lobby = require('./Classes/Lobby.js');
const gpc = require('generate-pincode');
const port = 8080;

const app = express();

const clientPath = __dirname + '/..';
console.log('Serving static from' + clientPath);
app.use(express.static(clientPath));
const server = http.createServer(app);
const io = socketio(server);
let lobbys = [];

let GeneratePincode = () => {
  let pincode = gpc(4);
  for (var i = 0; i < lobbys.length; i++) {
    if (pincode = lobbys[i]) {
      pincode = GeneratePincode();
    }
  }
  return pincode;
};

io.on('connection', (sock) => {

  sock.on('CreateAGame', () => {
    let pincode = GeneratePincode();
    let room = new Lobby(pincode);
    room.Join(sock);
    lobbys.push(room);
    sock.emit('GameCreated', lobbys.pincode);
    console.log("Game created, Pin: " + pincode);
  });

  sock.on('JoinGame', (pincode) => {
    let found = false;
    for (var i = 0; i < lobbys.length; i++) {
      if (pincode = lobbys[i].pincode) {
        found = "true";
        lobbys[i].Join(sock);
        io.to(pincode).emit('PlayerJoined');
        console.log("Player Joined, pin: " + lobbys[i].pincode);
        break;
      }
    }
    if (!found) {
      sock.emit('FailedToJoin');
    }
  });
})

server.on('error', (err) => {
  console.error("server error: ", err);
  io.emit('message', "server Error: " + err);
});

server.listen(port, () => {
  console.log("RPS started on " + port);
});
