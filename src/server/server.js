const dotenv = require('dotenv').config({path: __dirname + '/.env'});
const path = require('path');
const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser')
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(cookieParser())

// Create server connection for prod or development
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT)

const productRoutes = require('./routes')

// Serve files from this directory
app.use(express.static(path.join(__dirname, '../../build/')));

app.use(productRoutes)  

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'))
  // res.sendFile(path.join(__dirname, '../../src/index.html'));
});