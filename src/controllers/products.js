const express = require('express');
const products = express.Router();

products.get('/', (req, res) => {
  res.json({product: 10001});
});

module.exports = products;