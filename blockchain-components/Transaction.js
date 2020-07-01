const { SHA256 } = require('crypto-js');

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Transaction {
  // fromAddress and toAddress are public keys of wallets
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }

  calculateHash() {
    return SHA256(this.fromAddress, this.toAddress, this.amount).toString();
  }

  signTransaction(signingKey) {
    // We can only spend coins from the wallet that we've the private key for
    // and private key is linked to public key that means the fromAddress has to equal to our public key
    if (signingKey.getPublic('hex') !== this.fromAddress) {
      throw new Error('You cannot sign transactions for other wallets');
    }

    const transactionHash = this.calculateHash();
    const signature = signingKey.sign(transactionHash, 'base64');
    this.signature = signature.toDER('hext');
  }

  isValidTransaction() {
    if (this.fromAddress == null) {
      // for mining rewards transactions as those transactions are not signed
      return true;
    }

    if (!this.signature || this.signature.length === 0) {
      throw new Error('No signature in this transaction');
    }

    // check if the transaction has been signed with the correct key
    const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
    return publicKey.verify(this.calculateHash(), this.signature);
  }
}

module.exports = Transaction;
