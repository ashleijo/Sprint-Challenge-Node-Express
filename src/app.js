const bodyParser = require('body-parser');
const express = require('express');
const fetch = require('node-fetch');
const config = require('../config.js');
const server = express();
const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;
const currentURL = 'https://api.coindesk.com/v1/bpi/currentprice/USD.json';
const historicalURL = 'https://api.coindesk.com/v1/bpi/historical/close.json';

server.use(bodyParser.json());

server.use((req, res, next) => {
  fetch(`${historicalURL}?for=yesterday`)
  .then(res => res.json())
  .then(json => console.log('yesterday -> ' + Object.values(json.bpi)[0]));
  next();
});



server.get("/compare", (req, res) => {
  fetch(`${currentURL}`)
    .then(res => res.json())
    .then(json => console.log('today -> ' + json.bpi.USD.rate));
});

server.listen(config.port, (err) => {
  if (err) {
    console.log("Error: \n" + err);
  } else {
    console.log("... .... ... .. ... .... ... ..");
    console.log(`...Server is listening on ${config.port}!`);
  }
});
