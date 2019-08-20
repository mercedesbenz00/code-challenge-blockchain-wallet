module.exports = function(app, miner) {
    app.get('/', (req, res) => {
      console.log('Visited page: Dashboard.');

      const b = miner.getLatestBlock();
      const a =  miner.getTheirBalance() + ' coins';
      const c = miner.getMyBalance() + ' coins';

      let dashboardData = {
      title: 'Dashboard',
        billingAmount: a,
        latestBlock: b,
        myBalance: c,
      };

      return res.render('dashboard', dashboardData);
    });

    app.get('/data', (req, res) => {
        return res.render('data', {
            title: 'Data',
            latestBlock: miner.getLatestBlock(),
          }, console.log('Visited page: Data.'));
    });


    app.get('/mine', (req, res) => {
      miner.initTransactions();

      let a, b, c;
      b = miner.getLatestBlock();
      a =  miner.getTheirBalance() + ' coins';
      c = miner.getMyBalance() + ' coins';

      let dashboardData = {
      title: 'mined',
        billingAmount: a,
        latestBlock: b,
        myBalance: c,
      };

      return res.render('dashboard', dashboardData);
    });
};