# blockchain-crypto-coin

A basic implementation of a blockchain model for crypto transactions.

## What is BlockChain

**_BlockChain_** is a technology which allows us to keep track of records in a form of blocks that are linked like Linked Lists and use complex mathematical cryptographic algorithms. New blocks are added to the chain and it grows in a linear fashion.

## BlockChain Overview

- In case of our basic crypto coin transactions implementation, each block contains multiple transactions.

- Every block has the hash of the previous block so if we tamper 1 block the chain of blocks further would be invalidated.

- **Mining** is a process of adding a new block to our chain which does heavy computational operations to generate a new hash for the new block to be added but there is a **difficulty** factor that we need to fulfill which most of the times is the number of zeroes in the starting of the hash string, more difficulty will need more time to mine a block.

  _For example, **Bitcoin** allows to add a new block after 10 minutes so they use the difficulty factor accordingly_

- Every user has a copy of blockchain called as **Publicly Distributed Ledger** which can validate if a new block to be added is valid or invalid and can also detect a tampered block if any and can validate our block chain.

- **Smart Contracts** are programs that are stored on a blockchain(ledger) and are executed automatically when certain predefined conditions are met.

## Applications of BlockChain

1. **Secure sharing of medical data**
2. **Cross border payments**
3. **Real Time IOT Systems**
4. **Personal Identity Security**
5. **Anti-money laundering tracking system**
6. **Supply chain and logistics monitoring**
   - A shipping giant like **DLH** uses blockchain to keep a digital ledger of shipments and maintain integrity of transactions.
7. **Voting mechanism**
8. **Cryptocurrency exchange**
9. **Preventing Odometer fraud in vehicles**
   - To prevent Odometer frauds **Bosch's IOT Lab** and many car manufacturing companies are using blockchain technology to store the distance a vehicle has covered in distributed ledgers to prevent these frauds.

## Implemented Concepts in this project

- Block, BlockChain, and Transaction classes
- Proof of work for mining new blocks using **difficulty** factor
- Mining and mine reward functionality
- Signing Transactions with Private Key to make sure that the transactions are valid and no one can use the wallet of someone else
