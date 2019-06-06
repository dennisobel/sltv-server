//var cool = require('cool-ascii-faces');
var express  = require('express');
var app      = express();
var server = require('http').createServer(app);
var socketio = require('socket.io');
var io = socketio().listen(server)



var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
 
var databaseConfig = require('./config/database');
var router = require('./app/routes');

// var port = process.env.PORT || 4000
 
mongoose.connect(databaseConfig.url);

app.set('port', process.env.PORT || 4000)
app.use(cors());

app.use(function(req,res,next){
    var allowedOrigins = ["http://localhost:8100","https://sltvcustomerserver.herokuapp.com/cart/createcart","https://sltvcustomerserver.herokuapp.com/cart/getcart",'https://sltvcustomerserver.herokuapp.com/api/auth/protected','https://sltvcustomerserver.herokuapp.com/api/auth/register','https://sltvcustomerserver.herokuapp.com/api/auth/login'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
	res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");    
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    return next();
})

app.use(bodyParser.urlencoded({ extended: true })); // Parses urlencoded bodies
app.use(bodyParser.json({ extended: true })); // Send JSON responses
app.use(logger('dev')); // Log requests to API using morgan

// app.get('/cool', function(request, response) {
//   response.send(cool());
// });

// app.listen(port);
// console.log("App listening on port..."+ port);
var clients = {};
var isequal = true;

require('./socket/socket.js')(io,clients,isequal)

server.listen(app.get('port'),()=>{
	console.log("Live on Port: " + app.get('port'))
})
 
router(app);