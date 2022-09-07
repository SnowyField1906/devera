import Block from './block';

class Blockchain {
    constructor() {
        this.blockchain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }
    createGenesisBlock() {
        return new Block(0, "2022-09-02", "first block on the chain", "0");
    }
    getTheLatestBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }
    addNewBlock(newBlock) {
        newBlock.previousHash = this.getTheLatestBlock().hash;
        newBlock.hash = newBlock.generateHash();
        this.blockchain.push(newBlock);
        newBlock.proofOfWork(this.difficulty);
        console.log(newBlock)
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

export default Blockchain;