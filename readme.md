# blockchain-crypto-coin

A basic implementation of a blockchain model for crypto transactions.

## BlockChain Overview

- In case of our basic crypto coin transactions implementation, each block contains the transactional information.

- Every block has the hash of the previous block so if we tamper 1 block the chain of blocks further would be invalidated.

- Every user has a copy of blockchain called as **Publicly Distributed Ledger** which can validate if a new block to be added is valid or invalid and can also detect a tampered block if any and can verify the validness of our blocks chain.

## Implemented Concepts

- Block, BlockChain, and Transaction classes
- Proof of work for mining new blocks using **difficulty** param
- Mining and mine reward functionality
