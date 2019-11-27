const express = require('express');
const app = express();

// import database connection
const mongoConnect = require('./utils/database').mongoConnect;

// import controllers functions
const productController = require('./controllers/products');
const mainController = require('./controllers/main');

// default form action
app.use(express.urlencoded({extended: true}));

// call ejs engine and set views folder
app.set('view engine', 'ejs');
app.set('views', 'views');

// set controllers
app.use('/admin', productController);
app.use(mainController);


app.use((req, res, next) => {
    res.render('404');
})


mongoConnect(() => {
    app.listen(3000);
})