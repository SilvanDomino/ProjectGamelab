class Lobby {
  constructor(pin) {
    this._pincode = pin;
  }

  get pincode() {
    return this._pincode;
  }

  Join(player) {
    player.join(this._pincode);
  }
}
module.exports = Lobby;
