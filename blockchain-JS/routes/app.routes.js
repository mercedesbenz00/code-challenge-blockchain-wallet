const miner = require('../controller/miner.js');

module.exports = function(app) {
    app.get('/', (req, res) => {
        return res.render('dashboard', {
            title: 'Dashboard',
            billingAmount: miner.billingAmount + ' coins',
            latestBlock: miner.latestBlock,
            myBalance: miner.myBalance + ' coins',
          }, console.log('Visited page: Dashboard.'));
    });

    app.get('/data', (req, res) => {
        return res.render('data', {
            title: 'Data',
            latestBlock: miner.latestBlock,
          }, console.log('Visited page: Data.'));
    });

    app.get('/print', (req, res) => {
        return res.send('data', {
            title: 'Bill',
            billingAmount: miner.billingAmount + ' coins',
            latestBlock: miner.latestBlock,
            myBalance: miner.myBalance + ' coins',
          }, function() {
            return res.sendFile('data', {
                title: 'Bill',
                billingAmount: miner.billingAmount + ' coins',
                latestBlock: miner.latestBlock,
                myBalance: miner.myBalance + ' coins',
              }
          });
    });
}