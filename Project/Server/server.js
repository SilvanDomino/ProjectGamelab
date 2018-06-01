const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const RpsGame = require('./rps-game');
const port = 8080

const app = express();


const clientPath = __dirname + '/../client';
console.log('Serving static from' + clientPath);

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

let waitingPlayer = null;

io.on('connection', (sock) => {

  console.log("Someone connected");
  sock.emit('message', "You are connected");

  if (waitingPlayer) {
    //start a game

    new RpsGame(waitingPlayer, sock);
    waitingPlayer = null;

  } else {
    waitingPlayer = sock;
    waitingPlayer.emit('message',"You are waiting for an opponent");
  }




  sock.on('message', (text) => {
    io.emit('message', text);
  });
})

server.on('error', (err) => {
  console.error("server error: ", err);
});

server.listen(port, () => {
  console.log("RPS started on " + port);
});
