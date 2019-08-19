const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

// Serup Server
const app = express();


//do init
const {Miner} = require('./controller/miner')

const miner = new Miner();
miner.initTransactions();

// Setup views
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(expressLayouts);
require('./routes/app.routes.js')(app, miner);
app.use(express["static"](path.join(__dirname, '/css')));
module.exports = app;
// Start server
//app.listen(port, () => console.log(`Magic happens on port http://localhost:${port}!`))