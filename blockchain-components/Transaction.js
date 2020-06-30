class Transaction {
  // fromAddress and toAddress would be a public key of someone's wallet in real world implementation
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
}

module.exports = Transaction;
