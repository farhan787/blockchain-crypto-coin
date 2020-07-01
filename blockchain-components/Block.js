const { SHA256 } = require('crypto-js');

class Block {
  constructor(timestamp, transactions, previousHash = '') {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();

    // a random value used to change some content of a block while mining a new block
    // as new hash won't be created until we change something from the params that we're using to createHash
    // and changing nonce value won't affect the data of the block
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(
      this.timestamp +
        this.previousHash +
        this.nonce +
        JSON.stringify(this.transactions)
    ).toString();
  }

  /**
   * Proof of work: we don't want to add thousands of new blocks per second to keep our blockchain secure
   * difficulty is the #zeroes in the starting of the hash
   * more difficulty => more time for mining a block because of computational heavy operations
   */
  mine(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log('Block mined: ', this.hash);
  }

  hasValidTransactions() {
    for (const transaction of this.transactions) {
      if (!transaction.isValidTransaction()) {
        return false;
      }
    }
    return true;
  }
}

module.exports = Block;
