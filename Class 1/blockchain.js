const Block = require("./block");

class Blockchain {
  constructor() {
    this.blockchain = [this.createGenesisBlock()];
    this.difficulty = 4;
    this.blockTime = 5000; // milisecond
  }
  createGenesisBlock() {
    return new Block(0, new Date().toString(), "first block on the chain", "0");
  }
  getTheLatestBlock() {
    return this.blockchain[this.blockchain.length - 1];
  }
  addNewBlock(newBlock) {
    newBlock.previousHash = this.getTheLatestBlock().hash;
    // newBlock.hash = newBlock.generateHash();
    newBlock.proofOfWork(this.difficulty);
    this.blockchain.push(newBlock);

    let oldDifficulty = this.difficulty;
    this.difficulty += (Date.now() - new Date(newBlock.timestamp).getTime()) > this.blockTime ? -1 : 1;
    console.log(`adjust difficulty ${oldDifficulty} -> ${this.difficulty}`);
  }

  validateValidity() {
    for (let i = 1; i < this.blockchain.length; i++) {
      const currentBlock = this.blockchain[i];
      const previousBlock = this.blockchain[i - 1];
      if (currentBlock.hash !== currentBlock.generateHash()) {
        return false;
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
      return true;
    }
  }
}

module.exports = Blockchain;
