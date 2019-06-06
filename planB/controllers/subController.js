let moment = require('moment');
let mpesa = require('../helpers/mpesa/ApiHelpers')
const nifty = require("../helpers/nifty/");
const db = require("./../models");
const Subscribe = {}


const consumer_key = "RwV9nAayEJB4KOqz6Jhwpb3KchTp1QYm"; 
const consumer_secret = "idQR39pxoUVfd2B2";

// NIFTY
makePayment = function(_data){
    console.log("incoming: ",_data)
    var spawn = require('child_process').spawn;
    
    // var scriptExecution = spawn("python", ["./nifty.py"]); 
    var scriptExecution = spawn("python", ["../helpers/nifty/nifty.py"]); 

   // Handle normal output
   scriptExecution.stdout.on('data', (data) => {
       console.log("python output",String.fromCharCode.apply(null, data));
   });

   var data = JSON.stringify([_data.phoneNumber,parseInt(_data.amount),'kbsacco','f861c6cc-4efa-4306-8eee-08f035b03772']);
   console.log("data: ",data)
   // Write data (remember to send only strings or numbers, otherwhise python wont understand)
   scriptExecution.stdin.write(data);
   // End data write
   scriptExecution.stdin.end();        
}
// EOF NIFTY

// SAVE TOO DB
saveSubscription = function(body){
    const {
        userName,
        phoneNumber,
        subscriptionType,
        subscriptionTime,
        expiryDate,
        amount,
    } = req.body;   
    
    let _status = "";

    _status = body.expiryDate == new Date() ? "inactive" : "active";

    let newSubscription = db.SubscriptionSchema({
        userName:body.userName,
        phoneNumber:body.phoneNumber,
        subscriptionType:body.type,
        subscriptionTime:body.subscriptionTime,
        expiryTime:body.expiryDate,
        status:_status,
        amount:body.amount,
        mpesaTransactionCode:"BCBUD420"
    })
    .save()
    .then((newSubscription)=>{
        return res.status(200).json({
            success:true,
            data:newSubscription
        })
    })
}
// EOF SAVE TO DB

Subscribe.post = (req,res) => {
    console.log("INCOMING SUBSCRIPTION DATA:", req.body)
    // HANDLE NIFTY STK PUSH
    var _data = {
        phoneNumber:req.body.phoneNumber,
        amount:10 //req.body.amount
    }; 
    
    // makePayment(_data)
    // EOF NIFTY STK
    
    // HANDLE DARAJA STK PUSH
    return new Promise((resolve,reject) => {        
        const onlinePassKey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
        const onlineShortCode = "174379";
        const auth = "Basic " + new Buffer.from(consumer_key + ":" + consumer_secret).toString("base64");
        const TimeStamp = moment(new Date(Date.now())).format("YYYYMMDDHHmmss")
        const tobeencoded = (onlineShortCode + onlinePassKey + TimeStamp)

        const encoded = new Buffer(tobeencoded)
        // const password = encoded.toString('base64');
        // const password = tobeencoded.toString('base64')
        const password = (onlineShortCode + onlinePassKey + TimeStamp).toString('base64');   

        mpesa.genOAuth(auth,TimeStamp,password).then(body => {   
            console.log("GENOAUTHBODY:",body) 
            console.log("auth:",auth)
            
            mpesa.lipaNaMpesa(auth,TimeStamp,password)            
            .then(body => {     
                console.log("Body :",body)

                saveSubscription(req.body);
            }).catch(error => {
                console.log("Errors :",error)                
            })                
               
        })
    
    })

    // EOF DARAJA STK PUSH



}

Subscribe.get = (req,res) => {
    console.log("INCOMING SUBSCRIPTION REQ:",req.params)    

    db.SubscriptionSchema.findOne({
        userName:req.params.userName
    },(err,doc) => {
        console.log("DOC:",doc)
        if(doc){
            res.status(200).json({
                success: true,
                user:doc
            })
        }else if(!doc){
            res.status(200).json({
                success: false
            })
        }
    })        
}

module.exports = {
    Subscribe
}
