const express = require('express');
const path = require('path');
// const logger = require('morgan');
const bodyParser = require('body-parser')
const cors = require('cors')

const apiRouter = require('./routes/api');
const mameRouter = require('./routes/mame');

const app = express();

app.set('etag', false)

// app.use(logger('dev'));
app.use(cors())
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/balanceo', express.static(path.join(__dirname, 'public_balanceo')));

app.use('/api', apiRouter);
app.use('/mame', mameRouter);

module.exports = app;
