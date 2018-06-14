let PinForm = document.getElementById('PincodeForm');
const sock = io();

document.getElementById('Submit').onclick = () => {
  console.log("joining game");
  sock.emit('JoinGame', document.getElementById('Input').value);
  PinForm.style.visibility = 'hidden';
};

sock.on('PlayerJoined', () => {
  console.log("game joined");
});

sock.on('FailedToJoin', () => {
  console.error("Failed to join");
});
