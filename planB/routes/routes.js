const {R_Signup} = require('../controllers/retailerController');
const {R_OTP} = require('../controllers/retailerController');
const {R_Login} = require('../controllers/retailerController');
const {R_SingleUser} = require('../controllers/retailerController');
const {R_AllUsers} = require('../controllers/retailerController');
const {R_HomeDelivery} = require('../controllers/retailerController');

const {Signup} = require('../controllers/authController');
const {OTP} = require('../controllers/authController');
const {Login} = require('../controllers/authController');
const {SingleUser} = require('../controllers/authController');


const {Subscribe} = require('../controllers/subController');
const {CreateCart} = require('../controllers/cartController');
const {GetCart} = require('../controllers/cartController');
const {GetCartById} = require('../controllers/cartController');
const {DeleteCartById} = require('../controllers/cartController');
const {Delivered} = require('../controllers/cartController');
const {Ready} = require('../controllers/cartController');


/**FIND OUT WHAT THIS DOES */
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

let appRouter = (app)=>{
    app.post('/signup',Signup.post)
    app.post('/otp',OTP.post)
    app.post('/login',Login.post)
    app.post('/subscribe',Subscribe.post);

    app.post('/r_signup',R_Signup.post)
    app.post('/r_otp',R_OTP.post)
    app.post('/r_login',R_Login.post)
    app.post('/homedelivery', R_HomeDelivery.post)
    // app.post('/subscribe',Subscribe.post);

    app.post('/createcart',CreateCart.post);
    app.post('/delivered',Delivered.post);
    app.post('/ready',Ready.post);

    app.get('/checksubscription/:userName',Subscribe.get)
    app.get('/getuser/:userName',SingleUser.get)
    app.get('/r_getuser/:userName',R_SingleUser.get)
    app.get('/r_getusers',R_AllUsers.get)
    app.get('/getcarts',GetCart.get)
    app.get('/getcartbyid/:id',GetCartById.get)
    app.get('/getsinglecart/:phonenumber',GetCartById.get)
    app.get('/deliveredtrue',Delivered.get)
    app.get('/getready',Ready.get);


    app.delete('/delete/:id', DeleteCartById.delete)
}

module.exports = appRouter