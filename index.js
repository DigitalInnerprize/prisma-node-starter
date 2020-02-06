/* eslint-disable prefer-destructuring */
require('dotenv').config();
const express         = require('express');
const path            = require('path');
const cors            = require('cors');
const morgan          = require('morgan')
const helmet          = require('helmet');
const { prisma } = require('./generated/prisma-client');

const app = express();

/* logger for incoming route requests */
app.use(morgan('common'));

/* helmet removes certain headers to prevent security breaches */
app.use(helmet())
app.use(cors());
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/*', (req, res) => res.send('server api'));

let server;
module.exports = {
  start(port) {
    server = app.listen(port, () => {
      console.log(`App started on port ${port}`);
    });
    return app;
  },
  stop() {
    server.close();
  }
};
