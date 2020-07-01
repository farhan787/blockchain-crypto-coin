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

## Implemented Concepts

- Block, BlockChain, and Transaction classes
- Proof of work for mining new blocks using **difficulty** param
- Mining and mine reward functionality
- Signing Transactions with Private Key to make sure that the transactions are valid and no one can use the wallet of someone else
