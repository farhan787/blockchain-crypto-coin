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
    const miningTransaction = new Transaction(
      null,
      miningRewardAddress,
      this.miningReward
    );
    this.pendingTransactions.push(miningTransaction);

    const block = new Block(Date.now(), this.pendingTransactions);
    block.previousHash = this.getLatestBlock().hash;

    block.mine(this.difficulty);

    console.log('Block successfully mined!');
    this.chain.push(block);

    this.pendingTransactions = [];
  }

  addTransaction(transaction) {
    if (!transaction.toAddress || !transaction.fromAddress) {
      throw new Error('Transaction must incude to and from address');
    }

    if (!transaction.isValidTransaction()) {
      throw new Error('Cannot add invalid transaction to the chain');
    }

    if (transaction.amount <= 0) {
      throw new Error('Transaction amount should be higher than 0');
    }

    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address) {
    let balance = 0;
    for (const block of this.chain) {
      if (block.transactions == 'Genesis Block') continue;
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) balance -= trans.amount;
        else if (trans.toAddress === address) balance += trans.amount;
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
        console.log('previous block hash does not match');
        return false;
      }

      if (!currBlock.hasValidTransactions()) {
        return false;
      }

      return true;
    }
  }

  getAllTransactionsForWallet(address) {
    const transactions = [];

    for (const block of this.chain) {
      for (const transaction of block.transactions) {
        if (
          transaction.fromAddress === address ||
          transaction.toAddress === address
        ) {
          transactions.push(transaction);
        }
      }
    }

    return transactions;
  }
}

module.exports = BlockChain;
