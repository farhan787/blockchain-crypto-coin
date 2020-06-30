const SHA256 = require('crypto-js/sha256');

/**
 * Our BlockChain Implementation brief overview,
 * For our basic crypto coin implementation, each block contains the transactional information
 *
 * Every block has the hash of the previous blocks so if we tamper 1 block the chain of blocks further would be invalidated
 *
 * Every user has a copy of blockchain called as Publicly Distributed Ledger which can validate if a new block to be added is valid or invalid
 * and can also detect a tampered block if any
 */

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();

    // a random value used to change some content of a block while mining a new block
    // as new hash won't be created until we change something from the params that we're using to createHash
    // and changing nonce value won't affect the data of the block
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.timestamp +
        this.previousHash +
        this.nonce +
        JSON.stringify(this.data)
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
}

class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 3;
  }

  // Genesis block => the first block in the blockchain having no previousHash
  createGenesisBlock() {
    return new Block(0, '01/01/2020', 'Genesis Block', '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mine(this.difficulty);
    this.chain.push(newBlock);
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

let cryptoCoin = new BlockChain();

cryptoCoin.addBlock(
  new Block(1, '10/01/2020', { amount: 4, from: 'farhan', to: 'person1' })
);

cryptoCoin.addBlock(
  new Block(2, '14/01/2020', { amount: 2, from: 'farhan', to: 'person2' })
);

cryptoCoin.addBlock(
  new Block(3, '19/01/2020', { amount: 1, from: 'person1', to: 'person2' })
);

console.log(JSON.stringify(cryptoCoin, null, 4));
console.log('Is blockchain valid: ', cryptoCoin.isChainValid());

cryptoCoin.chain[1].data.amount = 200;
console.log('Is blockchain valid: ', cryptoCoin.isChainValid());

// even afte recalculating hash for tampered block, chain is invalid as the prevHash don't match for the chain further
cryptoCoin.chain[1].calculateHash();
console.log('Is blockchain valid: ', cryptoCoin.isChainValid());
