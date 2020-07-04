const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// support for .env file
require('dotenv').config();

// parse request for content-type - application/json
app.use(bodyParser.json());

// parse request for content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

// connect to database
require('./app/loaders/database.loader')();

// init routes
require('./app/routes');

module.exports = app;