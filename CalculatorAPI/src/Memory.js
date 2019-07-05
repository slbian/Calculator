export default class Memory {
  constructor() {
    this.cache = { sharonb: 1, helenb: 20 };
    // class uses this.
  }
  registerUser(username) {
    this.cache[username] = 0;
  }
  incrementScoreForUser(username, charQuantity) {
    // TODO: protect against username not in cache
    this.cache[username] += charQuantity; // [x] makes x evaluate, if you didn't have [] it would look for "username"
  }
}
