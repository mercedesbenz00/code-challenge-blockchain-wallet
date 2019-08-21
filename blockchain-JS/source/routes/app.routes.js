const {PDFMaker} = require('../components/pdfMaker');

module.exports = function(app, miner) {
    app.get('/', (req, res) => {
      console.log('Visited page: Dashboard.');
      const minaCoinData = miner.getData();
      const pdf = new PDFMaker(minaCoinData)
      pdf.createPDF();

      let dashboardData = {
        title: 'Wallet',
        minaCoinData: minaCoinData
      };

      return res.render('dashboard', dashboardData);
    });

    app.get('/print', (req, res) => {
      return res.download('source/pdf/billing.pdf');
    });

    app.get('/data', (req, res) => {
        return res.render('data', {
            title: 'Data',
            minaCoinData: miner.getData()
          }, console.log('Visited page: Data.'));
    });

    // refresh to show how much you would mine
    app.get('/mine', (req, res) => {
      miner.initTransactions();

      let dashboardData = {
        title: 'Dashboard',
        minaCoinData: miner.getData()
      };

      return res.render('dashboard', dashboardData);
    });
};