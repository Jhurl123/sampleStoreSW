const express = require('express');
const router = express.Router();
var request = require('request');

const apiUrl = `https://5f4edaaf5b92f4001604e01f.mockapi.io/store-api/`

// Ideally I'd use a named function for the callbacks in these routes
// Get 10 products for the homepage - for demo purposes. 
// Emulates a "Featured Products" section
router.get('/get_products', async (req, res) => {
  try {
    request({
      method: 'GET',
      uri: `${apiUrl}products?page=1&limit=10`,
      headers: {
        'User-Agent': 'request',
        "Content-Type": "application/json",
      }
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        res.json({'products': JSON.parse(body)})
      }
      else {
        // Send error if API request is malformed or API doesn't
        // respond as expected
        res.json(error);
      }
    })
  }
  catch (err) {
    res.json(err);
  }
});

// Product route to return a single products data
router.post('/product', async (req, res) => {
  const { id } = req.body 
  try {
    request({
      method: 'GET',
      uri: `${apiUrl}products/${id}`,
      headers: {
        'User-Agent': 'request',
        "Content-Type": "application/json",
      }
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        res.json({'product': JSON.parse(body)})
      }
      else {
        throw Error(error)
      }
    })
  }
  catch (err) {
    // Send error if API request is malformed or API doesn't
    // respond as expected
    res.json(err);
  }
})

// Route to get all products from a given category
router.post('/get_categories', async (req, res) => {
  const { id } = req.body 
  try {
    request({
      method: 'GET',
      uri: `${apiUrl}products?category=${id}`,
      headers: {
        'User-Agent': 'request',
        "Content-Type": "application/json",
      }
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        res.json({'products': JSON.parse(body)})
      }
      else {
        throw Error(error)
      }
    })
  }
  catch (err) {
    // Send error if API request is malformed or API doesn't
    // respond as expected
    res.json(err);
  }
})

module.exports = router;