const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.Promise = global.Promise;

const configuration = require('./configuration');
// const router = require('./routes');

mongoose.connect(configuration.MONGO_URL, { useMongoClient: true });

const app = express();

app.use(cors());

app.use(function(req,res,next){
    var allowedOrigins = ["http://localhost:5000","http://localhost:8100","https://sltvcustomerserver.herokuapp.com/cart/createcart","https://sltvcustomerserver.herokuapp.com/cart/getcart",'https://sltvcustomerserver.herokuapp.com/api/auth/protected','https://sltvcustomerserver.herokuapp.com/api/auth/register','https://sltvcustomerserver.herokuapp.com/api/auth/login'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
	res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");    
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    return next();
})

//middlewares
app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json({ extended: true })); // Send JSON responses
app.use(morgan('dev'));

// Routes
app.use('/users', require('./routes/users'));

module.exports = app;
