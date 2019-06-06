const mongoose = require('mongoose');
const { Schema } = mongoose;
var bcrypt   = require('bcrypt-nodejs');

mongoose.Promise = global.Promise;

const RetailerSchema = new Schema({
    userName:{
        type: String,
        required: false,
        unique: true
    },
    gender:{
        type: String
    },
    dateOfBirth:{
        type: Date
    },
    phoneNumber: {
        type: String,
        required: false,
        unique: true
    },
    otp:{
        type: String,
        required: false
    },
    password:{
        type:String,
        required: false
    },
    photo:{
        type: String
    },
    verified:{
        type:Boolean,
        required: false,
        default:false
    }    
})

module.exports = mongoose.model("Retailer", RetailerSchema);