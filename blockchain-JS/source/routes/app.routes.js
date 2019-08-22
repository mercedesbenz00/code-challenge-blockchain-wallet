const {PDFMaker} = require('../components/pdfMaker');

/**
 * Defines some routes
 */
module.exports = function(app, miner) {
    const minaCoinData = miner.getData();

    /**
     * Request for index
     * @param {any} res Response
     * @param {any} req Request
     * @return {any} Renders Dashboard view
     */
    app.get('/', (req, res) => {
      console.log('Visited page: Dashboard.');
      let dashboardData = {
        title: 'Wallet',
        minaCoinData: minaCoinData
      };

      return res.render('dashboard', dashboardData);
    });

    /**
     * Request for Billing PDF
     * @param {any} res Response
     * @param {any} req Request
     * @return {any} Downloads billing.pdf
     */
    app.get('/print', (req, res) => {
      const pdf = new PDFMaker(minaCoinData);
      pdf.createPDF();

      return res.download('lib/pdf/billing.pdf');
    });

    /**
     * Request for /data, A more detailed view
     * @param {any} res Response
     * @param {any} req Request
     * @return {any} Renders Dashboard view
     */
    app.get('/data', (req, res) => {
        return res.render('data', {
            title: 'Data',
            minaCoinData: miner.getData()
          }, console.log('Visited page: Data.'));
    });

    /**
     * Request for /mine. How much can you mine?
     * @param {any} res Response
     * @param {any} req Request
     * @return {any} Renders Mining view
     */
    app.get('/mine', (req, res) => {
      miner.initTransactions();

      let dashboardData = {
        title: 'Dashboard',
        minaCoinData: miner.getData()
      };

      return res.render('dashboard', dashboardData);
    });
};