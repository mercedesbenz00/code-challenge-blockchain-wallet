const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

// Serup Server
const app = express();
const port = 3000;

// Setup views
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(expressLayouts);
require('./routes/app.routes.js')(app);
app.use(express["static"](path.join(__dirname, '/css')));

// Start server
app.listen(port, () => console.log(`Magic happens on port ${port}!`))