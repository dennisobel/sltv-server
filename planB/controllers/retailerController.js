const db = require("./../models");
let bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken'); 
const otpSecret = require("./../configuration/otp");
const otplib = require('otplib');

// create helper to send OTP //

// Pass Hash
var authConfig = require('../configuration/auth');

generateToken = (user) =>{
    return jwt.sign(user, authConfig.secret, {
        expiresIn: 10080
    });
}

setUserInfo = (request) => {
    console.log("request",request)
    return {
        passcode:request.passcode,
        idnumber:request.idnumber,
        phonenumber:request.phonenumber
    }
}

// EOF Pass Hash

const R_Signup = {}
const R_Login = {}
const R_OTP = {}
const R_SingleUser = {}
const R_AllUsers = {}

/**HANDLE SIGNUP */

R_Signup.post = (req,res) => {
    console.log("INCOMING SIGNUP DATA:", req.body)

    const saltRounds = 10;

    // PREP DATA FOR DB
    const {
        userName,
        phoneNumber,
        password,
        otp
    } = req.body;  
    
    bcrypt.genSalt(saltRounds).then(salt => {
        return bcrypt.hash(req.body.data.password,salt)
    }).then(hash => {
        db.RetailerSchema.findOne({
            userName: req.body.data.userName
        },(err,doc)=>{
            console.log(doc)
            if(doc){
                console.log("USER WITH THAT NAME EXISTS")
                // HANDLE USER EXISTS - REDIRECT TO LOGIN
    
                res.status(200).json({
                    success: true,
                    exist: true
                }) 
            } else {
                console.log("USER DON'T EXIST",doc)
                // HANDLE DATA UPLOAD TO DB
                let OTP = otplib.authenticator.generate(otpSecret.secret)
                console.log("OTP:",OTP)

                let newUser = db.RetailerSchema({
                    userName:req.body.data.userName,
                    phoneNumber:req.body.data.phoneNumber,
                    password:hash,
                    otp:OTP
                },()=>console.log("newUser: ",newUser))
                .save()
                .then((newUser)=>{
                    /*
                    let sms = `Hi, thank you for joining Goose Links, your One Time Password is ${OTP}`; 
                    let URL = `http://messaging.openocean.co.ke/sendsms.jsp?user=${smsuser}&password=${smspassword}&mobiles=${req.body.data.phoneNumber}&sms=${sms}&clientsmsid=${smsclientsmsid}&senderid=${smssenderid}`
                    
                    helper.sendMessage(URL)      
                    */                     
                    res.status(200).json({
                        success:true,
                        doc:newUser,
                        exist:false
                    })
                })    
            }
        })
    })
}

R_OTP.post = (req,res) => {
    console.log("INCOMING OTP DATA:", req.body)
    console.log("VAL1",req.body.val1)
    let data = {
        otp:req.body.val2.onetimepassword,
        phoneNumber: req.body.val1.doc.phoneNumber
    } 

    console.log("VAL1",req.body.val1)

    db.RetailerSchema.findOneAndUpdate({
        phoneNumber:data.phoneNumber
    },{
        verified: true
    }).then(()=>{
        db.RetailerSchema.find({
            phoneNumber: req.body.val1.doc.phoneNumber,
            verified:true
        },(err,docs)=>{
            if (err) throw Error;
            if(docs){
                res.status(200).json({
                    success:true,
                    docs:docs
                })
            } else if(!docs){
                res.status(200).json({
                    success:false
                })
            }
        })
    })
    // COMPARE OTP
    // IF MATCH MARK USER AS VERIFIED
}

R_Login.post = (req,res) => {
    console.log("INCOMING LOGIN DATA:", req.body)

    db.RetailerSchema.findOne({
        userName:req.body.data.userName
    },(err,docs) => {
        if(docs){
            console.log("DOCS:",docs)
            bcrypt.compare(req.body.data.password,docs.password,(err,response) => {
                if(response){
                    return res.status(200).json({
                        success: true,
                        data: docs
                    })
                }else if(err){
                    console.log("WRONG PASSWORD")
                    throw new Error;
                    return res.status(200).json({
                        success:false
                    })
                }
            })
        } else if(!docs){
            console.log("ERROR NO DOCS")
            return res.status(200).json({
                success:false
            })
        }
    })
}

R_SingleUser.get = (req,res) => {
    console.log("SINGLE USER:",req.params)

    db.RetailerSchema.findOne({
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

R_AllUsers.get = (req,res) => {
    db.RetailerSchema.find({
        
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
    R_Signup,
    R_OTP,
    R_Login,
    R_SingleUser,
    R_AllUsers
}