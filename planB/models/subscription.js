const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const subscriptionSchema = new Schema({
    userName:{
        type:String
    },
    phoneNumber:{
        type:String
    },
    subscriptionType:{
        type:String,
        required:false
    },
    subscriptionTime:{
        type: Date,
        required: false
    },
    expiryTime:{
        type: Date,
        required: false
    },
    status:{
        type:String,
        required:false
    },
    amount:{
        type:String,
        required:false
    },
    mpesaTransactionCode:{
        type:String,
        unique:true
    }  
})

module.exports = mongoose.model("SubscriptionSchema", subscriptionSchema);