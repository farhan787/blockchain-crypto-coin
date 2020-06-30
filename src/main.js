const Transaction = require('../blockchain-components/Transaction.js');
const BlockChain = require('../blockchain-components/BlockChain.js');

let cryptoCoin = new BlockChain();

cryptoCoin.createTransaction(new Transaction('address1', 'address2', 200));
cryptoCoin.createTransaction(new Transaction('address2', 'address1', 30));

console.log('\nStarting the miner...');
cryptoCoin.minePendingTransactions('farhan-mock-reward-address');

console.log(
  'Balance of farhan is ',
  cryptoCoin.getBalanceOfAddress('farhan-mock-reward-address')
);

console.log('\nStarting the miner again...');
cryptoCoin.minePendingTransactions('farhan-mock-reward-address');

console.log(
  'Balance of farhan is ',
  cryptoCoin.getBalanceOfAddress('farhan-mock-reward-address')
);
