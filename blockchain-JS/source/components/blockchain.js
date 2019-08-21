const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

export class Transaction {
    constructor(fromAddress, toAddress, amount, payload) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.payload = payload;
        this.timestamp = Date.now();
    }

    calculateHash(){
        return SHA256(this.fromAddress + this.toAddress, + this.amount + this.payload + this.timestamp).toString();
    }

    signTransaction(signingKey){
        if(signingKey.getPublic('hex') !== this.fromAddress){
            throw new Error('You cannot sign transactions for other wallets!');
        }

        const hashTransaction = this.calculateHash();
        const sig = signingKey.sign(hashTransaction, 'base64');
        this.signature = sig.toDER('hex');
    }

    isValid(){
       //TODO
        if(this.fromAddress === null) return false; 
       
       if(!this.signature || this.signature.length === 0){
           throw new Error('No signature in this transaction');
       }

       const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
       return publicKey.verify(this.calculateHash(), this.signature);
    }
}

export class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp;
        //TODO: change data to payload and add amount
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.timestamp + JSON.stringify(this.transactions)
         + this.previousHash + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== 
        Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log('Block mined: ' + this.hash);
    }

    hasValidTransactions(){
        for (const tx of this.transactions){
            if(!tx.isValid()){
                return false;
            }
        }

        return true;
    }
}


export class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock() {
        return new Block('01.01.2019', 'Genesis block', '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress) {
        const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward);
        this.pendingTransactions.push(rewardTx);

        //TODO: Miners should choose which tx they want to mine
        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined!');
        this.chain.push(block);

        this.pendingTransactions = [];
    }

    addTransaction(transaction){

        if(!transaction.fromAddress || !transaction.toAddress){
            throw new Error('Transaction must include from and to address');
        }

        if(!transaction.isValid()){
            throw new Error('Cannot add invalid transaction to the chain!');
        }

        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address){
        let balance = 0;

        for(const block of this.chain){
            for(const trans of block.transactions){
                if (trans.fromAddress === address){
                    balance -= trans.amount;
                }

                if (trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(!currentBlock.hasValidtransactions){
                return false;
            }

            if(currentBlock.hash !== currentBlock.calculateHash()) {
                return false; 
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}