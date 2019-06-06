const mongoose = require('mongoose'),  
      Schema = mongoose.Schema;

const OrderSchema = new Schema({  
  tvcart:Array,
  moviecart:Array,
  phone_number:String,	
  createdon:{type:Date,default:Date.now}
});

module.exports = mongoose.model('Order', OrderSchema);  