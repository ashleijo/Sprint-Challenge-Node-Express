const bodyParser = require('body-parser');
const express = require('express');
const fetch = require('node-fetch');
const config = require('../config.js');
const server = express();
const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;
const currentURL = 'https://api.coindesk.com/v1/bpi/currentprice/USD.json';
const historicalURL = 'https://api.coindesk.com/v1/bpi/historical/close.json';
const difference = {};

server.use(bodyParser.json());
server.get("/compare", (req, res, next) => {
  fetch(`${currentURL}`)
    .then(res => res.json())
    .then(json => difference.todays_val = json.bpi.USD.rate_float)
    next();
});

server.use((req, res, next) => {
  function a(vals) {
    if (vals.todays_val < vals.yesterdays_val) {
      return "Value has fallen by " + (vals.yesterdays_val-vals.todays_val) + "!";
    } else if (vals.todays_val > vals.yesterdays_val) {
    return "Value has risen " + (vals.todays_val-vals.yesterdays_val) + "!";
    }
  }

  fetch(`${historicalURL}?for=yesterday`)
  .then(res => res.json())
  .then(json => difference.yesterdays_val = Object.values(json.bpi)[0])
  .then(json => res.send(a(difference)) && console.log(a(difference)))



});

server.listen(config.port, (err) => {
  if (err) {
    console.log("Error: \n" + err);
  } else {
    console.log("... .... ... .. ... .... ... ..");
    console.log(`...Server is listening on ${config.port}!`);
  }
});
