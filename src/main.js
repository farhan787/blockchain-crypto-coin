const Transaction = require('../blockchain-components/Transaction.js');
const BlockChain = require('../blockchain-components/BlockChain.js');

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate(
  '3f5cde8a77e41f8f29c0ce280d4e3005893361116a16d5626cdbff7ce9d0ad67'
);
const myWalletAddress = myKey.getPublic('hex');

const cryptoCoin = new BlockChain();

const transaction1 = new Transaction(myWalletAddress, 'person1', 10);
transaction1.signTransaction(myKey);

cryptoCoin.addTransaction(transaction1);

console.log('\nStarting the miner...');
cryptoCoin.minePendingTransactions(myWalletAddress);

console.log(
  'Balance of my wallet is ',
  cryptoCoin.getBalanceOfAddress(myWalletAddress)
);

const transaction2 = new Transaction(myWalletAddress, 'person2', 30);
transaction2.signTransaction(myKey);

cryptoCoin.addTransaction(transaction2);

console.log('\nStarting the miner again...');
cryptoCoin.minePendingTransactions(myWalletAddress);

console.log(
  'Balance of my wallet is ',
  cryptoCoin.getBalanceOfAddress(myWalletAddress)
);

console.log(cryptoCoin.getAllTransactionsForWallet(myWalletAddress));
console.log('is block chain valid: ', cryptoCoin.isChainValid());
