const fs = require('fs');
const path = require('path');
const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Miner{
    constructor() {
        const myKey = ec.keyFromPrivate('874721b0cfd73d79c76c50d5b2ee59f7d9fe9c5743bc45c015c713903b46b7c4');
        this.myWalletAddress = myKey.getPublic('hex');
        this.myKey = myKey
        // generates a random key
        const key = ec.genKeyPair().getPublic().encode('hex');
        const theirKey = ec.keyFromPrivate(key);
        this.theirWalletAddress = theirKey.getPublic('hex');
            
        this.minaCoin = new Blockchain(); 

        // console.log('hello ', this)
        // this.initTransactions()
    }

    /**
 * @summary Gets cycles from files in JSON format
 */
    getCycles() {
        try {
            const folderName = '../data/';
            //console.log('my path: ', path.resolve(app.get('data')))
            return fs.readdirSync(folderName).map(file => {
                return require(path.resolve(folderName, file))['cycle']
            });
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }

/**
 * @summary Sends a transaction
 * @param payload contains a string of a cycle
 */
    sendTransaction (payload) {

        //console.log('st', this)
        if(payload === undefined || payload === '') {
            throw new Error('Payload is not defined');
        }

        const tx1 = new Transaction(this.myWalletAddress, this.theirWalletAddress, 10, payload);
        tx1.signTransaction(this.myKey);
        this.minaCoin.addTransaction(tx1);
    }

    getLatestBlock () {
        return this.minaCoin.getLatestBlock();
    }

    getMyBalance () {
        return this.minaCoin.getBalanceOfAddress(this.myWalletAddress);
    }
    
    getTheirBalance () {
        return this.minaCoin.getBalanceOfAddress(this.theirWalletAddress);
    }

/**
 * @summary Initiates itself
 * @fires getCycles
 * @fires sendTransaction
 * @fires minaCoin.getBalanceOfAddress
 * @fires minaCoin.getLatestBlock
 */
    initTransactions() {
        //console.log('te', this)
        const cycles = this.getCycles();
        // cycles.forEach(this.sendTransaction);

        for (let index = 0; index < cycles.length; index++) {
            let cycle = cycles[index];
            console.log('cycle:', cycle)
            this.sendTransaction(cycle);
        }

        console.log("Starting the miner");
        this.minaCoin.minePendingTransactions(this.myWalletAddress);

        // console.log('lasest block is: ', minaCoin.getLatestBlock())
        console.log('balance is: ', this.minaCoin.getBalanceOfAddress(this.myWalletAddress));
        // console.log('billingAmount is: ', minaCoin.getBalanceOfAddress(theirWalletAddress))
    };

};

// initTransactions()

// module.exports = {
//     mid: myWalletAddress,
//     tid: theirWalletAddress,
//     getLatestBlock: minaCoin.getLatestBlock,
//     billingAmount: minaCoin.getBalanceOfAddress(theirWalletAddress),
//     myBalance: minaCoin.getBalanceOfAddress(myWalletAddress),
//     getBalance: minaCoin.getBalanceOfAddress,
//     initTransactions: initTransactions
// }

module.exports.Miner = Miner;

// exports.mid = myWalletAddress
// exports.tid = theirWalletAddress
// exports.getLatestBlock = minaCoin.getLatestBlock
// exports.billingAmount = minaCoin.getBalanceOfAddress(theirWalletAddress),
// exports.myBalance =     minaCoin.getBalanceOfAddress(myWalletAddress),
// exports.getBalance =     minaCoin.getBalanceOfAddress,
// exports.initTransactions =     initTransactions

