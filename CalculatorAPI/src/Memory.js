export default class Memory {
  constructor() {
    this.cache = {
      sharonb: 1,
      helenb: 51,
      chuck: 52,
      ellen: 53,
      dylan: 54,
      alfonso: 55,
      theresa: 56,
      quinn: 57,
    };
    // class uses this.
  }

  registerUser(username) {
    this.cache[username] = 0;
    return { username: username, score: this.cache[username] };
  }

  getScoreByUsername(username) {
    return this.cache[username];
  }

  incrementScoreForUser(username, charQuantity) {
    this.cache[username] += charQuantity; // [x] makes x evaluate, if you didn't have [] it would look for "username"
    return this.cache[username]; // returns score
  }
}
