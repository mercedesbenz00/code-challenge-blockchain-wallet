const fs = require('fs');
const path = require('path');
const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('874721b0cfd73d79c76c50d5b2ee59f7d9fe9c5743bc45c015c713903b46b7c4');
const myWalletAddress = myKey.getPublic('hex');

// generates a random key
const key = ec.genKeyPair().getPublic().encode('hex');
const theirKey = ec.keyFromPrivate(key);
const theirWalletAddress = theirKey.getPublic('hex');

const minaCoin = new Blockchain();

/**
 * @summary Gets cycles from files in JSON format
 */
function getCycles() {
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
function sendTransaction (payload) {
    if(payload === undefined || payload === '') {
        throw new Error('Payload is not defined');
    }

    const tx1 = new Transaction(myWalletAddress, theirWalletAddress, 10, payload);
    tx1.signTransaction(myKey);
    minaCoin.addTransaction(tx1);
}

/**
 * @summary Initiates itself
 * @fires getCycles
 * @fires sendTransaction
 * @fires minaCoin.getBalanceOfAddress
 * @fires minaCoin.getLatestBlock
 */
(function () {
    const cycles = getCycles();
    cycles.forEach(sendTransaction);

    console.log("Starting the miner");
        minaCoin.minePendingTransactions(myWalletAddress);
})();

module.exports = {
    latestBlock: minaCoin.getLatestBlock(),
    billingAmount: minaCoin.getBalanceOfAddress(theirWalletAddress),
    myBalance: minaCoin.getBalanceOfAddress(myWalletAddress)
}



