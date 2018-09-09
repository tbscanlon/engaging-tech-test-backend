const express = require('express');

const products = require('./controllers/products');

const PORT = 8080;

const app = express();

app.use('/products', products);

app.listen(PORT, () => {
  console.log(`Listening on: ${PORT}`);
});