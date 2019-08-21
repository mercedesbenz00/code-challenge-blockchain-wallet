const fs = require('fs');
const path = require('path');
const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

/**
 * Minacoin Transaction Manager
 * @example 
 * let miner = new Miner();
 * miner.initTransactions();
 */
export class Miner {
    /**
     * Constructor: Setting up Miner
     */
    constructor() {
        const myKey = ec.keyFromPrivate('874721b0cfd73d79c76c50d5b2ee59f7d9fe9c5743bc45c015c713903b46b7c4');
        this.myWalletAddress = myKey.getPublic('hex');
        this.myKey = myKey;
        const key = ec.genKeyPair().getPublic().encode('hex'); // generates a random key:
        const theirKey = ec.keyFromPrivate(key);
        this.theirWalletAddress = theirKey.getPublic('hex');
        this.minaCoin = new Blockchain(); 
    }

    /**
     * Gets cycles from files in JSON format
     * @todo Here could be a logger
     * @return {undefined}
     */
    getCycles() {
        try {
            const folderName = '../data/';

            return fs.readdirSync(folderName).map(file => {
                return require(path.resolve(folderName, file))['cycle'];
            });
        }
        catch (err) {
            // TODO Here could be a logger
            console.log('Getting cycles failed ' + err);

            return null;
        }
    }

    /**
     * Sends a transaction
     * @param {string} payload Contains a string of a cycle
     * @return {undefined}
     */
    sendTransaction (payload) {
        if(payload === undefined || payload === '') {
            throw new Error('Payload is not defined');
        }
        const tx1 = new Transaction(this.myWalletAddress, this.theirWalletAddress, 10, payload);
        tx1.signTransaction(this.myKey);
        this.minaCoin.addTransaction(tx1);
    }

    /**
     * @summary Gets the latest Block
     * @return {Block}
     */
    getLatestBlock () {
        return this.minaCoin.getLatestBlock();
    }

    /**
     * Gets user's balance
     * @return {number}
     */
    getMyBalance () {
        return this.minaCoin.getBalanceOfAddress(this.myWalletAddress);
    }
    
     /**
     * Gets other user's balance
     * @return {number}
     */
    getTheirBalance () {
        return this.minaCoin.getBalanceOfAddress(this.theirWalletAddress);
    }

    /** 
     * Prepares data for view
     * @return {Object}
     */
    getData() {
        return {
            theirBalance: this.getTheirBalance(),
            myBalance: this.getMyBalance(),
            latestBlock: this.getLatestBlock()
        };
    }

    /**
     * @summary Initiates transaction
     * @emits getCycles
     * @emits sendTransaction
     * @emits minaCoin.minePendingTransactions
     * @return {undefined}
     */
    initTransactions() {
        const cycles = this.getCycles();

        for (let index = 0; index < cycles.length; index++) {
            let cycle = cycles[index];
            this.sendTransaction(cycle);
        }

        console.log('Starting the miner');
        this.minaCoin.minePendingTransactions(this.myWalletAddress);
    }
}
