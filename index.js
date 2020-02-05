/* eslint-disable prefer-destructuring */
require('dotenv').config();
const express         = require('express');
const path            = require('path');
const cors            = require('cors');
const { prisma } = require('./generated/prisma-client');

const app = express();

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
