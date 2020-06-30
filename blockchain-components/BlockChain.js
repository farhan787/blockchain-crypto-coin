const Block = require('./Block.js');
const Transaction = require('./Transaction.js');

class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 3;
    this.miningReward = 100;

    // we create a new block after specific time interval so all the transactions created b/w that time interval
    // are temporarily stored in this pendingTrasactions array
    this.pendingTransactions = [];
  }

  // Genesis block => the first block in the blockchain having no previousHash
  createGenesisBlock() {
    return new Block(Date.now(), 'Genesis Block', '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress) {
    let block = new Block(Date.now(), this.pendingTransactions);
    block.mine(this.difficulty);

    console.log('Block successfully mined!');
    this.chain.push(block);

    this.pendingTransactions = [
      // fromAddress is null here as we're rewarding miningReward for mining a block
      new Transaction(null, miningRewardAddress, this.miningReward),
    ];
  }

  createTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address) {
    let balance = 0;
    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (address === trans.fromAddress) balance -= trans.amount;
        else if (address === trans.toAddress) balance += trans.amount;
      }
    }
    return balance;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currBlock = this.chain[i];
      const prevBlock = this.chain[i - 1];

      if (currBlock.hash != currBlock.calculateHash()) {
        return false;
      }

      if (currBlock.previousHash != prevBlock.hash) {
        return false;
      }

      return true;
    }
  }
}

module.exports = BlockChain;
