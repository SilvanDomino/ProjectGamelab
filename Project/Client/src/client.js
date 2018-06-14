const CreateAGameButton = document.getElementById('Submit');
const CreateAGameMenu = document.getElementById('CreateAGameMenu');
const sock = io();
let creatingGame = false;
let assigneddPincode = null;

CreateAGameButton.onclick = () => {
  if (!creatingGame) {
    sock.emit('CreateAGame');
  }
  creatingGame = true;
  CreateAGameMenu.style.visibility = 'hidden';
}

sock.on('log', (text) => {
  console.log(text);
});

sock.on('GameCreated', (pincode) => {
  assigneddPincode = pincode;
});

sock.on('PlayerJoined', () => {

});
