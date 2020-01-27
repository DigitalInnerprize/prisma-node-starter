/* eslint-disable prefer-destructuring */
require('dotenv').config();
const express         = require('express');
const path            = require('path');
const cors            = require('cors');

const PORT =  process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/*', (req, res) => res.send('Server api'));

app.listen(PORT, () => console.log(`api server started on port ${PORT}`));
