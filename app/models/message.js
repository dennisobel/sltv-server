const mongoose = require('mongoose'),  
      Schema = mongoose.Schema;

const MessageSchema = new Schema({  
  data:Object,
  type:String,
  recepient:String,
  sender:String,
  createdon:{type:Date,default:Date.now}
});

module.exports = mongoose.model('Message', MessageSchema);  