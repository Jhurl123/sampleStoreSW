const express = require('express');
const router = express.Router();
const Products = require('./products')

// Get 10 products for the homepage - for demo purposes. 
// Emulates a "Featured Products" section
router.get('/get_products', async (req, res) => {
  try {
   // call products get all function
   const products = await Products.getAllProducts(req,res)

   if(products instanceof Error) throw new Error(products)
   res.json(products)
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// Product route to return a single products data
router.post('/product', async (req, res) => {

  try {
    const product = await Products.getSingleProduct(req, res) 
    if(product instanceof Error) throw new Error(product)
    res.json(product)
  }
  catch (err) {
    // Send error if API request is malformed or API doesn't
    // respond as expected
    res.status(500).json(err);
  }
})

// Route to get all products from a given category
router.post('/get_categories', async (req, res) => {
  try {
    const products = await Products.getCategories(req, res)

    if(products instanceof Error) throw new Error(products)

    res.json(products)

  }
  catch (err) {
    // Send error if API request is malformed or API doesn't
    // respond as expected
    res.status(500).json(err);
  }
})

module.exports = router;