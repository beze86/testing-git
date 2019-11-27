const express = require('express');
const router = express.Router();

const Product = require('../models/product');

router.get('/', (req, res, next) => {
   Product.fetchAll()
   .then(products => {
     res.render('shop', {
       prods: products
     });
   })
   .catch(err => {
     console.log(err);
   });
})


module.exports = router;