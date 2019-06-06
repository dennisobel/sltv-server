var AuthenticationController = require('./controllers/authentication'), 
    CartController = require('./controllers/cartcontroller'),
    FriendController = require('./controllers/friendscontroller'),
    TvController = require('./controllers/tvcontroller'),
    MovieController = require('./controllers/moviecontroller'),
    GroupController = require('./controllers/groupcontroller'),
    MessageController = require('./controllers/messagecontroller'),
    OrdersController = require('./controllers/orderscontroller'),
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport'),
    async = require("async"),
    router = require("express-promise-router")(), 
    requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});
 
module.exports = function(app){ 
    var apiRoutes = express.Router(),
        authRoutes = express.Router(),
        cartRoutes = express.Router(),
        tvRoutes = express.Router(),
        movieRoutes = express.Router(),
        messageRoutes = express.Router(),
        ordersRoutes = express.Router(),
        friendRoutes = express.Router(),
        groupRoutes = express.Router();
 
    // Auth Routes
    apiRoutes.use('/auth', authRoutes);
 
    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);
    authRoutes.get("/getfriend/:phone_number", AuthenticationController.getfriend);
    authRoutes.get("/getfriends", AuthenticationController.getfriends); 
    // authRoutes.post("/addfriend", AuthenticationController.addfriend);
    authRoutes.get('/protected', requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });

    //cart routes 
    cartRoutes.post("/createcart", CartController.createcart);
    cartRoutes.get("/getcart", CartController.getcart);
    cartRoutes.get("/getcartbyid/:phone_number", CartController.getcartbyid);
    cartRoutes.get("/deletecartbyid/:phone_number", CartController.deletecartbyid);
    
    

    //tv routes
    tvRoutes.post('/createtv', TvController.createtv);
    tvRoutes.get('/gettv/:id', TvController.gettv);
    tvRoutes.delete("/deletetv/:id",TvController.deletetv);

    // movie routes
    movieRoutes.post('/createmovie', MovieController.createmovie);
    movieRoutes.get('/getmovie/:id', MovieController.getmovie);
    movieRoutes.delete("/deletemovie/:id",MovieController.deletemovie);

    // message routes
    messageRoutes.post("/createmessage", MessageController.createmessage);
    messageRoutes.get("/getmessage/:phone_number", MessageController.getmessage);
    messageRoutes.get("/getmessages", MessageController.getmessage);
    messageRoutes.delete("/deletemessage/:id", MessageController.deletemessage);



    // group routes
    groupRoutes.post("/creategroup", GroupController.creategroup);
    groupRoutes.get("/getgroup/:id", GroupController.getgroup);
    groupRoutes.delete("/deletegroup/:id", GroupController.deletegroup);

    // friend routes
    friendRoutes.post("/addfriend", FriendController.addfriend);
    // friendRoutes.get("/getfriend/:id", FriendController.getfriend);
    friendRoutes.delete("/deletefriend", FriendController.deletefriend);
    
    app.use('/api', apiRoutes);
    // app.use('/cart', cartRoutes); 
    app.use('/tv', tvRoutes); 
    app.use('/movies', movieRoutes);
    app.use('/groups', groupRoutes);
    app.use('/messages', messageRoutes);
    app.use("/friend", friendRoutes);

    // app.use("/createcart", CartController.createcart);

    

    // router.route("/oauth/facebook")
    // .post(passport.authenticate("facebookToken",{session:false}), AuthenticationController.facebookOAuth);
}