const express = require('express');
const router = express.Router();

// get product model
const Product = require('../models/product');

router.get('/add-product', (req, res, next) => {
    res.render('./admin/add-product');
})

router.post('/add-product', (req, res, next) => {
    const name = req.body.productName.trim();
    const price = req.body.productPrice.trim();
    const description = req.body.productDescription.trim();
    
    // res.redirect('/');
    const product = new Product(name, price, description);
    product.save();
    res.redirect('/');
})

router.get('/edit-product/:productId', (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId)
    .then((product) => {
        res.render('./admin/edit-product', {product: product});
    })
    .catch((err) => {
        console.log(err)
    })
})

router.post('/edit-product', (req, res, next) => {
    const productId = req.query.productId;
    const name = req.body.productName.trim();
    const price = req.body.productPrice.trim();
    const description = req.body.productDescription.trim();
    const product = new Product(name, price, description, productId);
    product.save();
    res.redirect('/');
})

router.get('/delete-product/:productId', (req, res, next) => {
    const productId = req.params.productId;
    Product.deleteOne(productId)
    .then(() => {
        res.redirect('/');
    })
    .catch((err) => {
        console.log(err)
    })
})

module.exports = router;