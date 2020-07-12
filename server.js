require('module-alias/register')
const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const morgan = require('morgan');

const app = express();

console.log("ENV: ", config.util.getEnv('NODE_ENV'));
console.log("DB_NAME: ", config.DB_NAME);

// parse request for content-type - application/json
app.use(bodyParser.json());

// parse request for content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

// connect to database
require('./loaders/database.loader')();

// init routes
require('app/api')(app);

// init event subscribers
require('app/events/subscriptions');

if (config.util.getEnv('NODE_ENV') !== 'test') {
  //morgan for logs in console
  app.use(morgan('combined')); //'combined' -> apache-style logs
}

module.exports = app;