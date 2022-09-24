//import that secure hash algorithm from the crypto-js package
const SHA256 = require('crypto-js/sha256');

//create a JavaScript class to represent a Block
class Block {
  constructor(index, timestamp, data, previousHash) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.generateHash();
    this.nonce = 0;
  }

  generateHash() {
    return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data) + this.nonce).toString();
  }

  proofOfWork(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.generateHash();
    }
  }
}

module.exports = Block;