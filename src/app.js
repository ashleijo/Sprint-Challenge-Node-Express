const bodyParser = require('body-parser');
const express = require('express');

const server = express();
const STATUS_USER_ERROR = 422;
const STATUS_SUCCESS = 200;
const PORT = 3000;
const config = require("../config.js");

server.listen(PORT, (err) => {
  if (err) {
    console.log("errror \n" + err);
  } else {
    console.log(`Server is listening on ${PORT}`);
  }
});
