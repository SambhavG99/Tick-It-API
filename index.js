const express = require('express');
const app = express();
const winston = require('winston');
require('./startup/logger')();
require('./startup/routes')(express,app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validate')();


const port = process.env.PORT || 3000;
app.listen(port , () => winston.info(`Listening to ${port}`));