/* eslint-disable prefer-destructuring */
require('dotenv').config();
const express         = require('express');
const path            = require('path');
const cors            = require('cors');
const authRoutes      = require('./routes/auth/index');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/auth', authRoutes);

app.get('/*', (req, res) => res.send('Server api'));

module.exports = {
  app
}
