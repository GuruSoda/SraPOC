const express = require('express');
const path = require('path');
// const logger = require('morgan');
const bodyParser = require('body-parser')
const cors = require('cors')

const apiRouter = require('./routes/api');
const mameRouter = require('./routes/mame');

const app = express();

// app.use(logger('dev'));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);
app.use('/mame', mameRouter);

module.exports = app;
