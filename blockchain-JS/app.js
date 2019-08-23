const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

// Setup Server
const app = express();


// Initiating
const {Miner} = require('./lib/components/miner');

const miner = new Miner();
miner.initTransactions();

// Setup Views
app.set('view engine', 'ejs');
app.set('views', __dirname + '/lib/views');
app.use(expressLayouts);
require('./lib/routes/app.routes.js')(app, miner);
app.use(express["static"](path.join(__dirname, '/lib/css')));

module.exports = app;