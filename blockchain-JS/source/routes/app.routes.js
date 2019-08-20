// const miner = require('../controller/miner.js');
// miner.initTransactions()

module.exports = function(app, miner) {
    app.get('/', (req, res) => {
      console.log('Visited page: Dashboard.')

      let a, b, coins
      console.log(miner.mid)
      b = miner.getLatestBlock()
      a =  miner.getTheirBalance() + ' coins'
      c = miner.getMyBalance() + ' coins'

      let dashboardData = {
      title: 'Dashboard',
        billingAmount: a,
        latestBlock: b,
        myBalance: c,
      }  

      console.log(dashboardData)
      return res.render('dashboard', dashboardData);
    });

    app.get('/data', (req, res) => {
        return res.render('data', {
            title: 'Data',
            latestBlock: miner.getLatestBlock(),
          }, console.log('Visited page: Data.'));
    });


    app.get('/mine', (req, res) => {
      miner.initTransactions()

      let a, b, coins
      console.log(miner.mid)
      b = miner.getLatestBlock()
      a =  miner.getTheirBalance() + ' coins'
      c = miner.getMyBalance() + ' coins'

      let dashboardData = {
      title: 'mined',
        billingAmount: a,
        latestBlock: b,
        myBalance: c,
      }  

      return res.render('dashboard', dashboardData);
    });
    // app.get('/print', (req, res) => {
    //     return res.send('data', {
    //         title: 'Bill',
    //         billingAmount: miner.billingAmount + ' coins',
    //         latestBlock: miner.latestBlock,
    //         myBalance: miner.myBalance + ' coins',
    //       }, function() {
    //         return res.sendFile('data', {
    //             title: 'Bill',
    //             billingAmount: miner.billingAmount + ' coins',
    //             latestBlock: miner.latestBlock,
    //             myBalance: miner.myBalance + ' coins',
    //           }
    //       });
    // });
}