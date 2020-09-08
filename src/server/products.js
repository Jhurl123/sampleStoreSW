var request = require('request');

const apiUrl = `https://5f4edaaf5b92f4001604e01f.mockapi.io/store-api/`

// Function tht gets all products from the api
// Params: Express Req, Res
// Return: Promise containing products object
// Returns 10 products only
exports.getAllProducts = async (req, res) => {

  return new Promise((resolve, reject) => {
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
        resolve({'products': JSON.parse(body)})
      }
      else {
        // Send error if API request is malformed or API doesn't
        // respond as expected
        reject(new Error("Couldn't get the products!!!"))
      }
    })
  }).catch(err => {
    // Log the error at this point
    return err
  })
}

// Get a single product based on a id provided
// Params: Express Req, Res
// Return: Promise containing product object
exports.getSingleProduct = (req, res) => {

  const { id } = req.body 
  return new Promise((resolve, reject) => {
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
        resolve({'product': JSON.parse(body)})
      }
      else {
        reject(new Error("Couldn't get the product!!!"))
      }
    })
  }).catch(err => {
    // Log the error at this point
    return err
  })
}

// Function to get all products attached to a given category
// Params: Express Req, Res
// Return: Promise containing products object
exports.getCategories = (req, res) => {

  const { id } = req.body 
  return new Promise((resolve, reject) => {
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
        resolve({'products': JSON.parse(body)})
      }
      else {
        reject(new Error("Couldn't get the products!!!"))
      }
    })
  }).catch(err => {
    // Log any errors at this point
    return err
  })
}